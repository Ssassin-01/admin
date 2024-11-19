import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import UserSub from "./Subscribe/components/UserSub";

const UserDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {email} = location.state || {};
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("user");

    useEffect(() => {
        if (!email) {
            navigate('/');
            return;
        }

        axios.get(`/api/users/${encodeURIComponent(email)}`)
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching user details!', error));
    }, [email, navigate]);
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userNickname', user.nickname);
    if (!user) {
        return <div>Loading...</div>;
    }

    const studyData = [
        {month: '1월', amount: 30},
        {month: '2월', amount: 45},
        {month: '3월', amount: 50},
        {month: '4월', amount: 70},
        {month: '5월', amount: 90},
        {month: '6월', amount: 120},
    ];

    const translateIdentity = (identity) => {
        switch (identity) {
            case 'elementary':
                return '초등학생';
            case 'middle':
                return '중학생';
            case 'high':
                return '고등학생';
            case 'college':
                return '대학생';
            case 'adult':
                return '어른';
            default:
                return identity;
        }
    };

    const translateSignupPurpose = (purpose) => {
        switch (purpose) {
            case 'elementary_vocabulary':
                return '초등영단어';
            case 'middle_vocabulary':
                return '중등영단어';
            case 'high_vocabulary':
                return '고등영단어';
            case 'csat':
                return '수능';
            case 'toeic':
                return '토익';
            case 'toefl':
                return '토플';
            default:
                return purpose;
        }
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
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="month"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Line type="monotone" dataKey="amount" stroke="#8884d8"/>
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
                                    <th className="px-4 py-2">생년월일</th>
                                    <th className="px-4 py-2">성별</th>
                                    <th className="px-4 py-2">신분</th>
                                    <th className="px-4 py-2">닉네임</th>
                                    <th className="px-4 py-2">가입 목적</th>
                                    <th className="px-4 py-2">연락처</th>
                                    <th className="px-4 py-2">한 줄 다짐</th>
                                    <th className="px-4 py-2">권한</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white">
                                <tr className="border-t">
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.date}</td>
                                    <td className="px-4 py-3">{user.gender === 0 ? '남' : '여'}</td>
                                    <td className="px-4 py-3">{translateIdentity(user.identity)}</td>
                                    <td className="px-4 py-3">{user.nickname}</td>
                                    <td className="px-4 py-3">{translateSignupPurpose(user.signupPurpose)}</td>
                                    <td className="px-4 py-3">{user.telNumber || '없음'}</td>
                                    <td className="px-4 py-3">{user.oneLineResolution || '없음'}</td>
                                    <td className="px-4 py-3">{user.permission}</td>
                                </tr>
                                </tbody>
                            </table>
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
                            <UserSub/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetailPage;
