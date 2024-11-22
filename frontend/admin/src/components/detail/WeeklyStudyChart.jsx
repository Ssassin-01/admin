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

const WEEK_DAYS = ["월", "화", "수", "목", "금", "토", "일"];
const mapDataToWeekDays = (data) => {
    console.log("Received dailyStudyData:", data);

    const dayMap = WEEK_DAYS.reduce((acc, day) => {
        acc[day] = 0;
        return acc;
    }, {});

    data.forEach((item) => {
        const weekday = item.date;
        dayMap[weekday] = item.studyTime || 0;
    });

    const chartData = WEEK_DAYS.map((day) => ({
        day,
        studyTime: dayMap[day],
    }));

    console.log("Mapped chart data:", chartData);

    return chartData;
};


const WeeklyStudyChart = ({ month, setMonth, week, setWeek, weekOptions, dailyStudyData }) => {
    // 요일별 데이터로 매핑
    const chartData = mapDataToWeekDays(dailyStudyData);

    return (
        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">일별 학습량 (주차별)</h3>
            <div className="mb-4 flex space-x-4">
                {/* 월 선택 드롭다운 */}
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
                {/* 주차 선택 드롭다운 */}
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
            {/* 차트 */}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="studyTime"
                        stroke="#ff7300"
                        name="학습 시간 (분)"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeeklyStudyChart;
