import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "测测你到底有多喜欢他？- 深度情感测试",
  description: "通过专业的心理测试题目，帮你分析你对心仪对象的真实情感状态。是狂热挚爱还是一时好感？快来测测看吧！",
  keywords: ["情感测试", "恋爱心理", "喜欢一个人", "暗恋", "爱情测试"],
  openGraph: {
    title: "测测你到底有多喜欢他？",
    description: "通过专业的心理测试题目，帮你分析你对心仪对象的真实情感状态。",
    type: "website",
    locale: "zh_CN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f43f5e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
