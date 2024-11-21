import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const StudyTimeChart = ({ email }) => {
    const [studyData, setStudyData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    useEffect(() => {
        axios
            .get(`/api/study-time/monthly`, { params: { email, year, month } })
            .then((response) => {
                const logs = response.data.map((log) => ({
                    date: new Date(log.studyDate).getDate(),
                    time: Math.floor(log.studyTime / 60) // 초 단위 -> 분 단위 변환
                }));
                setStudyData(logs);
            })
            .catch((error) => console.error("Error fetching study time logs:", error));
    }, [email, year, month]);

    return (
        <div>
            <div className="flex justify-center space-x-4 mb-4">
                <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="p-2 border rounded">
                    {[2023, 2024].map((y) => (
                        <option key={y} value={y}>
                            {y}년
                        </option>
                    ))}
                </select>
                <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="p-2 border rounded">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>
                            {m}월
                        </option>
                    ))}
                </select>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={studyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="time" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StudyTimeChart;
