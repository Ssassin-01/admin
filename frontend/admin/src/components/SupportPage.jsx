import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "./Sidebar";

const SupportPage = () => {
    const [reports, setReports] = useState([]);
    const [sortedReports, setSortedReports] = useState([]);
    const [sortOrder, setSortOrder] = useState('default'); // 기본 정렬 상태
    const [searchTerm, setSearchTerm] = useState(''); // 검색 상태

    useEffect(() => {
        axios.get('/api/reports')
            .then(response => {
                setReports(response.data);
                setSortedReports(response.data); // 기본적으로 전체 데이터로 설정
            })
            .catch(error => console.error('Error fetching reports:', error));
    }, []);

    // 정렬 함수
    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        setSortOrder(selectedSort);

        let sortedData = [...reports];
        if (selectedSort === 'cardNumber') {
            sortedData.sort((a, b) => a.cardNumber - b.cardNumber); // 카드번호 오름차순 정렬
        } else {
            sortedData = [...reports]; // 기본 정렬
        }

        setSortedReports(sortedData);
    };

    // 검색 필터링 함수
    const handleSearchChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const filteredData = reports.filter(report =>
            report.cardNumber.toString().includes(term) ||
            report.reason.toLowerCase().includes(term) ||
            report.details?.toLowerCase().includes(term) ||
            report.reporterEmail.toLowerCase().includes(term)
        );

        setSortedReports(filteredData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <div className="flex-1 p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold">고객센터 - 신고 관리</h1>
                </header>

                <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                        {/* 검색 입력 필드 */}
                        <input
                            type="text"
                            placeholder="검색 (카드번호, 사유, 신고자 이메일 등)"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="p-2 border border-gray-300 rounded-lg w-1/2"
                        />

                        {/* 정렬 옵션 */}
                        <select
                            value={sortOrder}
                            onChange={handleSortChange}
                            className="p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="default">기본</option>
                            <option value="cardNumber">카드번호 순</option>
                        </select>
                    </div>

                    <h2 className="text-xl font-semibold mb-4">신고 목록</h2>
                    <table className="table-auto w-full border border-gray-300 rounded-lg text-center">
                        <thead className="bg-purple-500 text-white">
                        <tr>
                            <th className="px-4 py-2">번호</th>
                            <th className="px-4 py-2">카드 번호</th>
                            <th className="px-4 py-2">신고 사유</th>
                            <th className="px-4 py-2">세부 내용</th>
                            <th className="px-4 py-2">신고자 이메일</th>
                            <th className="px-4 py-2">신고 날짜</th>
                            <th className="px-4 py-2">상세 보기</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {sortedReports.map((report, index) => (
                            <tr key={report.reportId} className="border-t">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{report.cardNumber}</td>
                                <td className="px-4 py-3">{report.reason}</td>
                                <td className="px-4 py-3">{report.details || '없음'}</td>
                                <td className="px-4 py-3">{report.reporterEmail}</td>
                                <td className="px-4 py-3">{new Date(report.reportedAt).toLocaleString()}</td>
                                <td className="px-4 py-3">
                                    <Link
                                        to={`/support/${report.reportId}`}
                                        className="text-blue-500 underline"
                                    >
                                        상세 보기
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default SupportPage;
