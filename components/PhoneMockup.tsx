"use client";

import { ReactNode } from "react";

interface PhoneMockupProps {
    children: ReactNode;
}

export function PhoneMockup({ children }: PhoneMockupProps) {
    return (
        <div className="relative mx-auto border-gray-900 border-[12px] rounded-[3rem] h-[800px] w-[390px] shadow-2xl bg-white overflow-hidden ring-1 ring-gray-900/5">
            {/* Camera / Notch Area */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[30px] w-[120px] bg-gray-900 rounded-b-2xl z-20 flex justify-center items-center">
                <div className="w-16 h-4 bg-gray-800 rounded-full opacity-50"></div>
            </div>

            {/* Side Buttons */}
            <div className="absolute top-[100px] -left-[16px] h-[35px] w-[4px] bg-gray-600 rounded-l-lg"></div>
            <div className="absolute top-[150px] -left-[16px] h-[60px] w-[4px] bg-gray-600 rounded-l-lg"></div>
            <div className="absolute top-[100px] -right-[16px] h-[80px] w-[4px] bg-gray-600 rounded-r-lg"></div>

            {/* Screen Content */}
            <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-white scrollbar-hide">
                {children}
            </div>
        </div>
    );
}
