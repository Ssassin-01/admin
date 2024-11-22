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

const MonthlyStudyChart = ({ year, setYear, monthlyStudyData }) => (
    <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">월별 학습량 (연도별)</h3>
        <div className="mb-4">
            <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-lg"
            >
                {[...Array(5)].map((_, idx) => (
                    <option key={idx} value={new Date().getFullYear() - idx}>
                        {new Date().getFullYear() - idx}년
                    </option>
                ))}
            </select>
        </div>
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
);

export default MonthlyStudyChart;
