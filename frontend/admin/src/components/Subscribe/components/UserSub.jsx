import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/AdminSubScribe.css';

const UserSub = () => {
    const [userSubscription, setUserSubscription] = useState(null);
    const email = localStorage.getItem('userEmail');
    const nickname = localStorage.getItem('userNickname');

    useEffect(() => {
        const fetchSubscription = async () => {
            if (email) {
                try {
                    const response = await axios.get(`/api/userSub/getUserSubscription`, {
                        params: { email },
                        withCredentials: true,
                    });

                    if (response.data && typeof response.data === 'object') {
                        setUserSubscription(response.data);
                    }
                } catch (error) {
                    console.error('Failed to fetch user subscription:', error);
                }
            }
        };
        fetchSubscription();
    }, [email]);

    const handleSubscriptionUpdate = async () => {
        const newPlan = userSubscription.subscriptionPlan === 'Premium' ? 'Basic' : 'Premium';
        try {
            await axios.post(`/api/userSub/updateSubscription`, { email, subscriptionPlan: newPlan });
            alert('구독 정보가 업데이트되었습니다.');
            setUserSubscription((prev) => ({
                ...prev,
                subscriptionPlan: newPlan,
            }));
        } catch (error) {
            console.error('Failed to update subscription:', error);
        }
    };

    return (
        <div className="admin-subscription-container">
            <h2 className="admin-title">{nickname}님의 구독 관리</h2>
            {userSubscription ? (
                <div className="subscription-details">
                    <div className="subscription-info">
                        <div>
                            <p>현재 구독 플랜: {userSubscription.subscriptionPlan}</p>
                            <p>구독 만료일: {userSubscription.expirationDate}</p>
                        </div>
                        <button
                            onClick={handleSubscriptionUpdate}
                            className="update-plan-button"
                        >
                            {userSubscription.subscriptionPlan === 'Premium' ? '기본 플랜으로 변경' : '프리미엄 플랜으로 변경'}
                        </button>
                    </div>
                </div>
            ) : (
                <p>구독 정보가 없습니다.</p>
            )}
        </div>
    );
};

export default UserSub;
