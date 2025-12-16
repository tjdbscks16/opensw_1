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
    'Avg_Count': [14.6, 7.0,점에 대해 질문해 보세요.""

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
            st.markdown("30분 내 출차 비율 **55.7%**! 방문객 차량의 장기 주차보다는 **회차(택시/픽업/배달)**비율이 높습니다.")
    with c2:
        with st.container(border=True):
            st.markdown("### 📉 금요일의 트래픽")
            st.markdown("월~목 대비 금요일 트래픽이 **1,000대(-28%)** 급감합니다. 금요일 공강 수요가 뚜렷하게 나타납니다.")

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
            st.markdown("수업 시간인 **09시~16시** 사이에도 시간당 **150대 이상**이 꾸준히 들어옵니다.")
    with c6:
        with st.container(border=True):
            st.markdown("### 🏖️ 여유로운 주말")
            st.markdown("주말 유입은 평일의 1/3 수준(약 1,000대)입니다. 주말 행사나 시설 대관 시 주차 공간은 매우 넉넉합니다.")

# Footer
st.markdown("---")
