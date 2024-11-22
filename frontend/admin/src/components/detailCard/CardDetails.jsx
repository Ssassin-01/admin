import React from "react";
import axios from "axios";

const CardDetails = ({ card, onClose, onDeleteCard, updateCard }) => {
    const handleDeleteCard = () => {
        if (window.confirm("이 카드를 삭제하시겠습니까?")) {
            axios
                .delete(`/api/cards/${card.cardNumber}`)
                .then(() => {
                    alert("카드가 삭제되었습니다.");
                    onDeleteCard(card.cardNumber);
                })
                .catch((error) => {
                    console.error("Error deleting card:", error);
                    alert("카드를 삭제하는 중 오류가 발생했습니다.");
                });
        }
    };

    const handleDeleteWord = (itemId) => {
        if (window.confirm("이 단어를 삭제하시겠습니까?")) {
            axios
                .delete(`/api/vocabulary-items/${itemId}`)
                .then(() => {
                    alert("단어가 삭제되었습니다.");
                    // 단어 삭제 후 상태 업데이트
                    const updatedItems = card.vocabularyItems.filter((item) => item.itemId !== itemId);
                    updateCard({ ...card, vocabularyItems: updatedItems });
                })
                .catch((error) => {
                    console.error("Error deleting word:", error);
                    alert("단어를 삭제하는 중 오류가 발생했습니다.");
                });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <div>
                    <button onClick={onClose} className="text-blue-500 underline mr-4">
                        닫기
                    </button>
                    <button onClick={handleDeleteCard} className="text-red-500 underline">
                        카드 삭제
                    </button>
                </div>
            </div>
            <p className="mb-4">
                <strong>작성자:</strong> {card.authorNickname}
            </p>
            <p className="mb-4">
                <strong>작성 날짜:</strong>{" "}
                {card.writeDateTime
                    ? new Date(card.writeDateTime).toLocaleDateString("ko-KR")
                    : "날짜 정보 없음"}
            </p>
            <p className="mb-4">
                <strong>내용:</strong> {card.content || "내용 없음"}
            </p>

            <h4 className="text-lg font-semibold mb-4">단어 목록</h4>
            {card.vocabularyItems && card.vocabularyItems.length > 0 ? (
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
                    {card.vocabularyItems.map((word, index) => (
                        <tr key={word.itemId} className="border-t">
                            <td className="px-4 py-3">{index + 1}</td>
                            <td className="px-4 py-3">{word.englishWord}</td>
                            <td className="px-4 py-3">{word.koreanWord}</td>
                            <td className="px-4 py-3">
                                <button
                                    onClick={() => handleDeleteWord(word.itemId)}
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
                <p>등록된 단어가 없습니다.</p>
            )}
        </div>
    );
};

export default CardDetails;
