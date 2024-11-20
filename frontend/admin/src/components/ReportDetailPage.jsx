import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "./Sidebar";

const ReportDetailPage = () => {
    const { reportId } = useParams(); // URL에서 reportId 가져오기
    const [reportDetails, setReportDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/reports/${reportId}`)
            .then(response => setReportDetails(response.data))
            .catch(error => console.error('Error fetching report details:', error));
    }, [reportId]);

    if (!reportDetails) {
        return <div>Loading...</div>;
    }

    const {
        cardNumber,
        reason,
        details,
        reporterEmail,
        reportedAt,
        cardTitle,
        cardContent,
        cardAuthor,
        cardVocabularyItems
    } = reportDetails;

    // 검색어에 따라 필터링된 단어 리스트 생성
    const filteredVocabularyItems = cardVocabularyItems.filter(item =>
        item.englishWord.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.koreanWord.includes(searchTerm)
    );

    const handleDeleteWord = (itemId) => {
        axios.delete(`/api/vocabulary-items/${itemId}`)
            .then(() => {
                alert('단어가 삭제되었습니다.');
                setReportDetails({
                    ...reportDetails,
                    cardVocabularyItems: cardVocabularyItems.filter(item => item.itemId !== itemId),
                });
            })
            .catch(error => console.error('Error deleting word:', error));
    };

    const handleDeleteCard = () => {
        axios.delete(`/api/cards/${cardNumber}`)
            .then(() => {
                alert('단어장이 삭제되었습니다.');
                navigate('/support');
            })
            .catch(error => console.error('Error deleting card:', error));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <div className="flex-1 p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold">신고 상세 정보</h1>
                </header>
                <section className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">신고 정보</h2>
                    <p><strong>신고 ID:</strong> {reportId}</p>
                    <p><strong>카드 번호:</strong> {cardNumber}</p>
                    <p><strong>신고 사유:</strong> {reason}</p>
                    <p><strong>신고 세부 내용:</strong> {details || '없음'}</p>
                    <p><strong>신고자 이메일:</strong> {reporterEmail}</p>
                    <p><strong>신고 날짜:</strong> {new Date(reportedAt).toLocaleString()}</p>

                    <h2 className="text-xl font-semibold mt-6 mb-4">관련 단어장 정보</h2>
                    <p><strong>제목:</strong> {cardTitle}</p>
                    <p><strong>내용:</strong> {cardContent}</p>
                    <p><strong>작성자:</strong> {cardAuthor}</p>

                    <h3 className="text-lg font-semibold mt-6 mb-4">단어 리스트</h3>
                    <input
                        type="text"
                        placeholder="단어 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
                    />
                    {filteredVocabularyItems.length > 0 ? (
                        <table className="table-auto w-full border border-gray-300 rounded-lg text-center">
                            <thead className="bg-purple-500 text-white">
                            <tr>
                                <th className="px-4 py-2">번호</th>
                                <th className="px-4 py-2">영어 단어</th>
                                <th className="px-4 py-2">한글 뜻</th>
                                <th className="px-4 py-2">작업</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            {filteredVocabularyItems.map((item, index) => (
                                <tr key={item.itemId} className="border-t">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{item.englishWord}</td>
                                    <td className="px-4 py-3">{item.koreanWord}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleDeleteWord(item.itemId)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>검색 결과가 없습니다.</p>
                    )}

                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={handleDeleteCard}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            단어장 삭제
                        </button>
                        <button
                            onClick={() => navigate('/support')}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                        >
                            뒤로 가기
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ReportDetailPage;
