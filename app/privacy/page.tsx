import { Shield } from "lucide-react";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-white to-indigo-50">
            <div className="flex-grow container mx-auto px-4 pt-24 pb-12 max-w-3xl">
                <div className="text-center mb-12">
                    <div className="inline-block p-3 rounded-2xl bg-indigo-100 text-indigo-500 mb-4">
                        <Shield className="w-8 h-8 fill-current" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">隐私政策</h1>
                    <p className="text-gray-600">最后更新日期：{new Date().toISOString().split('T')[0]}</p>
                </div>

                <div className="space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-white/50 text-gray-600 leading-relaxed text-sm md:text-base">
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-3">1. 信息收集</h2>
                        <p>
                            我们非常重视您的隐私。在使用"测测你到底有多喜欢他"（以下简称"本服务"）时，我们通常不会要求您注册账户或提供个人身份信息（如姓名、地址等）。
                            <br />
                            我们可能会自动收集某些非个人信息，例如您的设备类型、浏览器版本、访问时间和大概位置（IP地址），这些主要用于分析网站流量和优化用户体验。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-3">2. Cookies 和广告</h2>
                        <p>
                            本网站可能使用 Cookies 或类似技术来增强用户体验。
                            <br />
                            <strong>Google AdSense：</strong> 我们使用 Google AdSense 展示广告。Google 作为第三方供应商，使用 Cookies（包括 DoubleClick Cookie）根据用户之前的访问记录来展示与其兴趣相关的广告。您可以访问 Google 广告设置页面来管理您的广告偏好。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-3">3. 数据使用</h2>
                        <p>
                            您在测试过程中的选择和结果主要用于在本地生成分析报告。除非法律要求，我们不会将您的测试数据主动分享给第三方。
                        </p>
                    </section>
                </div>
            </div>

        </main>
    );
}
