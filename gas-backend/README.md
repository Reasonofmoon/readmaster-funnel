# 리드마스터 설명회 예약 — GAS Backend 설정 가이드

## 1단계: Google Sheets 생성

1. [Google Sheets](https://sheets.google.com)에서 **새 스프레드시트** 생성
2. 이름: `리드마스터 설명회 예약`

## 2단계: clasp 연결

```powershell
# clasp 로그인 (최초 1회)
clasp login

# 새 GAS 프로젝트 생성 (스프레드시트에 연결)
cd gas-backend
clasp create --title "ReadMaster 설명회 예약" --type sheets --parentId "스프레드시트_ID"
```

> **스프레드시트 ID**는 URL에서 확인:  
> `https://docs.google.com/spreadsheets/d/`**여기가_ID**`/edit`

## 3단계: 코드 업로드

```powershell
clasp push
```

## 4단계: 시트 초기화

```powershell
clasp open
```
→ Apps Script 에디터에서 `setupSheet` 함수 실행  
→ "📋 설명회 예약" 시트가 자동 생성됨

## 5단계: 웹앱 배포

1. Apps Script 에디터 → **배포 > 새 배포**
2. 유형: **웹 앱**
3. 실행 사용자: **본인**
4. 액세스: **모든 사용자** (외부 폼 접수 위해)
5. **배포** → URL 복사

## 6단계: funnel.html에 URL 연결

`funnel.html`에서 다음 라인 찾기:
```javascript
const ENDPOINT = ''; // 여기에 엔드포인트 URL 입력
```

배포 URL을 넣기:
```javascript
const ENDPOINT = 'https://script.google.com/macros/s/YOUR_DEPLOY_ID/exec';
```

## 완료! 🎉

- **예약 접수 확인**: Google Sheets → "📋 설명회 예약" 시트
- **대시보드**: Apps Script 에디터에서 웹앱 URL 또는 메뉴 → "대시보드 열기"
- **이메일 알림**: `Code.gs`의 `CONFIG.NOTIFY_EMAIL`에 이메일 주소 입력
