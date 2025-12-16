import streamlit as st
import pandas as pd
from langchain_community.chat_models import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
import plotly.express as px
import plotly.graph_objects as go

# -----------------------------------------------------------------------------
# [DATA CONFIGURATION] 
# 이 데이터는 실제 입출차 현황 데이터를 바탕으로 2025년 9월 1일 ~ 10월 31일 (총 61일) 간의 입출차 로그를 분석한 결과입니다.
# -----------------------------------------------------------------------------

# 1. 핵심 지표 (KPIs) - 61일간의 통합 평균
kpi_data = {
    "avg_daily_traffic": 2730,       # 일 평균 입차량
    "total_days": 61,                # 분석 기간
    "avg_duration": 161,             # 평균 주차 시간 (분)
    "median_duration": 9,            # 중위 주차 시간 (분) - 매우 짧음!
    "short_term_ratio": 55.7,        # 30분 이내 출차 비율 (%)
    "peak_hour": 8                   # 가장 혼잡한 시간 (08시)
}

# 2. 시간대별 평균 입차량 (0시~23시)
hourly_avg_data = {
    'Hour': list(range(24)),
    'Avg_Count': [14.6, 7.0, 6.2, 5.8, 6.7, 19.6, 84.4, 127.9, 431.6, 209.6, 260.5, 163.1, 214.6, 184.4, 161.8, 121.2, 149.0, 151.7, 130.1, 88.3, 63.8, 52.5, 43.1, 32.5]
}

# 3. 요일별 평균 입차량
weekday_avg_data = {
    'Day': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    'Avg_Count': [3494, 3565, 3523, 3477, 2553, 1066, 1060],
    'Type': ['Weekday', 'Weekday', 'Weekday', 'Weekday', 'Weekday', 'Weekend', 'Weekend']
}

# 4. 게이트별 점유율 (%)
gate_share_data = {
    'Gate': ['정문 우측', '정문 좌측', '동문', '서문', '일송기념관', '기타'],
    'Share': [46.9, 23.3, 10.9, 6.0, 6.0, 6.9]
}

# 공통 DataFrame (챗봇 + 차트에서 같이 사용)
df_hourly = pd.DataFrame(hourly_avg_data)
df_week = pd.DataFrame(weekday_avg_data)
df_gate = pd.DataFrame(gate_share_data)

# 🔹 챗봇용으로만 사용할 추가 상세 데이터 (대시보드에는 표시 X)
time_slot_summary = """
## 주차면수

- 전체: **690.4대**
- 공학관: **117대**
- 일송관: **125대**

## 📊 시간대별 주차 현황

**8시 (08:00-09:00)**

- 전체 차량: 377.09대
- 포화도: 54.62%
- 공학관: 31대 (포화도 8.22%, 혼잡도 26.49%)
- 일송관: 21대 (포화도 5.57%, 혼잡도 16.80%)

**9시 (09:00-10:00)**

- 전체 차량: 518.87대
- 포화도: 75.15%
- 공학관: 101대 (포화도 19.50%, 혼잡도 86.32%)
- 일송관: 80대 (포화도 15.44%, 혼잡도 64.00%)

**13시 (13:00-14:00)**

- 전체 차량: 690.40대
- 포화도: 100.0%
- 공학관: 140대 (포화도 20.29%, 혼잡도 100.0%)
- 일송관: 125대 (포화도 18.12%, 혼잡도 100.0%)
"""

# -----------------------------------------------------------------------------
# [STREAMLIT APP LAYOUT]
# -----------------------------------------------------------------------------

st.set_page_config(
    page_title="한림대 주차 분석", 
    layout="wide"
)

# 메인 타이틀
st.title("🏫 한림대학교 주차 이용 패턴 및 통합 분석")
st.markdown("**분석 기준:** 2025년 9월~10월 전체 데이터 통합 (총 61일) | **목표:** '학교 입출차 현황 패턴' 도출")
st.info("💡실제 입출차 현황 데이터를 바탕으로 2025년 9월 1일 ~ 10월 31일 (총 61일) 간의 입출차 로그를 분석한 결과를 시각화합니다.")

# -----------------------------------------------------------------------------
# LLM 설정 (Ollama + Llama3.1)
# -----------------------------------------------------------------------------
chat_llm = ChatOllama(model="llama3.1")  # ollama serve가 백그라운드에서 돌아가 있어야 함

