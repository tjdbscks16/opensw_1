# main.py
from pathlib import Path

import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# =========================
# 기본 설정
# =========================

# 현재 파일 기준 경로
BASE_DIR = Path(__file__).resolve().parent

# 우리가 만든 CSV: data/parking_load.csv
# 컬럼:
# time_slot, hour, avg_entry_count, avg_active_count,
# estimated_capacity, saturation_ratio, saturation_percent
PARKING_LOAD_PATH = BASE_DIR / "data" / "parking_load.csv"

# 정적 파일 (프론트 빌드 파일 들어갈 예정이라면)
STATIC_DIR = BASE_DIR / "static"

# CSV에 들어있는 전체 시간대 (08~15시)
HOURS = [8, 9, 10, 11, 12, 13, 14, 15]

# 웹 UI에서 강조해서 사용할 시간대 (예: 8시, 9시, 13시)
WEB_HOURS = [8, 9, 13]

app = FastAPI(
    title="Hallym Parking Load API",
    description="9~10월 평일 기준 시간대별 평균 입차·주차 차량 수 및 포화도 API",
    version="1.0.0",
)

# CORS 설정 (프론트엔드에서 호출 가능하도록)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: 운영 시 특정 도메인만 허용하도록 변경 가능
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# 데이터 로딩
# =========================

print("▶ parking_load.csv 로딩 중...")
parking_df = pd.read_csv(PARKING_LOAD_PATH)

# hour 기준 인덱스 설정
parking_df.set_index("hour", inplace=True)

# estimated_capacity 는 모든 row에서 동일하다고 가정
try:
    ESTIMATED_CAPACITY = float(parking_df["estimated_capacity"].iloc[0])
except Exception:
    ESTIMATED_CAPACITY = None

print("▶ 로딩 완료:", parking_df.shape)
print("▶ 사용 가능한 시간대(hour):", list(parking_df.index.unique()))

# =========================
# 정적 파일 및 루트 페이지
# =========================

if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")
    print(f"▶ 정적 파일 디렉터리 마운트 완료: {STATIC_DIR}")
else:
    print("⚠ static 디렉터리가 없습니다. 정적 파일 서빙은 비활성화 상태입니다.")


@app.get("/", include_in_schema=False)
def read_root():
    """
    기본 페이지
    - static/index.html 이 있으면 그 파일 반환
    - 없으면 안내 메시지 반환
    """
    index_file = STATIC_DIR / "index.html"
    if index_file.exists():
        return FileResponse(str(index_file))
    return {
        "message": "Hallym Parking Load API입니다. /docs 또는 /api/health 를 확인하세요."
    }

# =========================
# API 엔드포인트
# =========================


@app.get("/api/parking/summary")
def get_parking_summary():
    """
    전체 시간대(08~15시)에 대한 요약 정보 반환

    - 각 hour별:
      - time_slot (예: 08:00-09:00)
      - avg_entry_count      : 시간대 구간 평균 입차 차량 수
      - avg_active_count     : 시간대 구간 평균 주차/누적 차량 수
      - estimated_capacity   : 추정 전체 주차면수
      - saturation_ratio     : 포화도 비율 (0~1)
      - saturation_percent   : 포화도 (%)
    """
    records = []
    for h in HOURS:
        if h not in parking_df.index:
            continue
        row = parking_df.loc[h]
        records.append(
            {
                "hour": int(h),
                "time_slot": str(row["time_slot"]),
                "avg_entry_count": float(row["avg_entry_count"]),
                "avg_active_count": float(row["avg_active_count"]),
                "estimated_capacity": float(row["estimated_capacity"]),
                "saturation_ratio": float(row["saturation_ratio"]),
                "saturation_percent": float(row["saturation_percent"]),
            }
        )
    return {
        "capacity": ESTIMATED_CAPACITY,
        "hours": HOURS,
        "data": records,
    }


@app.get("/api/parking/entry")
def get_parking_entry():
    """
    웹에서 집중해서 보여줄 시간대(WEB_HOURS)에 대한
    시간대별 평균 '입차 차량 수' 반환
    """
    return {
        str(h): float(parking_df.loc[h, "avg_entry_count"])
        for h in WEB_HOURS
        if h in parking_df.index
    }


@app.get("/api/parking/occupancy")
def get_parking_occupancy():
    """
    웹에서 집중해서 보여줄 시간대(WEB_HOURS)에 대한
    시간대별 평균 '주차/누적 차량 수' 반환
    """
    return {
        str(h): float(parking_df.loc[h, "avg_active_count"])
        for h in WEB_HOURS
        if h in parking_df.index
    }


@app.get("/api/parking/saturation")
def get_parking_saturation():
    """
    웹에서 집중해서 보여줄 시간대(WEB_HOURS)에 대한
    시간대별 평균 포화도(% 단위) 반환
    """
    return {
        str(h): float(parking_df.loc[h, "saturation_percent"])
        for h in WEB_HOURS
        if h in parking_df.index
    }


@app.get("/api/parking/saturation/key-hours")
def get_key_hours_saturation():
    """
    웹 UI에서 바로 사용할 8시 / 9시 / 13시 포화도(%)

    - 기준: parking_load.csv 의 saturation_percent 컬럼
    - 분모: estimated_capacity (데이터에서 추정한 전체 주차면수)

    응답 예시:
    {
      "estimated_capacity": 690.4,
      "hours": [8, 9, 13],
      "saturation_percent": {
        "8": 54.62,
        "9": 75.15,
        "13": 100.0
      }
    }
    """
    sat = {}
    for h in WEB_HOURS:
        if h not in parking_df.index:
            continue
        sat[str(h)] = float(parking_df.loc[h, "saturation_percent"])

    return {
        "estimated_capacity": ESTIMATED_CAPACITY,
        "hours": WEB_HOURS,
        "saturation_percent": sat,
    }


@app.get("/api/parking/meta")
def get_parking_meta():
    """
    메타 정보:
    - 전체 시간대 리스트 (HOURS)
    - 웹에서 사용하는 시간대 리스트 (WEB_HOURS)
    - 추정 전체 주차면수 (estimated_capacity)
    """
    return {
        "hours": HOURS,
        "web_hours": WEB_HOURS,
        "estimated_capacity": ESTIMATED_CAPACITY,
    }


@app.get("/api/health")
def health():
    """헬스 체크용"""
    return {"status": "ok"}


# =========================
# 로컬 실행 진입점
# =========================

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
