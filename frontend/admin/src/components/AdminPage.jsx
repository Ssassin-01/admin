import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import UserTable from "./UserTable";
import RevenueChart from "./RevenueChart";

const AdminPage = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthlyData, setMonthlyData] = useState([]);
    const [subscriptionRate, setSubscriptionRate] = useState(1500); // 기본값
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchMonthlySubscribers();
        fetchUsers();
    }, [year]);

    const fetchMonthlySubscribers = () => {
        axios
            .get(`/api/userSub/monthlySubscribers`, { params: { year } })
            .then((response) => {
                const data = response.data.map((item) => ({
                    month: `${item.month}월`,
                    subscribers: item.subscriberCount,
                    revenue: item.subscriberCount * subscriptionRate,
                }));
                setMonthlyData(data);
            })
            .catch((error) => console.error("Error fetching monthly subscribers!", error));
    };

    const fetchUsers = () => {
        axios
            .get("/api/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Error fetching users!", error));
    };

    const handleRateChange = (newRate) => {
        const rate = parseInt(newRate, 10) || 1500;
        setSubscriptionRate(rate);

        // 수익률 업데이트
        setMonthlyData((prevData) =>
            prevData.map((item) => ({
                ...item,
                revenue: item.subscribers * rate,
            }))
        );
    };

    const handleYearChange = (newYear) => {
        setYear(newYear);
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

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <main className="flex-1 p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold">관리자 페이지</h1>
                </header>

                {/* Revenue Chart */}
                <RevenueChart
                    monthlyData={monthlyData}
                    year={year}
                    subscriptionRate={subscriptionRate}
                    onRateChange={handleRateChange}
                    onYearChange={handleYearChange}
                />

                {/* User Table */}
                <UserTable
                    users={users}
                    setUsers={setUsers}
                    translateIdentity={translateIdentity}
                    translateSignupPurpose={translateSignupPurpose}
                />
            </main>
        </div>
    );
};

export default AdminPage;
