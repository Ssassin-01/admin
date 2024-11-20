import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UserSub from "./Subscribe/components/UserSub";

const UserDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("user");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editUserData, setEditUserData] = useState(null);

    useEffect(() => {
        if (!email) {
            navigate('/');
            return;
        }

        axios.get(`/api/users/${encodeURIComponent(email)}`)
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching user details!', error));
    }, [email, navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userNickname', user.nickname);

    const studyData = [
        { month: '1월', amount: 30 },
        { month: '2월', amount: 45 },
        { month: '3월', amount: 50 },
        { month: '4월', amount: 70 },
        { month: '5월', amount: 90 },
        { month: '6월', amount: 120 },
    ];

    const translateIdentity = (identity) => {
        switch (identity) {
            case 'elementary': return '초등학생';
            case 'middle': return '중학생';
            case 'high': return '고등학생';
            case 'college': return '대학생';
            case 'adult': return '어른';
            default: return identity;
        }
    };

    const translateSignupPurpose = (purpose) => {
        switch (purpose) {
            case 'elementary_vocabulary': return '초등영단어';
            case 'middle_vocabulary': return '중등영단어';
            case 'high_vocabulary': return '고등영단어';
            case 'csat': return '수능';
            case 'toeic': return '토익';
            case 'toefl': return '토플';
            default: return purpose;
        }
    };

    // 유저 삭제
    const handleDeleteUser = () => {
        if (window.confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
            axios.delete(`/api/users/${encodeURIComponent(user.email)}`)
                .then(() => {
                    alert("사용자가 삭제되었습니다.");
                    navigate("/"); // 삭제 후 메인 페이지로 이동
                })
                .catch(error => {
                    console.error("Error deleting user:", error);
                    alert("사용자 삭제에 실패했습니다.");
                });
        }
    };

    // 수정 모달 열기
    const handleEditUser = () => {
        setEditUserData(user);
        setIsEditModalOpen(true);
    };

    // 수정 데이터 변경 핸들러
    const handleEditChange = (e) => {
        setEditUserData({
            ...editUserData,
            [e.target.name]: e.target.value,
        });
    };

    // 수정 제출 핸들러
    const handleEditSubmit = () => {
        axios.put(`/api/users/${encodeURIComponent(editUserData.email)}`, editUserData)
            .then(() => {
                alert("사용자 정보가 수정되었습니다.");
                setUser(editUserData);
                setIsEditModalOpen(false);
            })
            .catch(error => {
                console.error("Error editing user:", error);
                alert("사용자 수정에 실패했습니다.");
            });
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-purple-500 text-white p-6">
                <h2 className="text-2xl font-bold mb-8">회사 로고</h2>
                <nav>
                    <ul className="space-y-4">
                        <li><a href="#" className="hover:underline">대시보드</a></li>
                        <li><a href="#" className="hover:underline">보고서</a></li>
                        <li><a href="#" className="hover:underline">사용자 관리</a></li>
                        <li><a href="#" className="hover:underline">설정</a></li>
                    </ul>
                </nav>
            </aside>

            <div className="flex-1 p-10">
                <div className="w-full md:w-3/4 mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">{user.nickname}님의 상세 정보</h2>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">월별 학습량</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={studyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-center mb-6">
                        {['user', 'cards', 'subscriptions'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 mx-2 font-medium rounded-lg ${activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-purple-500 hover:text-white transition`}
                            >
                                {tab === 'user' ? '유저 정보' : tab === 'cards' ? '카드' : '구독'}
                            </button>
                        ))}
                    </div>

                    {activeTab === "user" && (
                        <div className="overflow-x-auto">
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
                                    <td className="px-4 py-3">{user.telNumber || '없음'}</td>
                                    <td className="px-4 py-3">{user.gender === 0 ? '남' : '여'}</td>
                                    <td className="px-4 py-3">{translateIdentity(user.identity)}</td>
                                    <td className="px-4 py-3">{translateSignupPurpose(user.signupPurpose)}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={handleEditUser}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                                >
                                    수정
                                </button>
                                <button
                                    onClick={handleDeleteUser}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "cards" && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold">카드 정보</h3>
                            <p className="text-gray-600">여기에 카드 정보가 표시됩니다.</p>
                        </div>
                    )}
                    {activeTab === "subscriptions" && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <UserSub />
                        </div>
                    )}
                </div>
            </div>

            {/* 수정 모달 */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">회원 수정</h2>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">닉네임</label>
                            <input
                                type="text"
                                name="nickname"
                                value={editUserData.nickname}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">비밀번호</label>
                            <input
                                type="password"
                                name="password"
                                value={editUserData.password}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">생년월일</label>
                            <input
                                type="date"
                                name="date"
                                value={editUserData.date}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">성별</label>
                            <select
                                name="gender"
                                value={editUserData.gender}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                                <option value={0}>남</option>
                                <option value={1}>여</option>
                            </select>
                        </div>
                        <button
                            onClick={handleEditSubmit}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                        >
                            저장
                        </button>
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                        >
                            취소
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetailPage;
