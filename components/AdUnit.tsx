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
        if (!PUBLISHER_ID || !slot || !adRef.current) return;

        const el = adRef.current;
        let pushed = false;

        const pushAd = () => {
            if (pushed) return;
            pushed = true;
            try {
                // @ts-ignore
                const adsbygoogle = (window.adsbygoogle = window.adsbygoogle || []);
                adsbygoogle.push({});
            } catch (err: any) {
                if (err?.message?.includes('already have ads')) {
                    // Ignore in React Strict Mode
                } else {
                    console.error("AdSense error:", err);
                }
            }
        };

        // Wait until the container has a meaningful width (>50px) before pushing the ad
        const tryPush = () => {
            if (el.offsetWidth > 50) {
                pushAd();
                return true;
            }
            return false;
        };

        if (tryPush()) return;

        // Use ResizeObserver to detect when the container gets real dimensions
        const resizeObserver = new ResizeObserver(() => {
            tryPush() && resizeObserver.disconnect();
        });
        resizeObserver.observe(el);

        // Also observe intersection in case the element is off-screen
        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    tryPush() && resizeObserver.disconnect();
                }
            },
            { threshold: 0 }
        );
        intersectionObserver.observe(el);

        return () => {
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
        };
    }, [slot, PUBLISHER_ID]);

    if (!PUBLISHER_ID) {
        // 如果没有 ID，直接返回 null，不渲染任何 DOM，保证高度为 0
        return null;
    }

    return (
        <div ref={adRef} className={`text-center my-4 overflow-hidden ${className}`}>
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
