# main.py
from pathlib import Path
from typing import Dict, Any

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

# =========================
# 건물별/시간대별 주차 정보 (추가)
# =========================

# 건물별 총 주차면수
BUILDING_CAPACITY: Dict[str, int] = {
    "eng": 117,     # 공학관
    "ilsong": 125,  # 일송관
}

# 키 시간대별 캠퍼스 전체 머무는 차량 수 (주차/누적 차량 수)
KEY_HOUR_TOTAL_ACTIVE: Dict[int, int] = {
    8: 377,
    9: 518,
    13: 690,
}

# 건물별 키 시간대 차량 수
# 2025-12-10 기준 데이터:
# - 공학관: 8시 31대, 9시 101대, 13시 140대
# - 일송관: 8시 21대, 9시 80대(수정), 13시 125대
BUILDING_ACTIVE: Dict[str, Dict[int, int]] = {
    "eng": {      # 공학관
        8: 31,
        9: 101,
        13: 140,
    },
    "ilsong": {   # 일송관
        8: 21,
        9: 80,    # <- 여기 80으로 반영
        13: 125,
    },
}

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
# 헬퍼 함수 (건물별 포화도/혼잡도 계산)
# =========================

def compute_building_metrics() -> Dict[str, Dict[str, Any]]:
    """
    BUILDING_ACTIVE, BUILDING_CAPACITY, KEY_HOUR_TOTAL_ACTIVE 를 기반으로
    건물별·시간대별 포화도(saturation) / 혼잡도(congestion) 계산.

    반환 구조 예시:
    {
      "eng": {
        "8": {
          "hour": 8,
          "vehicles": 31,
          "total_active": 377,
          "capacity": 117,
          "saturation_ratio": 0.0822,
          "saturation_percent": 8.22,
          "congestion_ratio": 0.2649,
          "congestion_percent": 26.49
        },
        ...
      },
      "ilsong": { ... }
    }
    """
    result: Dict[str, Dict[str, Any]] = {}

    for building, hours_data in BUILDING_ACTIVE.items():
        capacity = BUILDING_CAPACITY.get(building)
        result[building] = {}

        for hour, building_count in hours_data.items():
            total_active = KEY_HOUR_TOTAL_ACTIVE.get(hour)

            # 0 또는 None 방지
            if not total_active or not capacity:
                continue

            # 포화도: (건물 차량 수) / (해당 시간 전체 차량 수)
            saturation_ratio = building_count / total_active
            saturation_percent = saturation_ratio * 100.0

            # 혼잡도: (건물 차량 수) / (건물 주차면수)
            congestion_ratio = building_count / capacity
            congestion_percent = congestion_ratio * 100.0

            # 100% 초과 시 100으로 클램핑
            if saturation_percent > 100.0:
                saturation_percent = 100.0
            if congestion_percent > 100.0:
                congestion_percent = 100.0

            result[building][str(hour)] = {
                "hour": hour,
                "vehicles": building_count,
                "total_active": total_active,
                "capacity": capacity,
                "saturation_ratio": saturation_ratio,
                "saturation_percent": round(saturation_percent, 2),
                "congestion_ratio": congestion_ratio,
                "congestion_percent": round(congestion_percent, 2),
            }

    return result

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
# 기존 API 엔드포인트
# =========================


@app.get("/api/parking/summary")
def get_parking_summary():
    """
    전체 시간대(08~15시)에 대한 요약 정보 반환
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
# 새 API: 건물별 포화도/혼잡도
# =========================

@app.get("/api/parking/buildings/key-hours")
def get_buildings_key_hours():
    """
    공학관 / 일송관 기준 키 시간대(8, 9, 13)의 포화도·혼잡도 정보 제공

    - 포화도(saturation): (건물 차량 수) / (해당 시간 전체 머무는 차량 수)
    - 혼잡도(congestion): (건물 차량 수) / (건물 총 주차면수)
    - 퍼센트 값은 0~100 사이로 클램핑됨
    """
    metrics = compute_building_metrics()

    return {
        "hours": WEB_HOURS,
        "total_active": {str(h): KEY_HOUR_TOTAL_ACTIVE[h] for h in WEB_HOURS},
        "buildings": {
            "eng": {
                "name": "공학관",
                "capacity": BUILDING_CAPACITY["eng"],
                "metrics": metrics.get("eng", {}),
            },
            "ilsong": {
                "name": "일송관",
                "capacity": BUILDING_CAPACITY["ilsong"],
                "metrics": metrics.get("ilsong", {}),
            },
        },
    }


# =========================
# 로컬 실행 진입점
# =========================

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
