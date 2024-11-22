import React from "react";
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

const WeeklyStudyChart = ({ month, setMonth, week, setWeek, weekOptions, dailyStudyData }) => (
    <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">일별 학습량 (주차별)</h3>
        <div className="mb-4 flex space-x-4">
            <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-lg"
            >
                {Array.from({ length: 12 }, (_, idx) => idx + 1).map((m) => (
                    <option key={m} value={m}>
                        {m}월
                    </option>
                ))}
            </select>
            <select
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-lg"
            >
                {weekOptions.map((w) => (
                    <option key={w.week} value={w.week}>
                        {w.label}
                    </option>
                ))}
            </select>
        </div>
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
);

export default WeeklyStudyChart;
