import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "性取向测试 - 探索你的真实取向 | Love Quiz",
    description: "想知道你自己目前究竟更偏向异性恋、同性恋还是双性恋吗？通过10道精心设计的问题，发现你最本质的性取向！结果以饼图形式呈现。",
    keywords: "性取向测试, 同性恋测试, 双性恋测试, 异性恋测试, LGBTQ, 心理测试",
    openGraph: {
        title: "性取向测试 - 探索你的真实取向",
        description: "想知道你自己目前究竟更偏向异性恋、同性恋还是双性恋吗？通过10道问题发现你最本质的性取向！",
        type: "website",
    },
};

export default function GayTestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
