import React from "react";

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => (
    <div className="flex justify-center mb-6">
        {tabs.map((tab) => (
            <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 mx-2 font-medium rounded-lg ${
                    activeTab === tab.value
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-700"
                } hover:bg-purple-500 hover:text-white transition`}
            >
                {tab.label}
            </button>
        ))}
    </div>
);

export default TabNavigation;
