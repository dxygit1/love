"use client"

import { useAppContext } from "@/components/providers"
import { LegalPageLayout } from "@/components/legal-page-layout"

export default function TermsPage() {
    const { locale } = useAppContext()

    const sections = locale === 'zh' ? [
        {
            id: "acceptance",
            title: "1. 接受条款",
            content: <p>欢迎使用 AI Bookmark！通过访问或使用我们的服务，您同意受本服务条款的约束。如果您不同意这些条款，请勿使用我们的服务。</p>
        },
        {
            id: "description",
            title: "2. 服务描述",
            content: (
                <>
                    <p>AI Bookmark 是一个智能书签管理工具，提供：</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>AI 驱动的自动分类</li>
                        <li>多设备同步</li>
                        <li>全文搜索功能</li>
                        <li>标签管理系统</li>
                        <li>云端存储</li>
                    </ul>
                    <p className="mt-4">我们保留随时修改、暂停或终止任何服务功能的权利，恕不另行通知。</p>
                </>
            )
        },
        {
            id: "registration",
            title: "3. 账户注册",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>年龄要求</strong>: 您必须年满 13 岁才能使用本服务</li>
                    <li><strong>账户安全</strong>: 您有责任保护账户密码的安全性</li>
                    <li><strong>真实信息</strong>: 您提供的信息必须准确且及时更新</li>
                    <li><strong>账户责任</strong>: 您对账户下的所有活动负责</li>
                    <li><strong>一人一户</strong>: 每个用户只能创建一个账户</li>
                </ul>
            )
        },
        {
            id: "conduct",
            title: "4. 用户行为准则",
            content: (
                <>
                    <p>使用我们的服务时，您<strong>不得</strong>：</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>违反任何适用的法律法规</li>
                        <li>侵犯他人的知识产权或隐私权</li>
                        <li>上传恶意软件、病毒或有害代码</li>
                        <li>滥用 AI 分类功能（如大规模自动化请求）</li>
                        <li>试图未经授权访问我们的系统或其他用户的数据</li>
                        <li>干扰或破坏服务的正常运行</li>
                        <li>使用自动化工具（机器人、爬虫）访问服务，除非获得明确许可</li>
                        <li>转售或商业化利用服务，除非获得书面许可</li>
                    </ul>
                </>
            )
        },
        {
            id: "ownership",
            title: "5. 内容所有权",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>您的内容</strong>: 您保留对保存的书签和数据的所有权</li>
                    <li><strong>授权许可</strong>: 您授予我们存储、处理和显示您的内容以提供服务的许可</li>
                    <li><strong>我们的内容</strong>: AI Bookmark 的品牌、设计、代码和功能受知识产权法保护</li>
                </ul>
            )
        },
        {
            id: "ai",
            title: "6. AI 功能使用",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>使用限制</strong>: 免费用户每月有 AI 分类次数限制</li>
                    <li><strong>准确性</strong>: AI 分类是自动化的，可能不完全准确，您可以手动调整</li>
                    <li><strong>数据使用</strong>: 我们可能使用匿名化的分类数据改进 AI 模型</li>
                </ul>
            )
        },
        {
            id: "payment",
            title: "7. 付费服务",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>订阅</strong>: 付费计划按月或按年计费</li>
                    <li><strong>自动续订</strong>: 订阅会自动续订，除非您取消</li>
                    <li><strong>退款</strong>: 我们提供 7 天无理由退款保证（新订阅）</li>
                    <li><strong>价格变更</strong>: 价格变更会提前至少 30 天通知</li>
                    <li><strong>取消</strong>: 您可以随时取消订阅，但已支付的费用不予退还（除退款保证期内）</li>
                </ul>
            )
        },
        {
            id: "data",
            title: "8. 数据导入导出",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li>您可以随时导出您的书签数据</li>
                    <li>支持 HTML 和 JSON 格式导出</li>
                    <li>可以从其他书签管理工具导入</li>
                </ul>
            )
        },
        {
            id: "availability",
            title: "9. 服务可用性",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>正常运行时间</strong>: 我们努力保持 99.9% 的可用性，但不保证服务永不中断</li>
                    <li><strong>维护</strong>: 我们可能定期进行计划维护，会提前通知</li>
                    <li><strong>不可抗力</strong>: 对于不可抗力造成的服务中断，我们不承担责任</li>
                </ul>
            )
        },
        {
            id: "termination",
            title: "10. 账户终止",
            content: (
                <>
                    <p>我们保留在以下情况下暂停或终止您账户的权利：</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>违反本服务条款</li>
                        <li>长期未使用（2年以上，会提前通知）</li>
                        <li>涉嫌欺诈或非法活动</li>
                        <li>对服务造成技术风险或法律风险</li>
                    </ul>
                    <p className="mt-4">账户终止后，您的数据将在 30 天内永久删除。</p>
                </>
            )
        },
        {
            id: "disclaimer",
            title: "11. 免责声明",
            content: (
                <>
                    <p>本服务按"现状"提供，不提供任何明示或暗示的保证，包括但不限于：</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>服务的准确性、可靠性或完整性</li>
                        <li>服务满足您的特定需求</li>
                        <li>服务不会中断或无错误</li>
                        <li>AI 分类的准确性</li>
                    </ul>
                </>
            )
        },
        {
            id: "liability",
            title: "12. 责任限制",
            content: (
                <>
                    <p>在适用法律允许的最大范围内：</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>我们对任何间接、偶然、特殊或后果性损害不承担责任</li>
                        <li>我们的总责任不超过您过去 12 个月支付的费用</li>
                        <li>我们不对数据丢失负责（请定期导出备份）</li>
                    </ul>
                </>
            )
        },
        {
            id: "indemnification",
            title: "13. 赔偿",
            content: <p>您同意赔偿并使 AI Bookmark 免受因您使用服务、违反本条款或侵犯他人权利而产生的任何索赔、损失或费用。</p>
        },
        {
            id: "dispute",
            title: "14. 争议解决",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>友好协商</strong>: 首先尝试通过协商解决任何争议</li>
                    <li><strong>适用法律</strong>: 本条款受中华人民共和国法律管辖</li>
                    <li><strong>管辖法院</strong>: 因本条款引起的争议提交至服务提供商所在地法院</li>
                </ul>
            )
        },
        {
            id: "modification",
            title: "15. 条款修改",
            content: <p>我们可能会不时更新本服务条款。重大变更会通过电子邮件或网站通知。更新后继续使用服务即表示接受新条款。</p>
        },
        {
            id: "severability",
            title: "16. 可分割性",
            content: <p>如果本条款的任何部分被认定为无效或不可执行，其余部分仍然有效。</p>
        },
        {
            id: "agreement",
            title: "17. 完整协议",
            content: <p>本服务条款和隐私政策构成您与 AI Bookmark 之间的完整协议，取代所有先前的协议或谅解。</p>
        },
        {
            id: "contact",
            title: "18. 联系方式",
            content: (
                <>
                    <p>如对本服务条款有任何疑问，请联系：</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>电子邮件: <a href="mailto:dxysy1@gmail.com" className="text-primary hover:underline">dxysy1@gmail.com</a></li>
                        <li>Twitter: <a href="https://twitter.com/OwenDong_sy" target="_blank" className="text-primary hover:underline">@OwenDong_sy</a></li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-8">
                        通过创建账户或使用 AI Bookmark，您确认已阅读、理解并同意受本服务条款的约束。
                    </p>
                </>
            )
        }
    ] : [
        {
            id: "acceptance",
            title: "1. Acceptance of Terms",
            content: <p>Welcome to AI Bookmark! By accessing or using our service, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our service.</p>
        },
        {
            id: "description",
            title: "2. Service Description",
            content: (
                <>
                    <p>AI Bookmark is an intelligent bookmark management tool that provides:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>AI-powered automatic classification</li>
                        <li>Multi-device synchronization</li>
                        <li>Full-text search functionality</li>
                        <li>Tag management system</li>
                        <li>Cloud storage</li>
                    </ul>
                    <p className="mt-4">We reserve the right to modify, suspend, or terminate any service features at any time without notice.</p>
                </>
            )
        },
        {
            id: "registration",
            title: "3. Account Registration",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Age Requirement</strong>: You must be at least 13 years old to use this service</li>
                    <li><strong>Account Security</strong>: You are responsible for maintaining the security of your password</li>
                    <li><strong>Accurate Information</strong>: Information you provide must be accurate and kept up to date</li>
                    <li><strong>Account Responsibility</strong>: You are responsible for all activities under your account</li>
                    <li><strong>One Account Per User</strong>: Each user may only create one account</li>
                </ul>
            )
        },
        {
            id: "conduct",
            title: "4. User Conduct",
            content: (
                <>
                    <p>When using our service, you <strong>must NOT</strong>:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Violate any applicable laws or regulations</li>
                        <li>Infringe on intellectual property or privacy rights</li>
                        <li>Upload malware, viruses, or harmful code</li>
                        <li>Abuse AI classification features (e.g., mass automated requests)</li>
                        <li>Attempt unauthorized access to our systems or other users' data</li>
                        <li>Interfere with or disrupt normal service operation</li>
                        <li>Use automated tools (bots, crawlers) without explicit permission</li>
                        <li>Resell or commercially exploit the service without written permission</li>
                    </ul>
                </>
            )
        },
        {
            id: "ownership",
            title: "5. Content Ownership",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Your Content</strong>: You retain ownership of your saved bookmarks and data</li>
                    <li><strong>License Grant</strong>: You grant us permission to store, process, and display your content to provide the service</li>
                    <li><strong>Our Content</strong>: AI Bookmark's branding, design, code, and features are protected by intellectual property laws</li>
                </ul>
            )
        },
        {
            id: "ai",
            title: "6. AI Features Usage",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Usage Limits</strong>: Free users have monthly AI classification limits</li>
                    <li><strong>Accuracy</strong>: AI classification is automated and may not be 100% accurate; you can manually adjust</li>
                    <li><strong>Data Usage</strong>: We may use anonymized classification data to improve our AI models</li>
                </ul>
            )
        },
        {
            id: "payment",
            title: "7. Paid Services",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Subscription</strong>: Paid plans are billed monthly or annually</li>
                    <li><strong>Auto-renewal</strong>: Subscriptions automatically renew unless you cancel</li>
                    <li><strong>Refunds</strong>: We offer a 7-day money-back guarantee for new subscriptions</li>
                    <li><strong>Price Changes</strong>: Price changes will be notified at least 30 days in advance</li>
                    <li><strong>Cancellation</strong>: You may cancel anytime, but paid fees are non-refundable (except during guarantee period)</li>
                </ul>
            )
        },
        {
            id: "data",
            title: "8. Data Import/Export",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li>You can export your bookmark data at any time</li>
                    <li>Support for HTML and JSON format exports</li>
                    <li>Can import from other bookmark management tools</li>
                </ul>
            )
        },
        {
            id: "availability",
            title: "9. Service Availability",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Uptime</strong>: We strive for 99.9% availability but don't guarantee uninterrupted service</li>
                    <li><strong>Maintenance</strong>: We may perform scheduled maintenance with advance notice</li>
                    <li><strong>Force Majeure</strong>: We're not liable for service interruptions due to force majeure</li>
                </ul>
            )
        },
        {
            id: "termination",
            title: "10. Account Termination",
            content: (
                <>
                    <p>We reserve the right to suspend or terminate your account if:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>You violate these Terms of Service</li>
                        <li>Extended inactivity (2+ years, with advance notice)</li>
                        <li>Suspected fraud or illegal activity</li>
                        <li>Technical or legal risk to the service</li>
                    </ul>
                    <p className="mt-4">After account termination, your data will be permanently deleted within 30 days.</p>
                </>
            )
        },
        {
            id: "disclaimer",
            title: "11. Disclaimer",
            content: (
                <>
                    <p>The service is provided "as is" without any warranties, express or implied, including but not limited to:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Accuracy, reliability, or completeness of the service</li>
                        <li>Service meeting your specific needs</li>
                        <li>Uninterrupted or error-free service</li>
                        <li>AI classification accuracy</li>
                    </ul>
                </>
            )
        },
        {
            id: "liability",
            title: "12. Limitation of Liability",
            content: (
                <>
                    <p>To the maximum extent permitted by law:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>We're not liable for any indirect, incidental, special, or consequential damages</li>
                        <li>Our total liability shall not exceed fees you paid in the past 12 months</li>
                        <li>We're not responsible for data loss (please export backups regularly)</li>
                    </ul>
                </>
            )
        },
        {
            id: "indemnification",
            title: "13. Indemnification",
            content: <p>You agree to indemnify and hold AI Bookmark harmless from any claims, losses, or expenses arising from your use of the service, violation of these terms, or infringement of others' rights.</p>
        },
        {
            id: "dispute",
            title: "14. Dispute Resolution",
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Amicable Settlement</strong>: First attempt to resolve disputes through negotiation</li>
                    <li><strong>Governing Law</strong>: These terms are governed by the laws of the People's Republic of China</li>
                    <li><strong>Jurisdiction</strong>: Disputes arising from these terms shall be submitted to courts where the service provider is located</li>
                </ul>
            )
        },
        {
            id: "modification",
            title: "15. Terms Modification",
            content: <p>We may update these Terms of Service from time to time. Material changes will be notified via email or website. Continued use after updates constitutes acceptance of new terms.</p>
        },
        {
            id: "severability",
            title: "16. Severability",
            content: <p>If any part of these terms is found invalid or unenforceable, the remaining parts remain in effect.</p>
        },
        {
            id: "agreement",
            title: "17. Entire Agreement",
            content: <p>These Terms of Service and Privacy Policy constitute the entire agreement between you and AI Bookmark, superseding all prior agreements or understandings.</p>
        },
        {
            id: "contact",
            title: "18. Contact Information",
            content: (
                <>
                    <p>For questions about these Terms of Service, contact:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Email: <a href="mailto:dxysy1@gmail.com" className="text-primary hover:underline">dxysy1@gmail.com</a></li>
                        <li>Twitter: <a href="https://twitter.com/OwenDong_sy" target="_blank" className="text-primary hover:underline">@OwenDong_sy</a></li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-8">
                        By creating an account or using AI Bookmark, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                    </p>
                </>
            )
        }
    ]

    return (
        <LegalPageLayout
            title={locale === 'zh' ? '服务条款' : 'Terms of Service'}
            lastUpdated={locale === 'zh' ? '最后更新：2025年12月2日' : 'Last Updated: December 2, 2025'}
            sections={sections}
        />
    )
}
