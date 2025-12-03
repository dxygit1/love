"use client"

import { useAppContext } from "@/components/providers"
import { LegalPageLayout } from "@/components/legal-page-layout"

export default function PrivacyPage() {
    const { locale } = useAppContext()

    const sections = locale === 'zh' ? [
        {
            id: "collection",
            title: "1. 信息收集",
            content: (
                <>
                    <p>我们收集以下类型的信息：</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>账户信息</strong>: 当您注册时，我们收集您的电子邮件地址和密码（加密存储）。</li>
                        <li><strong>书签数据</strong>: 您保存的网址、标题、分类和标签信息。</li>
                        <li><strong>使用数据</strong>: AI 分类使用次数、登录时间等基本使用统计。</li>
                        <li><strong>技术信息</strong>: IP 地址、浏览器类型、设备信息，用于安全和性能优化。</li>
                    </ul>
                </>
            )
        },
        {
            id: "usage",
            title: "2. 信息使用",
            content: (
                <>
                    <p>我们使用收集的信息用于：</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>提供和改进我们的服务</li>
                        <li>AI 智能分类功能</li>
                        <li>数据同步和备份</li>
                        <li>账户安全和身份验证</li>
                        <li>发送重要的服务通知</li>
                        <li>分析和优化产品性能</li>
                    </ul>
                </>
            )
        },
        {
            id: "security",
            title: "3. 数据存储与安全",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>加密</strong>: 所有数据在传输和存储时均采用行业标准加密</li>
                    <li><strong>访问控制</strong>: 仅授权人员可访问用户数据</li>
                    <li><strong>备份</strong>: 定期备份以防数据丢失</li>
                    <li><strong>第三方服务</strong>: 我们使用 Supabase 作为数据库服务商，符合 SOC 2 Type II 标准</li>
                </ul>
            )
        },
        {
            id: "sharing",
            title: "4. 数据共享",
            content: (
                <>
                    <p>我们<strong>不会</strong>出售或分享您的个人信息给第三方，除非：</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>获得您的明确同意</li>
                        <li>法律要求或响应法律程序</li>
                        <li>保护我们的权利、财产或安全</li>
                        <li>与服务提供商（如托管服务）共享，但他们受隐私协议约束</li>
                    </ul>
                </>
            )
        },
        {
            id: "cookies",
            title: "5. Cookie 使用",
            content: (
                <>
                    <p>我们使用 Cookie 和类似技术来：</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>保持您的登录状态</li>
                        <li>记住您的偏好设置（语言、主题等）</li>
                        <li>分析网站使用情况（Microsoft Clarity）</li>
                    </ul>
                    <p className="mt-4">您可以通过浏览器设置控制 Cookie，但这可能影响某些功能。</p>
                </>
            )
        },
        {
            id: "rights",
            title: "6. 您的权利",
            content: (
                <>
                    <p>根据 GDPR 和其他隐私法规，您有权：</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>访问</strong>: 查看我们持有的关于您的数据</li>
                        <li><strong>更正</strong>: 更新不准确的个人信息</li>
                        <li><strong>删除</strong>: 请求删除您的账户和数据</li>
                        <li><strong>导出</strong>: 以机器可读格式导出您的数据</li>
                        <li><strong>反对</strong>: 反对某些数据处理活动</li>
                    </ul>
                    <p className="mt-4">如需行使这些权利，请联系：<a href="mailto:dxysy1@gmail.com" className="text-primary hover:underline">dxysy1@gmail.com</a></p>
                </>
            )
        },
        {
            id: "retention",
            title: "7. 数据保留",
            content: (
                <>
                    <p>我们会保留您的数据，直到：</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>您删除账户</li>
                        <li>账户超过 2 年未使用（我们会提前通知）</li>
                        <li>法律要求的最短保留期结束</li>
                    </ul>
                </>
            )
        },
        {
            id: "transfer",
            title: "8. 国际数据传输",
            content: <p>您的数据可能会被传输到您所在国家/地区以外的服务器。我们确保所有传输符合适用的数据保护法规。</p>
        },
        {
            id: "children",
            title: "9. 儿童隐私",
            content: <p>我们的服务不面向 13 岁以下儿童。如果我们发现收集了儿童的个人信息，将立即删除。</p>
        },
        {
            id: "updates",
            title: "10. 政策更新",
            content: <p>我们可能会不时更新本隐私政策。重大变更时，我们会通过电子邮件或网站通知您。继续使用服务即表示接受更新后的政策。</p>
        },
        {
            id: "contact",
            title: "11. 联系我们",
            content: (
                <>
                    <p>如对本隐私政策有任何疑问，请联系：</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>电子邮件: <a href="mailto:dxysy1@gmail.com" className="text-primary hover:underline">dxysy1@gmail.com</a></li>
                        <li>Twitter: <a href="https://twitter.com/OwenDong_sy" target="_blank" className="text-primary hover:underline">@OwenDong_sy</a></li>
                    </ul>
                </>
            )
        }
    ] : [
        {
            id: "collection",
            title: "1. Information We Collect",
            content: (
                <>
                    <p>We collect the following types of information:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>Account Information</strong>: Email address and encrypted password when you register.</li>
                        <li><strong>Bookmark Data</strong>: URLs, titles, categories, and tags you save.</li>
                        <li><strong>Usage Data</strong>: AI classification usage, login times, and basic statistics.</li>
                        <li><strong>Technical Information</strong>: IP address, browser type, device info for security and performance.</li>
                    </ul>
                </>
            )
        },
        {
            id: "usage",
            title: "2. How We Use Information",
            content: (
                <>
                    <p>We use collected information to:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Provide and improve our services</li>
                        <li>AI smart classification features</li>
                        <li>Data synchronization and backup</li>
                        <li>Account security and authentication</li>
                        <li>Send important service notifications</li>
                        <li>Analyze and optimize product performance</li>
                    </ul>
                </>
            )
        },
        {
            id: "security",
            title: "3. Data Storage & Security",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Encryption</strong>: All data is encrypted in transit and at rest using industry standards</li>
                    <li><strong>Access Control</strong>: Only authorized personnel can access user data</li>
                    <li><strong>Backups</strong>: Regular backups to prevent data loss</li>
                    <li><strong>Third-party Services</strong>: We use Supabase as our database provider, compliant with SOC 2 Type II</li>
                </ul>
            )
        },
        {
            id: "sharing",
            title: "4. Data Sharing",
            content: (
                <>
                    <p>We <strong>do NOT</strong> sell or share your personal information with third parties, except:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>With your explicit consent</li>
                        <li>As required by law or legal process</li>
                        <li>To protect our rights, property, or safety</li>
                        <li>With service providers (e.g., hosting) under privacy agreements</li>
                    </ul>
                </>
            )
        },
        {
            id: "cookies",
            title: "5. Cookies",
            content: (
                <>
                    <p>We use cookies and similar technologies to:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Keep you logged in</li>
                        <li>Remember your preferences (language, theme)</li>
                        <li>Analyze website usage (Microsoft Clarity)</li>
                    </ul>
                    <p className="mt-4">You can control cookies through browser settings, though this may affect functionality.</p>
                </>
            )
        },
        {
            id: "rights",
            title: "6. Your Rights",
            content: (
                <>
                    <p>Under GDPR and other privacy laws, you have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>Access</strong>: View data we hold about you</li>
                        <li><strong>Rectification</strong>: Update inaccurate information</li>
                        <li><strong>Erasure</strong>: Request deletion of your account and data</li>
                        <li><strong>Portability</strong>: Export your data in machine-readable format</li>
                        <li><strong>Object</strong>: Object to certain data processing activities</li>
                    </ul>
                    <p className="mt-4">To exercise these rights, contact: <a href="mailto:dxysy1@gmail.com" className="text-primary hover:underline">dxysy1@gmail.com</a></p>
                </>
            )
        },
        {
            id: "retention",
            title: "7. Data Retention",
            content: (
                <>
                    <p>We retain your data until:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>You delete your account</li>
                        <li>Account inactive for 2+ years (we'll notify you first)</li>
                        <li>Legal minimum retention period expires</li>
                    </ul>
                </>
            )
        },
        {
            id: "transfer",
            title: "8. International Data Transfers",
            content: <p>Your data may be transferred to servers outside your country. We ensure all transfers comply with applicable data protection regulations.</p>
        },
        {
            id: "children",
            title: "9. Children's Privacy",
            content: <p>Our service is not directed to children under 13. If we discover we've collected a child's personal information, we'll delete it immediately.</p>
        },
        {
            id: "updates",
            title: "10. Policy Updates",
            content: <p>We may update this privacy policy from time to time. For significant changes, we'll notify you via email or website notice. Continued use means acceptance of the updated policy.</p>
        },
        {
            id: "contact",
            title: "11. Contact Us",
            content: (
                <>
                    <p>For questions about this privacy policy, contact:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Email: <a href="mailto:dxysy1@gmail.com" className="text-primary hover:underline">dxysy1@gmail.com</a></li>
                        <li>Twitter: <a href="https://twitter.com/OwenDong_sy" target="_blank" className="text-primary hover:underline">@OwenDong_sy</a></li>
                    </ul>
                </>
            )
        }
    ]

    return (
        <LegalPageLayout
            title={locale === 'zh' ? '隐私政策' : 'Privacy Policy'}
            lastUpdated={locale === 'zh' ? '最后更新：2025年12月2日' : 'Last Updated: December 2, 2025'}
            sections={sections}
        />
    )
}
