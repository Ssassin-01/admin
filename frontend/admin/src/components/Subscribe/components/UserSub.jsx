import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/AdminSubScribe.css';

const UserSub = () => {
    const [userSubscription, setUserSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const email = localStorage.getItem('userEmail');
    const nickname = localStorage.getItem('userNickname');

    useEffect(() => {
        const fetchSubscription = async () => {
            if (!email) {
                setError('로그인이 필요합니다.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`/api/userSub/getUserSubscription`, {
                    params: { email },
                    withCredentials: true,
                });

                if (response.data && typeof response.data === 'object') {
                    setUserSubscription(response.data);
                } else {
                    setError('구독 정보를 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('Failed to fetch user subscription:', error);
                setError('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
            } finally {
                setLoading(false);
            }
        };

        fetchSubscription();
    }, [email]);

    const handleSubscriptionUpdate = async () => {
        if (!userSubscription) return;

        const newPlan = userSubscription.subscriptionPlan === '유료' ? '무료' : '유료';

        try {
            await axios.post(`/api/userSub/updateSubscription`, { email, subscriptionPlan: newPlan });
            alert('구독 정보가 업데이트되었습니다.');
            setUserSubscription((prev) => ({
                ...prev,
                subscriptionPlan: newPlan,
            }));
        } catch (error) {
            console.error('Failed to update subscription:', error);
            alert('구독 정보 업데이트에 실패했습니다. 다시 시도해주세요.');
        }
    };

    if (loading) {
        return <div className="admin-subscription-container">로딩 중...</div>;
    }

    if (error) {
        return <div className="admin-subscription-container error-message">{error}</div>;
    }

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
                            {userSubscription.subscriptionPlan === '유료' ? '무료 플랜으로 변경' : '유료 플랜으로 변경'}
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
