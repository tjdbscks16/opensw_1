## 🎯 프로젝트명: Campus Parking Guide

# 🚗 한림대학교 사전 예측 기반 주차 정보 제공 웹 서비스

## WHAT IS IT?

한림대학교 주차장을 대상으로 **사전 예측 기반 주차 정보**를 제공하는 **반응형 웹 서비스**입니다.
방문 전에 주차 혼잡도를 미리 파악할 수 있도록 분석·예측 중심의 정보를 제공합니다.

---

## I. 소개 및 배경

교내 주차장은 특정 시간대에 혼잡이 집중되는 문제가 있으며, 실시간 확인만으로는 방문 전 의사결정에 한계가 있습니다.
본 서비스는 **과거 주차 데이터 분석**과 **시뮬레이션 기반 시각화**를 통해, 사용자에게 보다 직관적이고 예측 가능한 주차 정보를 제공하는 것을 목표로 합니다.

---

## HOW DOES IT WORK?

### 1️⃣ 드론 기반 3D 주차장 시뮬레이션

* 드론 촬영 데이터를 활용하여 주차장 **3D 구조를 모델링**
* 주차 구역 배치 및 **차량 이동 동선**을 직관적으로 시각화
* 사용자가 실제 주차 환경을 사전에 이해 가능

### 2️⃣ 주차 데이터 분석 및 예측

* 수집된 실제 주차 데이터를 기반으로 EDA 수행
* 시간대·구역별 **주차 혼잡 경향 분석**
* 과거 패턴을 활용한 **사전 예측 정보 제공**

---

## SERVICE CHARACTERISTICS

* 📊 **분석·예측 중심 서비스**
  실시간 제어가 아닌, 방문 전 참고용 정보 제공에 초점

* 🌐 **REACT 기반 반응형 웹**
  PC·모바일 환경 모두 지원

* 🧭 **직관적인 시각화**
  3D 시뮬레이션과 데이터 시각화를 결합한 UI 제공

---


## 👥 팀원별 업무 분담

### 🟨 조승범 (20216649)
**Role:** 드론 촬영 및 프로젝트 전체 아키텍처 설계 · 기술 리딩
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![YOLOv8](https://img.shields.io/badge/YOLOv8-00FFFF?style=flat)
![Drone](https://img.shields.io/badge/Drone-555555?style=flat)

**Responsibility**
- 드론을 활용한 캠퍼스 주차장 정사사진 촬영
- 드론 데이터 수집 및 전처리
- AI 모델 학습을 위한 데이터셋 구축
- 프로젝트 전반 기술 아키텍처 설계 및 기술 의사결정 리딩

**Collaboration**
- 프론트엔드·백엔드·WebGL 파트와 기술 구조 및 데이터 흐름 협업
- Unity WebGL ↔ JavaScript 연동 구조 협업
- 드론 촬영 데이터 및 AI 분석 결과 활용 방안 협의

---

### 🟥 박준우 (20215162)
**Role:** Unity 기반 3D WebGL 뷰어 개발 담당
![Unity](https://img.shields.io/badge/Unity-000000?style=flat&logo=unity&logoColor=white)
![WebGL](https://img.shields.io/badge/WebGL-990000?style=flat&logo=webgl&logoColor=white)
![C%23](https://img.shields.io/badge/C%23-239120?style=flat&logo=c-sharp&logoColor=white)

**Responsibility**
- Unity를 활용한 주차장 3D 모델링 작업
- 주차장 진입로 및 구획 3D 뷰어 구현
- Unity WebGL 빌드 및 웹 환경 통합
- Unity ↔ JavaScript 상호작용 기능 구현

**Collaboration**
- 프론트엔드와 Unity 호출 규약 및 UI 연동 협업
- 백엔드 데이터 기반 주차 정보 시각화 협업
- 기술 리드와 WebGL 연동 구조 협의

---

### 🟦 서윤찬 (20215169)
**Role:** 서버 및 데이터 분석 아키텍처 설계 담당
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=flat&logo=streamlit&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)

**Responsibility**
- 백엔드 서버 환경 설정 및 API 설계
- 데이터베이스 구축 및 관리
- 프론트엔드–백엔드 연동 작업
- 데이터 분석을 통한 서비스 인사이트 도출

**Collaboration**
- 프론트엔드 연동을 위한 API 명세 협업
- 드론 및 AI 분석 결과 데이터 구조 협의
- 기술 리드와 데이터 파이프라인 구조 협업

---

### 🟩 홍윤이 (20235279)
**Role:** 웹 프론트엔드 및 UI·UX 설계 · 구현 담당
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

**Responsibility**
- 모바일 웹 인터페이스 개발
- 웹 UI/UX 디자인 및 인터랙션 구현
- 드론 맵 뷰, 마커, Bottom Sheet 등 사용자 인터랙션 구현
- 서버 API 연동 및 데이터 시각화

**Collaboration**
- Unity WebGL ↔ 웹 상호작용 코드 적용
- 기술 리드와 UI/UX 기술 방향 협업
- 백엔드 API 연동 및 데이터 표현 방식 협업

## OVERALL STACK SUMMARY

- **Frontend**: React, HTML, CSS, JavaScript
- **3D Visualization**: Unity, WebGL
- **Backend**: FastAPI
- **Data Analysis**: Python, Streamlit
- **Infra**: Vercel, Ngrok

