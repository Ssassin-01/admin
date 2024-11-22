import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Line,
    ComposedChart
} from "recharts";

const RevenueChart = ({ monthlyData, year, subscriptionRate, onRateChange, onYearChange }) => (
    <section className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">월별 수익률</h2>

        {/* 연도 및 구독 요금 설정 */}
        <div className="flex items-center justify-between mb-4">
            <div>
                <label className="mr-2 font-medium">연도:</label>
                <select
                    value={year}
                    onChange={(e) => onYearChange(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg"
                >
                    {[2022, 2023, 2024, 2025].map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="mr-2 font-medium">구독 요금:</label>
                <input
                    type="number"
                    value={subscriptionRate}
                    onChange={(e) => onRateChange(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg w-24"
                />
                <span className="ml-2">원</span>
            </div>
        </div>

        {/* 수익률 그래프 */}
        <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                    yAxisId="left"
                    orientation="left"
                    label={{ value: "수익(원)", angle: -90, position: "insideLeft" }}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{ value: "구독자 수(명)", angle: -90, position: "insideRight" }}
                />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" name="수익(원)" fill="#8884d8" />
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="subscribers"
                    name="구독자 수(명)"
                    stroke="#82ca9d"
                    strokeWidth={3}
                />
            </ComposedChart>
        </ResponsiveContainer>
    </section>
);

export default RevenueChart;
