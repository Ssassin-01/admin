import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AdminSubScribe.css";

const UserSub = ({ email, nickname }) => {
    const [userSubscription, setUserSubscription] = useState(null); // 구독 정보 상태

    // 구독 상태 확인
    useEffect(() => {
        const fetchSubscription = async () => {
            if (email) {
                try {
                    const response = await axios.get(`/api/userSub/getUserSubscription`, {
                        params: { email },
                        withCredentials: true,
                    });

                    // 구독 정보가 있다면 상태에 저장
                    if (response.data && typeof response.data === "object") {
                        setUserSubscription(response.data);
                    } else {
                        setUserSubscription(null); // 구독 정보가 없으면 null
                    }
                } catch (error) {
                    console.error("Failed to fetch user subscription:", error);
                }
            }
        };
        fetchSubscription();
    }, [email]);

    // 프리미엄 구독 추가
    const handleSubscribe = async () => {
        try {
            const currentDate = new Date();
            const expirationDate = new Date();
            expirationDate.setMonth(currentDate.getMonth() + 1); // 1개월 구독

            const subscriptionDTO = {
                email,
                subscriptionPlan: "Premium",
                purchaseDate: currentDate.toISOString().split("T")[0],
                expirationDate: expirationDate.toISOString().split("T")[0],
            };

            await axios.post(`/api/userSub/updateSubscription`, subscriptionDTO, {
                withCredentials: true,
            });

            alert("프리미엄 플랜으로 변경되었습니다!");
            setUserSubscription(subscriptionDTO); // 상태 업데이트
        } catch (error) {
            console.error("Failed to subscribe:", error);
            alert("구독 추가에 실패했습니다.");
        }
    };

    // 구독 취소
    const handleUnsubscribe = async () => {
        try {
            await axios.delete(`/api/userSub/deleteSubscription`, {
                params: { email },
                withCredentials: true,
            });

            alert("구독이 취소되었습니다.");
            setUserSubscription(null); // 구독 정보 초기화
        } catch (error) {
            console.error("Failed to unsubscribe:", error);
            alert("구독 취소에 실패했습니다.");
        }
    };

    return (
        <div className="admin-subscription-container">
            <h2 className="admin-title">{nickname}님의 구독 관리</h2>
            {userSubscription ? (
                <div className="subscription-details">
                    <div className="subscription-info">
                        <p>현재 구독 플랜: {userSubscription.subscriptionPlan}</p>
                    </div>
                    <button
                        onClick={handleUnsubscribe}
                        className="update-plan-button bg-red-500 text-white"
                    >
                        구독 끊기
                    </button>
                </div>
            ) : (
                <div className="subscription-details">
                    <p>현재 구독 상태가 아닙니다.</p>
                    <button
                        onClick={handleSubscribe}
                        className="update-plan-button bg-green-500 text-white"
                    >
                        프리미엄 플랜으로 변경
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserSub;
