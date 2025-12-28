import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://love.teasytools.com"),
  title: "测测你到底有多喜欢他？- 深度情感测试 | 探索内心真实声音",
  description: "通过专业的心理学问卷测试，深度分析你对心仪对象、伴侣或暗恋对象的真实情感状态。基于斯腾伯格爱情三角理论，帮你理清是狂热挚爱、依赖还是一时好感。完全免费，无需下载，保护隐私。",
  keywords: ["情感测试", "恋爱心理", "喜欢一个人", "暗恋", "爱情测试", "Love Quiz", "心理年龄", "情感分析"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "测测你到底有多喜欢他？- 深度情感测试",
    description: "通过专业的心理测试题目，帮你分析你对心仪对象的真实情感状态。立即开始免费测试！",
    url: "https://love.teasytools.com",
    siteName: "Love Quiz",
    images: [
      {
        url: "/og-image.png", // We will need to ensure this image exists or use a default
        width: 1200,
        height: 630,
        alt: "Love Quiz Preview",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "测测你到底有多喜欢他？- 深度情感测试",
    description: "通过专业的心理测试题目，帮你分析你对心仪对象的真实情感状态。",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f43f5e",
};

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen flex flex-col">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2863794754217950"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uqx8xto7d1");
          `}
        </Script>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
