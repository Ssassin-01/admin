import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserTable = ({ users, setUsers, translateIdentity, translateSignupPurpose }) => {
    const [searchTerm, setSearchTerm] = useState(''); // 검색 상태
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정 모달 상태
    const [editUserData, setEditUserData] = useState(null); // 수정 중인 유저 데이터

    // 페이징 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [pageSize, setPageSize] = useState(20); // 페이지당 아이템 수

    // 검색된 유저 목록 필터링
    const filteredUsers = users.filter(user =>
        user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.identity && translateIdentity(user.identity).includes(searchTerm)) ||
        (user.signupPurpose && translateSignupPurpose(user.signupPurpose).includes(searchTerm))
    );

    // 현재 페이지에 표시될 유저 데이터
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

    const totalPages = Math.ceil(filteredUsers.length / pageSize); // 총 페이지 수

    // 삭제 핸들러
    const handleDeleteUser = (email) => {
        if (window.confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
            axios
                .delete(`/api/users/${email}`)
                .then(() => {
                    alert("사용자가 삭제되었습니다.");
                    setUsers(users.filter(user => user.email !== email));
                })
                .catch(error => {
                    console.error("Error deleting user:", error);
                    alert("사용자 삭제에 실패했습니다.");
                });
        }
    };

    // 수정 핸들러
    const handleEditUser = (user) => {
        setEditUserData(user);
        setIsEditModalOpen(true);
    };

    // 수정 모달 데이터 변경 핸들러
    const handleEditChange = (e) => {
        setEditUserData({
            ...editUserData,
            [e.target.name]: e.target.value,
        });
    };

    // 수정 제출 핸들러
    const handleEditSubmit = () => {
        axios
            .put(`/api/users/${editUserData.email}`, editUserData)
            .then(() => {
                alert("사용자 정보가 수정되었습니다.");
                setUsers(users.map(user =>
                    user.email === editUserData.email ? editUserData : user
                ));
                setIsEditModalOpen(false);
            })
            .catch(error => {
                console.error("Error editing user:", error);
                alert("사용자 수정에 실패했습니다.");
            });
    };

    return (
        <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">유저 목록</h2>

            {/* 검색 입력 필드 */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="유저 검색 (닉네임, 이메일, 신분, 가입 목적)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* 페이지 크기 선택 */}
            <div className="mb-4">
                <label className="mr-2">페이지 크기:</label>
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="p-2 border border-gray-300 rounded-lg"
                >
                    <option value={10}>10개씩</option>
                    <option value={20}>20개씩</option>
                    <option value={30}>30개씩</option>
                </select>
            </div>

            {/* 유저 테이블 */}
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-purple-200 text-purple-700">
                    <th className="border p-4 text-center font-medium">번호</th>
                    <th className="border p-4 text-center font-medium">닉네임</th>
                    <th className="border p-4 text-center font-medium">이메일</th>
                    <th className="border p-4 text-center font-medium">생년월일</th>
                    <th className="border p-4 text-center font-medium">성별</th>
                    <th className="border p-4 text-center font-medium">신분</th>
                    <th className="border p-4 text-center font-medium">가입 목적</th>
                    <th className="border p-4 text-center font-medium">작업</th>
                </tr>
                </thead>
                <tbody>
                {paginatedUsers.map((user, index) => (
                    <tr key={user.email} className="even:bg-purple-50">
                        <td className="border p-4 text-center">{startIndex + index + 1}</td>
                        <td className="border p-4 text-center">{user.nickname}</td>
                        <td className="border p-4 text-center">
                            <Link
                                to="/user-detail"
                                state={{ email: user.email }}
                                className="text-blue-600 underline"
                            >
                                {user.email}
                            </Link>
                        </td>
                        <td className="border p-4 text-center">{user.date}</td>
                        <td className="border p-4 text-center">{user.gender === 0 ? "남" : "여"}</td>
                        <td className="border p-4 text-center">{translateIdentity(user.identity)}</td>
                        <td className="border p-4 text-center">{translateSignupPurpose(user.signupPurpose)}</td>
                        <td className="border p-4 text-center">
                            <button
                                onClick={() => handleEditUser(user)}
                                className="text-blue-600 underline"
                            >
                                수정
                            </button>
                            {" | "}
                            <button
                                onClick={() => handleDeleteUser(user.email)}
                                className="text-red-600 underline"
                            >
                                삭제
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className="flex justify-center items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 bg-gray-300 rounded-lg mr-2 disabled:opacity-50"
                >
                    이전
                </button>
                <span>
                    페이지 {currentPage} / {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 bg-gray-300 rounded-lg ml-2 disabled:opacity-50"
                >
                    다음
                </button>
            </div>

            {/* 수정 모달 */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">회원 수정</h2>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">닉네임</label>
                            <input
                                type="text"
                                name="nickname"
                                value={editUserData.nickname}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">비밀번호</label>
                            <input
                                type="password"
                                name="password"
                                value={editUserData.password}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">생년월일</label>
                            <input
                                type="date"
                                name="date"
                                value={editUserData.date}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">성별</label>
                            <select
                                name="gender"
                                value={editUserData.gender}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                                <option value={0}>남</option>
                                <option value={1}>여</option>
                            </select>
                        </div>
                        <button
                            onClick={handleEditSubmit}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                        >
                            저장
                        </button>
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                        >
                            취소
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default UserTable;
