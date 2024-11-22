import React from "react";

const CardList = ({ cards, onCardClick }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">유저 카드 목록</h3>
        {cards.length > 0 ? (
            <table className="table-auto w-full border border-gray-300 rounded-lg text-center">
                <thead className="bg-purple-500 text-white">
                <tr>
                    <th className="px-4 py-2">카드 번호</th>
                    <th className="px-4 py-2">제목</th>
                    <th className="px-4 py-2">작성 날짜</th>
                    <th className="px-4 py-2">조회수</th>
                    <th className="px-4 py-2">작업</th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {cards.map((card) => (
                    <tr key={card.cardNumber} className="border-t">
                        <td className="px-4 py-3">{card.cardNumber}</td>
                        <td className="px-4 py-3">{card.title}</td>
                        <td className="px-4 py-3">
                            {new Date(card.writeDateTime).toLocaleDateString("ko-KR")}
                        </td>
                        <td className="px-4 py-3">{card.countView}</td>
                        <td className="px-4 py-3">
                            <button
                                onClick={() => {
                                    console.log("Selected Card:", card);
                                    console.log("Vocabulary Items:", card.vocabularyItems);
                                    onCardClick(card); // 전체 카드 데이터 전달
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                보기
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        ) : (
            <p className="text-gray-600">생성된 카드가 없습니다.</p>
        )}
    </div>
);


export default CardList;