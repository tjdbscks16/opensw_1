# Campus Parking Guide — Frontend  
*"드론 매핑 + 3D 정보 + AI 분석을 결합한 차세대 캠퍼스 주차 가이드"*

본 레포지토리는 **Campus Parking Guide 프로젝트의 프론트엔드**(Web UI)를 담당합니다.  
웹 기반 인터페이스를 통해 사용자가 *주차 가능 구역, 혼잡도, 예측 정보, 3D 뷰*를 직관적으로 확인할 수 있도록 설계되었습니다.

---

# 프로젝트 개요

### **프로젝트명:** Campus Parking Guide  
**"학교 방문객과 운전자를 위한 드론 매핑 기반 AI 주차 가이드"**

### 타겟 유저
- 캠퍼스 지리에 익숙하지 않은 방문객(행사, 기숙사 입사 등)
- 주차 공간을 찾기 어려운 학생/교직원
- 도보 이동 동선·진입로 이해가 필요한 초보 운전자

### 기획 의도
기존 지도 앱(네이버/카카오)은  
- 캠퍼스 내부의 **세밀한 진입로**,  
- **임시 주차 가능 구역**,  
- **시간대별 혼잡도 정보**,  
- **주차 가능 전망**  

을 제공하지 않습니다.

본 프로젝트는  
**드론의 시각 정보(orthophoto)** +  
**Unity 기반 3D 모델링 정보** +  
**AI 기반 예측 정보**  

를 결합하여 학교 내부의 실제 주차 경험을 최대한 직관적으로 전달합니다.

---

# 팀 구성 및 역할

### 팀원 구성
- **박준우 (20215162)** — Unity 기반 3D 모델링 & WebGL
- **서윤찬 (20215169)** — 서버 구축 & API 설계
- **조승범 (20216649)** — 드론 촬영 & AI 이미지 분석 & **웹 프론트엔드 개발**
- **홍윤이 (20235279)** — **웹 프론트엔드 개발(UI/UX 구현)**

### 프론트엔드 담당 역할 (Frontend)
- 모바일/웹 UI/UX 설계 및 구현
- 드론 맵 뷰(정사사진 기반)
- 3D Map(WebGL) 임베딩 및 인터랙션
- Zone Guide, 혼잡도·포화도 데이터 카드 UI 구현
- Marker, Bottom Sheet, Sliding Panel 구현
- 시간대별 정보 전환 UI
- 백엔드 API 연동 및 상태 관리

---

# 공통 기능: 데이터 분석 및 시각화

팀 전체가 사용한 공통 분석 도구입니다.  
프론트엔드는 **이 분석 결과 데이터를 시각적으로 표현하는 역할**을 담당합니다.

### Streamlit 기반 데이터 분석 대시보드
- 드론 이미지 + 주차장 좌표 데이터 로드
- 입출차 이력 기반 시간대별 혼잡도 분석
- 주차구역별 포화도·예측치 시각화
- Plotly 기반 그래프 및 인터랙티브 분석 제공  
**→ 프론트엔드 UI에서 활용하는 지표들의 기반 데이터**

---

# Frontend 기술 스택

- **React 18**
- **Vite**
- **Tailwind CSS**
- **React Router v6**
- **Three.js / WebGL Viewer (Unity WebGL 연동)**

---

# 폴더 구조(Frontend)
```
src/
├─ App.jsx
├─ main.jsx
│
├─ pages/
│ ├─ HomePage/
│ │ ├─ HomePage.jsx
│ │ ├─ Title.jsx
│ │ ├─ Marker.jsx
│ │ └─ Tutorial.jsx
│ │
│ └─ MainPage/
│ ├─ MainPage.jsx
│ ├─ 3dMap.jsx
│ ├─ GoToHome.jsx
│ │
│ └─ Details/
│ ├─ Details.jsx
│ ├─ Time.jsx
│ ├─ TotalSlot.jsx
│ ├─ PredictSlots.jsx
│ ├─ Saturation.jsx
│ ├─ Congestion.jsx
│ ├─ ZoneGuide.jsx
│ ├─ ParkingFeeCalc.jsx
│ └─ Logo.jsx
│
└─ styles/ (선택)
```

---

# 페이지 설명

## 1️. HomePage  
사용자가 처음 접속하는 시작 페이지.

구성 요소:  
- `Title.jsx` — 서비스 제목  
- `Marker.jsx` — 캠퍼스 지도 마커  
- `Tutorial.jsx` — 사용 안내  

---

## 2️. MainPage  
본 서비스의 핵심 화면 — **드론 지도 + 3D 모델 + 주차 정보 패널**

구성 요소:  
### 🔹 왼쪽: 드론 맵 / 3D Map  
- `3dMap.jsx` — Unity WebGL 또는 Three.js 기반 3D 지도  
- 드론 정사사진 기반 평면 지도  

### 🔹 오른쪽: Details Panel (데이터 UI)  
- 시간 표시(Time)
- 총 주차 대수
- 예측 가능한 빈자리(Timeslot Prediction)
- 포화도(Saturation)
- 혼잡도(Congestion)
- 구역 안내(Zone Guide)
- 주차요금 계산기(Parking Fee Calc)
- 로고(Logo)

---

# 🔧 개발 및 실행 방법

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```