chat_prompt = ChatPromptTemplate.from_template("""
너는 한림대학교 주차 데이터 분석을 도와주는 어시스턴트야.

[사용 가능한 데이터 요약]
- 일 평균 입차량: {avg_daily_traffic}대
- 분석 기간: {total_days}일 (2025-09-01 ~ 10-31)
- 평균 체류 시간: {avg_duration}분
- 중위 체류 시간: {median_duration}분
- 30분 이내 출차 비율: {short_term_ratio}%
- 피크 시간: {peak_hour}시

[요일별 평균 입차량]
{weekday_summary}

[게이트별 유입 비중]
{gate_summary}

[주차면수 및 주요 시간대별 주차 현황]
{time_slot_summary}

위 데이터만 기준으로, 사용자의 질문에 한국어로 친절하게 답변해 줘.
숫자를 말할 땐 **굵게** 표시해 줘.
데이터에 없는 정보는 아는 척 하지 말고, 모른다고 말해.
질문: {question}
""")

# 요약 텍스트 만들기 (챗봇 prompt용)
weekday_summary = "\n".join(
    f"- {row.Day}: {row.Avg_Count}대 ({row.Type})"
    for row in df_week.itertuples()
)

gate_summary = "\n".join(
    f"- {row.Gate}: {row.Share}%"
    for row in df_gate.itertuples()
)

# -----------------------------------------------------------------------------
# 1. LLM 기반 Q&A 챗봇 섹션 (맨 위)
# -----------------------------------------------------------------------------
st.header("💬 주차 데이터 Q&A 챗봇 (로컬 LLM)")

st.caption("한림대 주차 패턴, 혼잡 시간대, 게이트별 쏠림 등에 대해 자연어로 질문해 보세요.")

if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

MAX_HISTORY = 5  # 최근 5개 메시지만 보여주기

# 기존 대화 출력
for role, message in st.session_state.chat_history[-MAX_HISTORY:]:
    with st.chat_message(role):
        st.markdown(message)

user_input = st.chat_input("한림대 주차 패턴에 대해 뭐든 물어보세요!")

if user_input:
    # 유저 발화 저장 + 출력
    st.session_state.chat_history.append(("user", user_input))
    with st.chat_message("user"):
        st.markdown(user_input)

    # LLM 체인 입력값 만들기
    chain_input = {
        "avg_daily_traffic": kpi_data["avg_daily_traffic"],
        "total_days": kpi_data["total_days"],
        "avg_duration": kpi_data["avg_duration"],
        "median_duration": kpi_data["median_duration"],
        "short_term_ratio": kpi_data["short_term_ratio"],
        "peak_hour": kpi_data["peak_hour"],
        "weekday_summary": weekday_summary,
        "gate_summary": gate_summary,
        "time_slot_summary": time_slot_summary,  # 🔹 여기서만 전달, 화면엔 안 나옴
        "question": user_input,
    }

    # LLM 호출
    with st.chat_message("assistant"):
        with st.spinner("로컬 LLM으로 답변 생성 중..."):
            msgs = chat_prompt.format_messages(**chain_input)
            res = chat_llm.invoke(msgs)
            reply = res.content
            st.markdown(reply)

    st.session_state.chat_history.append(("assistant", reply))

st.divider()

# -----------------------------------------------------------------------------
# 2. 핵심 지표 (Key Metrics)
# -----------------------------------------------------------------------------
st.header("📊 1. 핵심 운영 지표 (Key Metrics)")
col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric(label="일 평균 입차량", value=f"{kpi_data['avg_daily_traffic']:,} 대", help="주말 포함 전체 평균")
with col2:
    st.metric(label="중위 체류 시간", value=f"{kpi_data['median_duration']} 분", delta="-단기 체류 중심", delta_color="off", help="전체 차량의 50%가 이 시간 내에 나갑니다.")
with col3:
    st.metric(label="회차 차량 비율 (30분↓)", value=f"{kpi_data['short_term_ratio']}%", help="30분 이내 출차하는 차량의 비율")
with col4:
    st.metric(label="최대 입차량 시간 (Peak)", value=f"{kpi_data['peak_hour']}시", help="하루 중 입차량이 가장 많은 시간대")

st.divider()

# -----------------------------------------------------------------------------
# 3. CHARTS & INSIGHTS
# -----------------------------------------------------------------------------
row1_1, row1_2 = st.columns([1, 1])

