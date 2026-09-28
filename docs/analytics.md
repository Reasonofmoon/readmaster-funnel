# 예약 퍼널 전환 추적

`index.html`, `briefing.html`에 `assets/analytics.js`를 추가했습니다. 기존 CSS, 인라인 스크립트, 폼 제출 함수와 GAS 주소는 그대로입니다. 라이브러리·설치·빌드 과정이 없습니다.

## 이벤트와 해석

모든 이벤트에는 `event`, `page_path`(쿼리·해시 제외), `timestamp`(UTC)가 있습니다. 입력한 이름·전화번호·학년·상담 내용, 버튼 문구, 전체 URL은 수집하지 않습니다.

| 이벤트 | 발생 시점 | 추가 필드 |
| --- | --- | --- |
| `page_view` | 페이지 로드당 1회 | 없음 |
| `cta_click` | `data-cta`가 붙은 링크·버튼 클릭 | `cta_id` |
| `section_view` | IntersectionObserver로 섹션이 화면에 처음 진입할 때, 섹션당 1회 | `section_id`: booking / faq / testimonials |
| `form_start` | 예약 입력칸 첫 포커스·입력·변경, 고민 선택 또는 제출 시도, 페이지당 1회 | `form_id` |
| `form_submit` | index 예약 버튼 클릭 / briefing의 유효성 검사를 통과한 submit 이벤트 | `form_id` |
| `form_success` | 기존 페이지의 완료 경로 감지 | `form_id`, `outcome` |
| `form_error` | 필수 입력 누락 또는 briefing의 오류 안내 표시 | `form_id`, `reason` |

`briefing.html`의 `#reservation`은 `booking`으로 집계합니다. 현재 FAQ는 두 페이지 모두 없고, 후기는 index에만 있습니다. 없는 섹션의 노출을 만들지 않습니다. 추후 `id="faq"` 섹션이 초기 HTML에 추가되면 자동 추적합니다. IntersectionObserver 미지원 시 섹션 이벤트만 생략합니다.

CTA ID는 HTML의 고정 속성입니다. 문구나 순서를 바꾸어도 기존 ID는 유지하고, 새 CTA에는 고유한 ID를 추가합니다. 로그인 폼은 예약 추적 대상이 아닙니다.

### 성공의 범위

- index의 기존 `submit()`은 필수 4개 값 확인 후 알림만 표시합니다. 추적은 클릭 처리 후 같은 필수값 조건을 읽어 `outcome=local_confirmation`을 기록합니다. 실제 서버 예약이 아닙니다. 제출 함수를 바꾸면 이 감지 조건도 검토해야 합니다.
- briefing은 `#formMessage` 변경을 관찰합니다. 접수 완료 문구가 표시되면 `outcome=beacon_queued`입니다. `sendBeacon()`의 true는 브라우저 대기열 등록이며 GAS/시트 저장 완료를 보장하지 않습니다. 기존 완료 문구를 바꾸면 감지 조건도 검토해야 합니다.
- `reason=validation`은 필수값 누락, `submission_message`는 기존 폼의 실패 안내입니다. 네트워크의 사후 실패나 기존 코드의 예외까지 감지하는 것은 아닙니다.
- 따라서 GA4의 `form_success`를 핵심 이벤트로 사용할 때도 실제 예약 수와 구분하고 `outcome`별로 확인합니다.

## 전송과 로컬 보관

항상 `window.dataLayer.push({...})`를 시도합니다. GA4/GTM 설치 전에는 배열에만 쌓이며 Google로 전송되지 않습니다.

별도 수집 서버가 있으면 **analytics.js 태그 앞**에 설정합니다. GAS 예약 주소와는 별개입니다.

```html
<script>
  window.__RM_ANALYTICS__ = { endpoint: 'https://YOUR-COLLECTOR.example/events' };
</script>
<script src="assets/analytics.js" defer></script>
```

설정된 주소로 이벤트 1건씩 `navigator.sendBeacon()`을 호출합니다. 본문은 JSON이며 Content-Type은 `text/plain;charset=utf-8`입니다. 서버에서 이 형식을 받아 저장하도록 구성해야 합니다. GA4 수집 주소를 직접 넣는 기능이 아닙니다.

주소가 없거나 Beacon 등록이 거절되거나 예외가 발생하면 `localStorage['rm-analytics-buffer']`에 최신 100건을 보관합니다. 손상된 JSON은 새 배열로 복구합니다. 저장 공간 부족·저장 차단·dataLayer 오류는 추적 내부에서 처리하여 페이지 동작을 막지 않습니다. 저장 자체가 불가능하면 이벤트가 유실될 수 있습니다. 버퍼는 자동 재전송하지 않으며, 설정 후 새 이벤트만 전송합니다. true 이후의 네트워크 실패는 알 수 없습니다.

## GA4 측정 ID 연결 (GTM 사용)

