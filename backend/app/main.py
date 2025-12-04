from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
from datetime import date
import csv
import os

app = FastAPI(title="Parking Traffic API")

# -----------------------------------
# 설정: CSV 위치 & 총 등록 차량 수
# -----------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
CSV_PATH = os.path.join(DATA_DIR, "filtered_entry_counts_weekdays.csv")

TOTAL_REGISTERED_CARS = 5252  # 전체 등록 차량 수


# -----------------------------------
# Pydantic 모델
# -----------------------------------

class SlotSummary(BaseModel):
    slot: str
    avg_entries_per_day: float
    max_entries_per_day: int
    min_entries_per_day: int
    saturation_ratio: float      # 0~1
    saturation_percent: float    # 0~100


# -----------------------------------
# 메모리 캐시
# -----------------------------------

summary_by_slot: Dict[str, SlotSummary] = {}


# -----------------------------------
# CSV 로딩 & 요약 계산
# -----------------------------------

def load_summary_from_csv():
    """
    filtered_entry_counts_weekdays.csv 구조:

    Date,07:00 ~ 08:00,08:00 ~ 08:30,08:30 ~ 09:00,12:00 ~ 12:30,12:30 ~ 13:00,13:00 ~ 13:30
    2025-09-01,214,379,331,132,235,98
    ...

    → 각 시간대별로 (평일 기준) 평균/최대/최소 + 포화도 계산
    """
    global summary_by_slot
    summary_by_slot = {}

    slot_totals = {}
    slot_counts = {}
    slot_max = {}
    slot_min = {}

    with open(CSV_PATH, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames

        if not fieldnames or "Date" not in fieldnames:
            raise RuntimeError("CSV에 'Date' 컬럼이 없습니다.")

        # 시간대 슬롯 컬럼들 (Date 제외)
        slot_columns = [col for col in fieldnames if col != "Date"]

        for row in reader:
            # 날짜는 굳이 쓰진 않지만 형식 체크용
            _ = date.fromisoformat(row["Date"])

            for slot in slot_columns:
                value_str = row.get(slot, "").strip()
                entries = int(value_str) if value_str != "" else 0

                if slot not in slot_totals:
                    slot_totals[slot] = 0
                    slot_counts[slot] = 0
                    slot_max[slot] = entries
                    slot_min[slot] = entries

                slot_totals[slot] += entries
                slot_counts[slot] += 1
                slot_max[slot] = max(slot_max[slot], entries)
                slot_min[slot] = min(slot_min[slot], entries)

    # 요약 값 → SlotSummary로 변환
    for slot, total in slot_totals.items():
        cnt = slot_counts[slot]
        avg = total / cnt if cnt > 0 else 0.0

        ratio = avg / TOTAL_REGISTERED_CARS if TOTAL_REGISTERED_CARS > 0 else 0.0
        percent = ratio * 100.0

        summary_by_slot[slot] = SlotSummary(
            slot=slot,
            avg_entries_per_day=round(avg, 2),
            max_entries_per_day=slot_max[slot],
            min_entries_per_day=slot_min[slot],
            saturation_ratio=round(ratio, 4),      # 예: 0.0659
            saturation_percent=round(percent, 2),  # 예: 6.59
        )


@app.on_event("startup")
def on_startup():
    load_summary_from_csv()


# -----------------------------------
# API 엔드포인트
# -----------------------------------

@app.get("/api/traffic/entries/weekday/summary",
         response_model=List[SlotSummary])
def get_weekday_summary():
    """
    평일 기준 시간대별:
    - 하루 평균 입차 대수
    - 최대/최소 입차 대수
    - 등록 차량 대비 포화도(비율/퍼센트)
    """
    # 슬롯 이름 기준으로 정렬해서 반환 (보기 좋게)
    return [summary_by_slot[k] for k in sorted(summary_by_slot.keys())]


@app.get("/api/health")
def health():
    return {"status": "ok"}