# Chart 1: Hourly Pattern
with row1_1:
    st.subheader("⏰ 시간대별 평균 트래픽 패턴")
    
    # Highlight Peak Hour
    colors = ['#e0e0e0'] * 24
    colors[8] = '#ff4b4b'  # Red for Peak
    colors[12] = '#ffa15a' # Orange for Lunch
    
    fig_hourly = go.Figure(data=[go.Bar(
        x=df_hourly['Hour'],
        y=df_hourly['Avg_Count'],
        marker_color=colors
    )])
    fig_hourly.update_layout(
        title="시간대별 평균 입차량 (08시 피크, 12시 점심 유입)",
        xaxis_title="시간 (0~23시)",
        yaxis_title="평균 입차량 (대)",
        template="plotly_white"
    )
    st.plotly_chart(fig_hourly, use_container_width=True)
    st.info("💡 **08시 등교 시간**에 하루 트래픽이 폭발하며, 이후 17시까지 꾸준한 유입이 지속됩니다.")

# Chart 2: Weekday Pattern
with row1_2:
    st.subheader("📅 요일별 평균 이용량 (금요일 감소)")
    
    fig_week = px.bar(df_week, x='Day', y='Avg_Count', color='Type',
                      color_discrete_map={'Weekday': '#2b83ba', 'Weekend': '#abdda4'},
                      title="요일별 평균 입차량 비교")
    fig_week.update_layout(template="plotly_white")
    st.plotly_chart(fig_week, use_container_width=True)
    st.info("💡 월~목은 비슷하나, **금요일(-28%)** 부터 통행량이 급감합니다. 주말은 평일의 1/3 수준입니다.")

row2_1, row2_2 = st.columns([1, 1])

# Chart 3: Gate Share
with row2_1:
    st.subheader("🚧 게이트별 점유율 (쏠림 현상)")
    
    fig_gate = px.pie(df_gate, values='Share', names='Gate', hole=0.4,
                      title="게이트별 차량 유입 비중")
    fig_gate.update_traces(textposition='inside', textinfo='percent+label')
    st.plotly_chart(fig_gate, use_container_width=True)
    st.info("💡 정문(우/좌)으로 전체 차량의 70%가 진입합니다. 동문/서문의 활용도가 낮습니다.")

# Insights Text
with row2_2:
    st.subheader("📊 데이터 기반 핵심 인사이트 TOP 6")
    
    # 첫 번째 줄
    c1, c2 = st.columns(2)
    with c1:
        with st.container(border=True):
            st.markdown("### 🚕 '잠깐 들르는' 학교")
            st.markdown("30분 내 출차 비율 **55.7%**! 주차보다는 **회차(택시/픽업/배달)** 수요가 압도적입니다.")
    with c2:
        with st.container(border=True):
            st.markdown("### 📉 금요일의 트래픽")
            st.markdown("월~목 대비 금요일 트래픽이 **1,000대(-28%)** 급감합니다. 주 4일 수업과 공강의 영향이 뚜렷합니다.")

    # 두 번째 줄
    c3, c4 = st.columns(2)
    with c3:
        with st.container(border=True):
            st.markdown("### 🚨 정문 병목 주의")
            st.markdown("차량 **10대 중 7대**가 정문으로 몰립니다. **08~09시 등교 시간** 정문 앞 신호 체계 및 교통 정리가 필수적입니다.")
    with c4:
        with st.container(border=True):
            st.markdown("### 🍱 점심시간 2차 피크")
            st.markdown("**12시~13시**에 입차량이 다시 튀어 오릅니다. 교직원 식사 이동 및 외부 방문객 유입 시간대입니다.")

    # 세 번째 줄
    c5, c6 = st.columns(2)
    with c5:
        with st.container(border=True):
            st.markdown("### 🌊 꾸준한 주간 유입")
            st.markdown("일반 회사와 다릅니다. 수업 교체 시간인 **09시~16시** 사이에도 시간당 **150대 이상**이 꾸준히 들어옵니다.")
    with c6:
        with st.container(border=True):
            st.markdown("### 🏖️ 여유로운 주말")
            st.markdown("주말 유입은 평일의 1/3 수준(약 1,000대)입니다. 주말 행사나 시설 대관 시 주차 공간은 매우 넉넉합니다.")

# Footer
st.markdown("---")
