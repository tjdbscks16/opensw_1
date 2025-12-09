# Backend

드론 이미지, YOLO 예측 결과, 입출차 데이터를 기반으로
주차장 포화도/혼잡도 API를 제공하는 백엔드 서버입니다.

## 폴더 구조
project-root/
  backend/
    main.py           # FastAPI 서버 
    data/
      parking_load.csv  # 전체 학교 입출차,포화도 계산데이터
      입출차_현황_조회(한림대학교,20250901~20250930) (1).xlsx
      입출차_현황_조회(한림대학교,20251001~20251031) (1).xlsx


## 실행 방법 (예정)
# Backend 실행 방법

1. 가상환경 생성 및 활성화
   - python -m venv .venv
   - .venv\Scripts\Activate.ps1

2. 라이브러리 설치
   - pip install -r requirements.txt  (또는 pandas, fastapi, uvicorn 등)

3. (선택) 데이터 다시 만들고 싶으면
   - python prepare.py

4. 서버 실행
   - python main.py
   - API 문서: http://localhost:8000/docs


