"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
    slot?: string;
    format?: "auto" | "fluid" | "rectangle";
    className?: string;
}

export function AdUnit({ slot, format = "auto", className = "" }: AdUnitProps) {
    const adRef = useRef<HTMLDivElement>(null);

    // 只有当有真实 ID 时，广告才会尝试加载
    const PUBLISHER_ID = "ca-pub-2863794754217950";

    useEffect(() => {
        if (!PUBLISHER_ID || !slot) return;

        // Prevent double push in strict mode by checking if we already have ads in this slot?
        // AdSense is tricky with this. We just try/catch.

        try {
            if (typeof window !== 'undefined') {
                // @ts-ignore
                const adsbygoogle = (window.adsbygoogle = window.adsbygoogle || []);
                // Simple safeguard: don't push if the element looks filled? 
                // Hard to check on the 'ins' element ref from here easily without potentially breaking it.
                // We rely on catch.
                adsbygoogle.push({});
            }
        } catch (err: any) {
            // Suppress the specific "availableWidth=0" error to avoid log spam, 
            // but still useful to know during dev.
            if (err?.message?.includes('availableWidth=0')) {
                console.warn(`AdSense Warning (Slot ${slot}): Container has 0 width. Ensure parent has explicit width.`);
            } else if (err?.message?.includes('already have ads')) {
                // Ignore "already have ads" error which happens in React Strict Mode
            } else {
                console.error("AdSense error:", err);
            }
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
