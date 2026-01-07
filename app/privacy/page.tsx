import { Shield, Eye, Cookie, Database, Lock, Globe, Mail } from "lucide-react";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-white to-indigo-50">
            <div className="flex-grow container mx-auto px-4 md:px-8 pt-24 pb-12 max-w-5xl">
                <div className="text-center mb-12">
                    <div className="inline-block p-3 rounded-2xl bg-indigo-100 text-indigo-500 mb-4">
                        <Shield className="w-8 h-8 fill-current" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">隐私政策</h1>
                    <p className="text-gray-600">最后更新日期：2025年1月1日</p>
                </div>

                <div className="space-y-8 bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-sm border border-white/50 text-gray-600 leading-relaxed text-base md:text-lg">

                    {/* 概述 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-6 h-6 text-indigo-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">隐私政策概述</h2>
                        </div>
                        <div className="space-y-4">
                            <p>
                                我们非常重视您的隐私。本隐私政策详细说明了"测测你到底有多喜欢他"网站（以下简称"本服务"或"本网站"）如何收集、使用、保护和处理您的信息。
                            </p>
                            <p>
                                <strong>核心承诺：</strong>我们的测试完全在您的设备本地运行，您的测试答案和结果不会被上传至任何服务器。我们不会存储您的个人身份信息，如姓名、邮箱、电话号码等。
                            </p>
                        </div>
                    </section>

                    {/* 信息收集 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">1. 信息收集</h2>
                        </div>
                        <div className="space-y-4">
                            <p>
                                在使用本服务时，我们通常不会要求您注册账户或提供个人身份信息。以下是我们可能收集的信息类型：
                            </p>
                            <h3 className="font-semibold text-gray-800">1.1 自动收集的非个人信息</h3>
                            <p>
                                当您访问本网站时，我们可能会自动收集某些非个人识别信息，包括但不限于：
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>设备类型（如手机、平板、电脑）</li>
                                <li>浏览器类型和版本</li>
                                <li>操作系统信息</li>
                                <li>访问时间和日期</li>
                                <li>页面浏览记录</li>
                                <li>大致地理位置（基于IP地址，精确到城市级别）</li>
                            </ul>
                            <p>
                                这些信息用于分析网站流量、优化用户体验和改进我们的服务。
                            </p>

                            <h3 className="font-semibold text-gray-800">1.2 测试数据</h3>
                            <p>
                                您在完成心理测试时提供的答案和生成的结果完全在您的设备本地处理。我们不会将这些数据上传至我们的服务器，也不会以任何形式存储您的测试答案或结果。
                            </p>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Cookie className="w-6 h-6 text-amber-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">2. Cookies 和类似技术</h2>
                        </div>
                        <div className="space-y-4">
                            <p>
                                本网站可能使用 Cookies 或类似技术来增强用户体验。Cookies 是存储在您设备上的小型文本文件，可以帮助我们记住您的偏好设置。
                            </p>
                            <h3 className="font-semibold text-gray-800">2.1 我们使用的 Cookies 类型</h3>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li><strong>必要性 Cookies：</strong>用于网站基本功能的正常运行</li>
                                <li><strong>分析性 Cookies：</strong>帮助我们了解访问者如何使用网站</li>
                                <li><strong>广告 Cookies：</strong>用于展示相关广告（详见下文广告部分）</li>
                            </ul>
                            <h3 className="font-semibold text-gray-800">2.2 管理 Cookies</h3>
                            <p>
                                您可以通过浏览器设置来管理或删除 Cookies。请注意，禁用 Cookies 可能会影响网站某些功能的正常使用。
                            </p>
                        </div>
                    </section>

                    {/* 广告服务 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Globe className="w-6 h-6 text-green-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">3. 广告服务</h2>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800">3.1 Google AdSense</h3>
                            <p>
                                我们使用 Google AdSense 在网站上展示广告。Google 作为第三方供应商，使用 Cookies（包括 DART Cookie 和 DoubleClick Cookie）根据用户之前对本网站和互联网上其他网站的访问记录来展示广告。
                            </p>
                            <p>
                                Google 使用的广告 Cookie 使其能够根据您访问本网站和其他网站的记录向您展示广告。您可以通过访问 <a href="https://policies.google.com/technologies/ads" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Google 广告设置</a> 页面来选择停用个性化广告。
                            </p>
                            <h3 className="font-semibold text-gray-800">3.2 广告合作伙伴</h3>
                            <p>
                                我们的广告合作伙伴可能会设置自己的 Cookies，以便提供与您兴趣相关的广告。这些第三方 Cookie 的使用受各自隐私政策的约束。
                            </p>
                        </div>
                    </section>

                    {/* 数据安全 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-6 h-6 text-rose-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">4. 数据安全</h2>
                        </div>
                        <div className="space-y-4">
                            <p>
                                我们采取适当的技术和组织措施来保护您的信息免受未经授权的访问、更改、披露或销毁。这些措施包括：
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>使用 HTTPS 加密传输</li>
                                <li>定期安全审查和更新</li>
                                <li>限制员工对用户数据的访问权限</li>
                            </ul>
                            <p>
                                尽管我们努力保护您的信息，但请注意，互联网传输不能保证100%安全。我们建议您在使用任何在线服务时保持警惕。
                            </p>
                        </div>
                    </section>

                    {/* 第三方链接 */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">5. 第三方链接</h2>
                        <div className="space-y-4">
                            <p>
                                本网站可能包含指向其他网站的链接。请注意，这些第三方网站有其自己的隐私政策，我们不对这些网站的内容或隐私做法承担责任。我们建议您在离开本网站后查阅您访问的每个网站的隐私政策。
                            </p>
                        </div>
                    </section>

                    {/* 儿童隐私 */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">6. 儿童隐私</h2>
                        <div className="space-y-4">
                            <p>
                                本服务不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。如果您是家长或监护人，并且发现您的孩子向我们提供了个人信息，请联系我们，我们将采取措施删除此类信息。
                            </p>
                        </div>
                    </section>

                    {/* 政策更新 */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">7. 隐私政策更新</h2>
                        <div className="space-y-4">
                            <p>
                                我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，并更新"最后更新日期"。我们建议您定期查看本页面以了解任何变更。
                            </p>
                            <p>
                                继续使用本网站即表示您接受更新后的隐私政策。如果您不同意更新后的政策，请停止使用本服务。
                            </p>
                        </div>
                    </section>

                    {/* 联系我们 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-6 h-6 text-indigo-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">8. 联系我们</h2>
                        </div>
                        <div className="space-y-4">
                            <p>
                                如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：
                            </p>
                            <p>
                                <strong>Email:</strong> contact@lovequiz.app
                            </p>
                            <p>
                                我们将在收到您的询问后尽快回复。
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
