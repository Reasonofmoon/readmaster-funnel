// =============================================================
// ReadMaster Franchise — 설명회 예약 접수 시스템
// Google Apps Script Backend (doPost Web App)
// =============================================================

// ─── 상수 ───
const CONFIG = {
  SHEET_NAME: '📋 설명회 예약',
  HEADERS: [
    '접수일시', '학부모 성함', '연락처', '자녀 학년',
    '희망 일정', '지점', '처리 상태', '메모'
  ],
  COLORS: {
    HEADER_BG: '#0f2167',
    HEADER_TEXT: '#ffffff',
    NEW_ROW: '#fffde7',
  },
  // 이메일 알림을 받을 주소 (비워두면 알림 안 감)
  NOTIFY_EMAIL: 'danteielts@gmail.com',
};

// =============================================================
// 1. 메뉴 및 초기 설정
// =============================================================
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('📋 리드마스터')
    .addItem('시트 초기 설정', 'setupSheet')
    .addSeparator()
    .addItem('대시보드 열기', 'showDashboard')
    .addToUi();
}

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  // 헤더 설정
  const headerRange = sheet.getRange(1, 1, 1, CONFIG.HEADERS.length);
  headerRange.setValues([CONFIG.HEADERS]);
  headerRange
    .setBackground(CONFIG.COLORS.HEADER_BG)
    .setFontColor(CONFIG.COLORS.HEADER_TEXT)
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  // 행 높이 + 고정
  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);

  // 열 너비
  const widths = [160, 100, 140, 100, 200, 100, 100, 200];
  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // 처리 상태 드롭다운 (G열)
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['🆕 신규', '📞 연락 완료', '✅ 확정', '❌ 취소'], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange('G2:G500').setDataValidation(statusRule);

  SpreadsheetApp.getUi().alert('✅ 시트 설정이 완료되었습니다!');
}

// =============================================================
// 2. doPost — 외부 폼에서 데이터 수신
// =============================================================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

    // 시트가 없으면 자동 생성
    if (!sheet) {
      setupSheet();
      sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    }

    // 접수일시
    const now = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');

    // 데이터 행 추가
    const newRow = [
      now,                              // 접수일시
      data.parentName || '',            // 학부모 성함
      data.phone || '',                 // 연락처
      data.grade || '',                 // 자녀 학년
      data.session || '',               // 희망 일정
      data.branch || '미지정',           // 지점
      '🆕 신규',                         // 처리 상태
      '',                               // 메모
    ];

    const lastRow = sheet.getLastRow() + 1;
    sheet.getRange(lastRow, 1, 1, newRow.length).setValues([newRow]);

    // 새 행 하이라이트
    sheet.getRange(lastRow, 1, 1, newRow.length)
      .setBackground(CONFIG.COLORS.NEW_ROW);

    // 이메일 알림 (설정된 경우)
    if (CONFIG.NOTIFY_EMAIL) {
      sendNotification_(data, now);
    }

    // CORS 허용 응답
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('doPost Error: ' + err.message);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// =============================================================
// 3. doGet — 대시보드 (간단한 현황 페이지)
// =============================================================
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Dashboard')
    .setTitle('리드마스터 설명회 예약 현황')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function showDashboard() {
  const html = HtmlService.createHtmlOutputFromFile('Dashboard')
    .setTitle('설명회 예약 현황')
    .setWidth(400);
  SpreadsheetApp.getUi().showSidebar(html);
}

// =============================================================
// 4. 대시보드용 서버 함수
// =============================================================
function getDashboardData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet || sheet.getLastRow() <= 1) {
    return { total: 0, newCount: 0, confirmedCount: 0, entries: [] };
  }

  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, CONFIG.HEADERS.length).getValues();

  let newCount = 0;
  let confirmedCount = 0;
  const entries = [];

  data.forEach(row => {
    const status = row[6] || '';
    if (status.includes('신규')) newCount++;
    if (status.includes('확정')) confirmedCount++;

    entries.push({
      date: row[0],
      name: row[1],
      phone: row[2],
      grade: row[3],
      session: row[4],
      branch: row[5],
      status: status,
      memo: row[7],
    });
  });

  return {
    total: data.length,
    newCount,
    confirmedCount,
    entries: entries.reverse(), // 최신순
  };
}

// =============================================================
// 5. 이메일 알림 (내부 함수)
// =============================================================
function sendNotification_(data, timestamp) {
  const subject = `[리드마스터] 설명회 신규 예약 — ${data.parentName}`;
  const body = `
📋 설명회 예약 접수

• 접수일시: ${timestamp}
• 학부모 성함: ${data.parentName}
• 연락처: ${data.phone}
• 자녀 학년: ${data.grade}
• 희망 일정: ${data.session}
• 지점: ${data.branch || '미지정'}

※ Google Sheets에서 바로 확인하세요.
  `.trim();

  MailApp.sendEmail(CONFIG.NOTIFY_EMAIL, subject, body);
}

// =============================================================
// 6. 테스트용 함수
// =============================================================
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        parentName: '테스트 학부모',
        phone: '010-1234-5678',
        grade: '중1',
        session: '3/21(토) 11:00 초·중등',
        branch: '춘천 우두동',
      }),
    },
  };
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
