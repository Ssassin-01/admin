import React from "react";

const UserInfo = ({ user, translateIdentity, translateSignupPurpose }) => (
    <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 rounded-lg text-center mb-6">
            <thead className="bg-purple-500 text-white">
            <tr>
                <th className="px-4 py-2">이메일</th>
                <th className="px-4 py-2">생년월일</th>
                <th className="px-4 py-2">성별</th>
                <th className="px-4 py-2">신분</th>
                <th className="px-4 py-2">닉네임</th>
                <th className="px-4 py-2">가입 목적</th>
                <th className="px-4 py-2">연락처</th>
                <th className="px-4 py-2">한 줄 다짐</th>
                <th className="px-4 py-2">권한</th>
            </tr>
            </thead>
            <tbody className="bg-white">
            <tr className="border-t">
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.date}</td>
                <td className="px-4 py-3">{user.gender === 0 ? "남" : "여"}</td>
                <td className="px-4 py-3">{translateIdentity(user.identity)}</td>
                <td className="px-4 py-3">{user.nickname}</td>
                <td className="px-4 py-3">{translateSignupPurpose(user.signupPurpose)}</td>
                <td className="px-4 py-3">{user.telNumber || "없음"}</td>
                <td className="px-4 py-3">{user.oneLineResolution || "없음"}</td>
                <td className="px-4 py-3">{user.permission}</td>
            </tr>
            </tbody>
        </table>
    </div>
);

export default UserInfo;
