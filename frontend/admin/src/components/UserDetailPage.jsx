import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const UserDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    const [user, setUser] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [weekOptions, setWeekOptions] = useState([]);
    const [week, setWeek] = useState(1);
    const [monthlyStudyData, setMonthlyStudyData] = useState([]);
    const [dailyStudyData, setDailyStudyData] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editUserData, setEditUserData] = useState(null);

    useEffect(() => {
        if (!email) {
            navigate("/");
            return;
        }

        // 사용자 정보 가져오기
        axios
            .get(`/api/users/${email}`)
            .then((response) => setUser(response.data))
            .catch((error) => console.error("Error fetching user details:", error));

        fetchMonthlyStudyData();
        fetchWeekOptions();
    }, [email, year, month]);

    useEffect(() => {
        fetchDailyStudyData();
    }, [week]);

    const fetchMonthlyStudyData = () => {
        axios
            .get(`/api/study-time/monthly`, { params: { email, year } })
            .then((response) => {
                const data = response.data.map((studyTime, index) => ({
                    month: `${index + 1}월`,
                    studyTime: Math.floor(studyTime / 60),
                }));
                setMonthlyStudyData(data);
            })
            .catch((error) => console.error("Error fetching monthly study data:", error));
    };

    const fetchWeekOptions = () => {
        axios
            .get(`/api/study-time/weekly`, { params: { email, year, month } })
            .then((response) => {
                const weeks = response.data.length || 0;
                setWeekOptions(Array.from({ length: weeks }, (_, i) => i + 1));
                setWeek(1); // 기본값: 1주차
            })
            .catch((error) => console.error("Error fetching weekly study data:", error));
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

    const handleEditUser = () => {
        setEditUserData(user);
        setIsEditModalOpen(true);
    };

    const handleEditChange = (e) => {
        setEditUserData({
            ...editUserData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditSubmit = () => {
        axios
            .put(`/api/users/${editUserData.email}`, editUserData)
            .then(() => {
                alert("사용자 정보가 수정되었습니다.");
                setUser(editUserData);
                setIsEditModalOpen(false);
            })
            .catch((error) => {
                console.error("Error editing user:", error);
                alert("사용자 수정에 실패했습니다.");
            });
    };

    const handleDeleteUser = () => {
        if (window.confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
            axios
                .delete(`/api/users/${user.email}`)
                .then(() => {
                    alert("사용자가 삭제되었습니다.");
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Error deleting user:", error);
                    alert("사용자 삭제에 실패했습니다.");
                });
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-purple-500 text-white p-6">
                <h2 className="text-2xl font-bold mb-8">회사 로고</h2>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <a href="#" className="hover:underline">대시보드</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">보고서</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">사용자 관리</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">설정</a>
                        </li>
                    </ul>
                </nav>
            </aside>

            <div className="flex-1 p-10">
                <h2 className="text-2xl font-bold mb-6">{user.nickname}님의 상세 정보</h2>

                {/* 연도, 월, 주차 선택 */}
                <div className="mb-4 flex space-x-4">
                    <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="p-2 border border-gray-300 rounded-lg">
                        {[...Array(5)].map((_, idx) => (
                            <option key={idx} value={new Date().getFullYear() - idx}>
                                {new Date().getFullYear() - idx}년
                            </option>
                        ))}
                    </select>
                    <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="p-2 border border-gray-300 rounded-lg">
                        {Array.from({ length: 12 }, (_, idx) => idx + 1).map((m) => (
                            <option key={m} value={m}>{m}월</option>
                        ))}
                    </select>
                    <select value={week} onChange={(e) => setWeek(Number(e.target.value))} className="p-2 border border-gray-300 rounded-lg">
                        {weekOptions.map((w) => (
                            <option key={w} value={w}>{w}주차</option>
                        ))}
                    </select>
                </div>

                {/* 월별 학습량 */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">월별 학습량</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyStudyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="studyTime" stroke="#8884d8" name="학습 시간 (분)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* 선택된 주차의 일별 학습량 */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">일별 학습량 (주차별)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dailyStudyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="studyTime" stroke="#ff7300" name="학습 시간 (분)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* 사용자 정보 테이블 */}
                <div className="overflow-x-auto mb-6">
                    <table className="table-auto w-full border border-gray-300 rounded-lg text-center mb-6">
                        <thead className="bg-purple-500 text-white">
                        <tr>
                            <th className="px-4 py-2">이메일</th>
                            <th className="px-4 py-2">닉네임</th>
                            <th className="px-4 py-2">생년월일</th>
                            <th className="px-4 py-2">연락처</th>
                            <th className="px-4 py-2">성별</th>
                            <th className="px-4 py-2">신분</th>
                            <th className="px-4 py-2">가입 목적</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        <tr className="border-t">
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">{user.nickname}</td>
                            <td className="px-4 py-3">{user.date}</td>
                            <td className="px-4 py-3">{user.telNumber || "없음"}</td>
                            <td className="px-4 py-3">{user.gender === 0 ? "남" : "여"}</td>
                            <td className="px-4 py-3">{user.identity}</td>
                            <td className="px-4 py-3">{user.signupPurpose}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserDetailPage;
