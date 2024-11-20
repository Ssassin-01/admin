import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from "./Sidebar";
import UserTable from './UserTable';

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
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users!', error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <main className="flex-1 p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold">관리자 페이지</h1>
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
