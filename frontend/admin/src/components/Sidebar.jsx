import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-purple-500 text-white p-6">
            <h2 className="text-2xl font-bold mb-8">회사 로고</h2>
            <nav>
                <ul className="space-y-4">
                    <li><Link to="/" className="hover:underline">메인화면</Link></li>
                    {/*<li><a href="#" className="hover:underline">보고서</a></li>*/}
                    {/*<li><a href="#" className="hover:underline">사용자 관리</a></li>*/}
                    <li><Link to="/support" className="hover:underline">고객센터</Link></li>
                    {/*<li><a href="#" className="hover:underline">설정</a></li>*/}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
