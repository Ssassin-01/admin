import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminPage = () => {
    const [message, setMessage] = useState('');

    // 더미 데이터 (그래프용)
    const data = [
        { name: '1월', uv: 4000, pv: 2400 },
        { name: '2월', uv: 3000, pv: 1398 },
        { name: '3월', uv: 2000, pv: 9800 },
        { name: '4월', uv: 2780, pv: 3908 },
        { name: '5월', uv: 1890, pv: 4800 },
        { name: '6월', uv: 2390, pv: 3800 },
        { name: '7월', uv: 3490, pv: 4300 },
    ];

    useEffect(() => {
        axios.get('/api/admin')
            .then(response => setMessage(response.data))
            .catch(error => console.error('There was an error fetching the message!', error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* 사이드바 */}
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

            {/* 메인 콘텐츠 */}
            <main className="flex-1 p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold">관리자 페이지</h1>
                    <span className="text-gray-500">환영합니다!</span>
                </header>

                {/* 서버 메시지 */}
                <section className="bg-white p-6 rounded-lg shadow-md mb-10">
                    <h2 className="text-xl font-semibold mb-4">서버 메시지</h2>
                    <p className="text-lg">{message || 'admin 잘되네!'}</p>
                </section>

                {/* 그래프 */}
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

                {/* 통계 카드 */}
                <section className="grid grid-cols-4 gap-4">
                    <div className="bg-yellow-100 p-6 rounded-lg text-center shadow-md">
                        <h3 className="text-lg font-semibold">오늘 방문자</h3>
                        <p className="text-2xl mt-2">221명</p>
                    </div>
                    <div className="bg-red-100 p-6 rounded-lg text-center shadow-md">
                        <h3 className="text-lg font-semibold">신규 가입</h3>
                        <p className="text-2xl mt-2">30명</p>
                    </div>
                    <div className="bg-green-100 p-6 rounded-lg text-center shadow-md">
                        <h3 className="text-lg font-semibold">프로젝트 수</h3>
                        <p className="text-2xl mt-2">40개</p>
                    </div>
                    <div className="bg-blue-100 p-6 rounded-lg text-center shadow-md">
                        <h3 className="text-lg font-semibold">완료된 작업</h3>
                        <p className="text-2xl mt-2">17개</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminPage;