1. GA4 관리 → 데이터 스트림 → 웹 스트림에서 `G-...` 측정 ID를 확인합니다.
2. Google Tag Manager 웹 컨테이너를 만들고 제공되는 설치 코드를 두 페이지에 추가합니다. 이 변경에는 실제 컨테이너나 측정 ID를 넣지 않았습니다.
3. GTM에서 **Google 태그**를 만들고 태그 ID에 `G-...`를 입력합니다. Initialization – All Pages에 실행하고 구성 매개변수 `send_page_view`를 `false`로 설정합니다. 이 스크립트의 `page_view`만 GA4 이벤트 태그로 보냅니다.
4. GA4 웹 스트림의 향상된 측정에서 폼 상호작용 자동 수집을 끕니다. `form_start`, `form_submit`의 중복 집계를 피하기 위한 설정입니다.
5. GTM의 맞춤 이벤트 트리거를 정규식 `^(page_view|cta_click|section_view|form_start|form_submit|form_success|form_error)$`로 만듭니다.
6. **Google 애널리틱스: GA4 이벤트** 태그에서 측정 ID를 설정하고 이벤트 이름에는 기본 제공 변수 `{{Event}}`를 사용합니다. 위 트리거를 연결합니다.
7. 데이터 영역 변수(버전 1)를 `page_path`, `cta_id`, `section_id`, `form_id`, `reason`, `outcome` 각각 만들고 동일 이름의 이벤트 매개변수에 연결합니다. 각 이벤트에서 사용하지 않는 추가 필드는 null로 초기화하여 이전 이벤트의 값이 남지 않게 합니다. 필요하면 GA4에 이벤트 범위 맞춤 측정기준을 등록합니다.
8. GTM 미리보기(Tag Assistant)에서 이벤트와 태그 실행을 확인하고 GA4 DebugView/실시간 보고서에서 수신을 확인한 뒤 컨테이너를 게시합니다.

측정 ID만 변수에 넣거나 gtag.js만 로드해도 이 객체 이벤트가 자동 전송되는 것은 아닙니다. 위 GTM 이벤트 매핑이 필요합니다.

공식 안내: [GTM의 GA4 설정](https://support.google.com/tagmanager/answer/9442095?hl=ko), [측정 ID 확인](https://support.google.com/analytics/answer/9539598?hl=ko), [데이터 영역](https://developers.google.com/tag-platform/tag-manager/datalayer), [맞춤 이벤트 트리거](https://support.google.com/tagmanager/answer/7679219?hl=ko).

## 수동 검증

저장소 루트에서 다음을 실행합니다.

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

1. `http://127.0.0.1:8765/index.html`과 `/briefing.html`을 각각 엽니다.
2. 개발자 도구 Console에서 `console.table(window.dataLayer)`를 실행합니다. `page_view` 1건을 확인합니다.
3. 예약 CTA를 클릭하고 예약 영역으로 스크롤합니다. `cta_click`과 `section_view`의 `booking`을 확인합니다. 위아래로 반복 스크롤해도 해당 섹션 노출은 1건입니다. index 후기 영역도 확인합니다.
4. 입력칸을 눌러 `form_start`가 1번만 생기는지, 빈 폼 제출에 `form_error`가 생기는지 확인합니다.
5. 실제 예약 없이 성공 경로를 시험하려면 **테스트 탭에서만** Console에 `navigator.sendBeacon = () => true`를 먼저 실행하고 가짜 값으로 입력·제출합니다. `form_submit`, `form_success`를 확인합니다. briefing에서 `navigator.sendBeacon = () => false`로 바꾸고 다시 채워 제출하면 `form_error`를 확인할 수 있습니다. 시험 후 탭을 닫습니다.
6. `JSON.parse(localStorage.getItem('rm-analytics-buffer'))`로 미설정 상태의 버퍼를 확인합니다. 테스트 데이터를 지우려면 `localStorage.removeItem('rm-analytics-buffer')`를 실행합니다. 기존 briefing이 저장한 가짜 예약은 `readmaster-reservations` 키에서 별도로 지웁니다.

## Headless Chrome 자동 검증

설치된 Chrome과 내장 WebSocket을 지원하는 Node(검증 환경: v24)를 사용합니다. npm/추가 패키지는 필요 없습니다. 위 Python 서버를 켠 상태에서 다른 터미널에 다음을 실행합니다. Chrome 경로는 환경에 맞게 바꿉니다.

```sh
/opt/meta-chromium/chrome --headless --no-sandbox --disable-dev-shm-usage \
  --ip-address-space-overrides=127.0.0.1:8765=public --remote-debugging-port=9222 \
  --user-data-dir=/tmp/rm-analytics-chrome about:blank
```

다른 터미널에서 실행합니다.

```sh
node scripts/verify-analytics.mjs
node --test tests/*.test.mjs
node --check assets/analytics.js
```

자동 검증은 두 페이지를 불러와 CTA 클릭, 예약 스크롤, 섹션 중복 방지, 폼 시작·제출·성공·오류, briefing 반복 실패를 확인합니다. Beacon은 테스트 탭에서 대체하고 외부 HTTPS 요청을 차단하므로 실제 예약은 전송하지 않습니다. 버퍼 상한·손상 복구·저장 차단·Beacon 예외와 개인정보 미포함도 확인하며, 결과와 dataLayer 앞부분을 콘솔에 출력합니다. `RM_TEST_ORIGIN`, `RM_CHROME_DEBUG` 환경변수로 주소를 바꿀 수 있습니다.

GA4 계정이나 수집 서버는 설정되지 않았으므로 원격 수신·시트 저장 검증은 포함하지 않습니다.

2026-09-28 실행 결과: 두 페이지의 Headless Chrome 검증 PASS, 기존 폼 전송 테스트 2개 PASS, JavaScript 구문 검사 PASS. HTML에서 추가한 속성과 스크립트 태그를 제거하면 작업 전 파일과 정확히 일치하는 것도 확인했습니다. 이 환경의 Chrome은 로컬 접근 분류 때문에 테스트 서버 주소에 한해 위 IP 주소 공간 옵션이 필요했습니다.
