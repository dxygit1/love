"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
    slot?: string;
    format?: "auto" | "fluid" | "rectangle";
    className?: string;
}

export function AdUnit({ slot, format = "auto", className = "" }: AdUnitProps) {
    const adRef = useRef<HTMLDivElement>(null);

    // ⚠️ 临时发布商 ID (占位符)，等您提供后我会替换
    // 只有当有真实 ID 时，广告才会尝试加载
    // const PUBLISHER_ID = "ca-pub-XXXXXXXXXXXXXXXX"; 
    const PUBLISHER_ID = ""; // 暂空，确保当前不占用任何高度

    useEffect(() => {
        if (!PUBLISHER_ID || !slot) return;

        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }, [slot, PUBLISHER_ID]);

    if (!PUBLISHER_ID) {
        // 如果没有 ID，直接返回 null，不渲染任何 DOM，保证高度为 0
        return null;
    }

    return (
        <div className={`text-center my-4 overflow-hidden ${className}`}>
            {/* 
            data-ad-slot: 您的广告单元 ID
            data-ad-format: auto 让广告自适应宽度
            data-full-width-responsive: true 让广告在手机上撑满
        */}
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={PUBLISHER_ID}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}
