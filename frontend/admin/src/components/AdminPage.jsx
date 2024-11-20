import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminPage = () => {
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);

    const data = [
        { name: '1월', uv: 4000, pv: 2400 },
        { name: '2월', uv: 3000, pv: 1398 },
        { name: '3월', uv: 2000, pv: 9800 },
        { name: '4월', uv: 2780, pv: 3908 },
        { name: '5월', uv: 1890, pv: 4800 },
        { name: '6월', uv: 2390, pv: 3800 },
        { name: '7월', uv: 3490, pv: 4300 },
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

    useEffect(() => {
        axios.get('/api/admin')
            .then(response => setMessage(response.data))
            .catch(error => console.error('There was an error fetching the message!', error));

        axios.get('/api/users')
            .then(response => {
                console.log('Users API response:', response.data);
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching users!', error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex">
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

            <main className="flex-1 p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold">관리자 페이지</h1>
                    <span className="text-gray-500">환영합니다!</span>
                </header>

                <section className="bg-white p-6 rounded-lg shadow-md mb-10">
                    <h2 className="text-xl font-semibold mb-4">서버 메시지</h2>
                    <p className="text-lg">{message || 'admin 잘되네!'}</p>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-md mb-10">
                    <h2 className="text-xl font-semibold mb-4">월별 활동 그래프</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="uv" fill="#8884d8" />
                            <Bar dataKey="pv" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">유저 목록</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-purple-200 text-purple-700">
                            <th className="border p-4 text-center font-medium">번호</th>
                            <th className="border p-4 text-center font-medium">이메일</th>
                            <th className="border p-4 text-center font-medium">생년월일</th>
                            <th className="border p-4 text-center font-medium">성별</th>
                            <th className="border p-4 text-center font-medium">신분</th>
                            <th className="border p-4 text-center font-medium">닉네임</th>
                            <th className="border p-4 text-center font-medium">가입 목적</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={user.email} className="even:bg-purple-50">
                                <td className="border p-4 text-center">{index + 1}</td>
                                <td className="border p-4 text-center">
                                    <Link
                                        to="/user-detail"
                                        state={{ email: user.email }}
                                        className="text-blue-600 underline"
                                    >
                                        {user.email}
                                    </Link>
                                </td>
                                <td className="border p-4 text-center">{user.date}</td>
                                <td className="border p-4 text-center">{user.gender === 0 ? "남" : "여"}</td>
                                <td className="border p-4 text-center">{translateIdentity(user.identity)}</td>
                                <td className="border p-4 text-center">{user.nickname}</td>
                                <td className="border p-4 text-center">{translateSignupPurpose(user.signupPurpose)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default AdminPage;
