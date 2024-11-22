import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import UserSub from "./Subscribe/components/UserSub";
import TabNavigation from "./detail/TabNavigation";
import UserInfo from "./detail/UserInfo";
import MonthlyStudyChart from "./detail/MonthlyStudyChart";
import WeeklyStudyChart from "./detail/WeeklyStudyChart";
import Sidebar from "./Sidebar";
import CardList from "./detailCard/CardList";
import CardDetails from "./detailCard/CardDetails";

const UserDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("user");
    const [activeChart, setActiveChart] = useState("monthlyStudy"); // 학습량 버튼 상태 관리
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    // 월별 학습량
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthlyStudyData, setMonthlyStudyData] = useState([]);

    // 주차별 학습량
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [weekOptions, setWeekOptions] = useState([]);
    const [week, setWeek] = useState(1);
    const [dailyStudyData, setDailyStudyData] = useState([]);

    useEffect(() => {
        if (!email) {
            navigate("/");
            return;
        }

        axios
            .get(`/api/users/${email}`)
            .then((response) => setUser(response.data))
            .catch((error) => console.error("Error fetching user details:", error));

        fetchUserCards();
        fetchMonthlyStudyData();
    }, [email, year]);

    useEffect(() => {
        fetchWeekOptions();
    }, [year, month]);

    useEffect(() => {
        fetchDailyStudyData();
    }, [week]);

    const fetchUserCards = () => {
        axios
            .get(`/api/cards/user/${email}`)
            .then((response) => setCards(response.data))
            .catch((error) => console.error("Error fetching user cards:", error));
    };

    const fetchMonthlyStudyData = () => {
        axios
            .get(`/api/study-time/monthly`, { params: { email, year } })
            .then((response) => {
                const data = response.data.map((log, index) => ({
                    month: `${index + 1}월`,
                    studyTime: Math.floor(log / 60),
                }));
                setMonthlyStudyData(data);
            })
            .catch((error) => console.error("Error fetching monthly study data:", error));
    };

    const fetchWeekOptions = () => {
        axios
            .get(`/api/study-time/week-ranges`, { params: { year, month } })
            .then((response) => {
                const weeks = response.data;
                setWeekOptions(
                    weeks.map((w) => ({
                        week: w.week,
                        label: `${w.week}주차 (${w.startDate} ~ ${w.endDate})`,
                    }))
                );
                setWeek(1);
            })
            .catch((error) => console.error("Error fetching week ranges:", error));
    };

    const fetchDailyStudyData = () => {
        axios
            .get(`/api/study-time/daily`, { params: { email, year, month, week } })
            .then((response) => {
                const data = response.data.map((log) => ({
                    date: new Date(log.date).toLocaleDateString("ko-KR", { weekday: "short" }),
                    studyTime: Math.floor(log.studyTime / 60),
                }));
                setDailyStudyData(data);
            })
            .catch((error) => console.error("Error fetching daily study data:", error));
    };

    const translateIdentity = (identity) => {
        switch (identity) {
            case "elementary":
                return "초등학생";
            case "middle":
                return "중학생";
            case "high":
                return "고등학생";
            case "college":
                return "대학생";
            case "adult":
                return "어른";
            default:
                return identity;
        }
    };

    const translateSignupPurpose = (purpose) => {
        switch (purpose) {
            case "elementary_vocabulary":
                return "초등영단어";
            case "middle_vocabulary":
                return "중등영단어";
            case "high_vocabulary":
                return "고등영단어";
            case "csat":
                return "수능";
            case "toeic":
                return "토익";
            case "toefl":
                return "토플";
            default:
                return purpose;
        }
    };

    const tabs = [
        { value: "user", label: "유저 정보" },
        { value: "cards", label: "카드" },
        { value: "subscriptions", label: "구독" },
    ];

    const chartTabs = [
        { value: "monthlyStudy", label: "월별 학습량" },
        { value: "weeklyStudy", label: "주차별 학습량" },
    ];

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-10">
                <h2 className="text-2xl font-bold mb-6">{user.nickname}님의 상세 정보</h2>

                <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === "user" && (
                    <>
                        <UserInfo
                            user={user}
                            translateIdentity={translateIdentity}
                            translateSignupPurpose={translateSignupPurpose}
                        />
                        <TabNavigation
                            tabs={chartTabs}
                            activeTab={activeChart}
                            setActiveTab={setActiveChart}
                        />
                        {activeChart === "monthlyStudy" && (
                            <MonthlyStudyChart
                                year={year}
                                setYear={setYear}
                                monthlyStudyData={monthlyStudyData}
                            />
                        )}
                        {activeChart === "weeklyStudy" && (
                            <WeeklyStudyChart
                                month={month}
                                setMonth={setMonth}
                                week={week}
                                setWeek={setWeek}
                                weekOptions={weekOptions}
                                dailyStudyData={dailyStudyData}
                            />
                        )}
                    </>
                )}
                {activeTab === "cards" && (
                    <>
                        {!selectedCard ? (
                            <CardList cards={cards} onCardClick={setSelectedCard} />
                        ) : (
                            <CardDetails
                                card={selectedCard}
                                onClose={() => setSelectedCard(null)}
                                onDeleteCard={(deletedCardNumber) => {
                                    // 카드 삭제 후 리스트 업데이트
                                    setCards(cards.filter((c) => c.cardNumber !== deletedCardNumber));
                                    setSelectedCard(null); // 디테일 보기 닫기
                                }}
                                updateCard={(updatedCard) => {
                                    // 단어 삭제 후 업데이트된 카드 데이터 적용
                                    setCards(
                                        cards.map((c) =>
                                            c.cardNumber === updatedCard.cardNumber ? updatedCard : c
                                        )
                                    );
                                    setSelectedCard(updatedCard); // 디테일 창에 업데이트된 데이터 반영
                                }}
                            />
                        )}
                    </>
                )}
                {activeTab === "subscriptions" && (
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <UserSub />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetailPage;
