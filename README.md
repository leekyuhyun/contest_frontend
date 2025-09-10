# Frontend

## Project Setup

### VSCode Extension

- Prettier
- ESLint
- Vue-Official

### Repository Clone (Frontend)

```bash
git clone https://github.com/The-cane-of-Min-Jeung/frontend.git
cd <frontend>
```

### Install Dependencies

```bash
npm install
```

### Setting Environmental Variables (.env)

```bash
email : leekh010502@naver.com
```

### Start Development Server

```bash
npm run dev
```

## Used Technology

- **프레임워크**: Vue.js 3 (Composition API)
- **라우팅**: Vue Router
- **HTTP 클라이언트**: Axios (REST API 통신)
- **실시간 통신**: WebSocket
- **스타일링**: Bootstrap, Custom CSS
- **지도**: Kakao Maps API

## Key Features

- **실시간 상황 대시보드**: 현재 발생 중인 상황(경고, 위험)을 카드 형태로 보여주어 즉각적인 대응을 가능하게 합니다.
- **상세 라이브 모니터링**: 각 상황에 대한 상세 모니터링 페이지를 제공합니다.
  - 카카오맵 API를 활용한 실시간 GPS 경로 추적
  - 사용자 및 보호자 정보 표시
  - 위치, 음성 파일 등 수신된 데이터의 실시간 로그 확인
- **기기 관리 (CRUD)**:
  - **등록**: 단계별 폼을 통해 새로운 기기, 사용자, 보호자 정보를 시스템에 등록합니다.
  - **목록 조회**: 등록된 모든 기기를 반응형 테이블로 조회합니다.
  - **상세 조회 및 수정**: 특정 기기의 정보를 확인하고 수정할 수 있습니다.
  - **삭제**: 시스템에서 기기를 삭제합니다.
- **AI 분석 히스토리**:
  - AI가 분석한 모든 범죄 예측 기록을 페이지별로 조회합니다.
  - 특정 기기를 선택하여 과거 발생 기록을 필터링하고 추적할 수 있습니다.
- **반응형 UI**: 부트스트랩을 기반으로 데스크톱부터 모바일 기기까지 다양한 환경에서 일관된 사용성을 제공하도록 설계되었습니다.

## Project Progress

- [x] 프로젝트 세팅
- [x] 메인 페이지 구현
- [x] 기기등록 & 조회 페이지 API 연동
- [x] CCTV 조회 페이지 API 연동
- [x] 상황 대시보드 UI 제작
- [ ] 상황 대시보드 API 연동
- [x] 알림 대시보드 UI 제작
- [ ] 알림 대시보드 API 연동
- [ ] 히스토리 기능 구현
