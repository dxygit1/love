"use client"

import { useAppContext } from "@/components/providers"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Bookmark, Sparkles, Globe, Shield } from "lucide-react"

export default function AboutPage() {
    const { locale } = useAppContext()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            {locale === 'zh' ? 'AI 驱动的智能书签' : 'AI-Powered Smart Bookmarks'}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {locale === 'zh' ? (
                                <>让书签管理<span className="text-primary">简单高效</span></>
                            ) : (
                                <>Make Bookmark Management <span className="text-primary">Simple & Efficient</span></>
                            )}
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {locale === 'zh'
                                ? '我们致力于通过 AI 技术帮助用户智能管理书签，从繁琐的整理工作中解放出来。'
                                : 'We are committed to helping users intelligently manage bookmarks through AI technology, freeing them from tedious organization work.'}
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            {locale === 'zh' ? '项目背景' : 'Project Background'}
                        </h2>

                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            {locale === 'zh' ? (
                                <>
                                    <p className="text-lg leading-relaxed">
                                        在数字化时代，我们每天浏览大量网页，收藏无数链接。传统的书签管理方式往往存在以下问题：
                                    </p>
                                    <ul className="space-y-3 my-6">
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary mt-1">•</span>
                                            <span><strong>整理耗时</strong>：手动分类书签需要花费大量时间和精力</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary mt-1">•</span>
                                            <span><strong>分类混乱</strong>：随着书签数量增加，越来越难以维护</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary mt-1">•</span>
                                            <span><strong>查找困难</strong>：想找某个网站时，常常需要翻找很久</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary mt-1">•</span>
                                            <span><strong>跨设备同步差</strong>：浏览器自带的书签同步功能体验欠佳</span>
                                        </li>
                                    </ul>
                                    <p className="text-lg leading-relaxed">
                                        因此，我们创建了 AI Bookmark 平台，通过先进的 AI 技术自动分析网页内容并智能分类，让用户只需添加网址，剩下的交给 AI 来处理。
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-lg leading-relaxed">
                                        In the digital age, we browse countless web pages daily and save numerous links. Traditional bookmark management often suffers from:
                                    </p>
                                    <ul className="space-y-3 my-6">
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary mt-1">•</span>
                                            <span><strong>Time-Consuming Organization</strong>: Manual categorization requires significant time and effort</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary mt-1">•</span>
                                            <span><strong>Chaotic Classification</strong>: As bookmarks grow, maintenance becomes increasingly difficult</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary mt-1">•</span>
                                            <span><strong>Search Difficulties</strong>: Finding a specific website often requires extensive browsing</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary mt-1">•</span>
                                            <span><strong>Poor Cross-Device Sync</strong>: Built-in browser bookmark sync often provides suboptimal experience</span>
                                        </li>
                                    </ul>
                                    <p className="text-lg leading-relaxed">
                                        Therefore, we created the AI Bookmark platform, using advanced AI technology to automatically analyze web content and intelligently categorize it. Users simply add URLs, and let AI handle the rest.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            {locale === 'zh' ? '核心价值' : 'Core Values'}
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {locale === 'zh' ? '高效便捷' : 'Efficient & Convenient'}
                                </h3>
                                <p className="text-muted-foreground">
                                    {locale === 'zh'
                                        ? '只需添加网址，AI 即可自动分类，大幅节省时间。'
                                        : 'Simply add URLs, and AI automatically categorizes them, saving significant time.'}
                                </p>
                            </div>

                            <div className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {locale === 'zh' ? '专业可靠' : 'Professional & Reliable'}
                                </h3>
                                <p className="text-muted-foreground">
                                    {locale === 'zh'
                                        ? '集成主流 AI 服务，确保分类质量和服务稳定性。'
                                        : 'Integrated with mainstream AI services, ensuring quality and stability.'}
                                </p>
                            </div>

                            <div className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {locale === 'zh' ? '多语言支持' : 'Multi-Language Support'}
                                </h3>
                                <p className="text-muted-foreground">
                                    {locale === 'zh'
                                        ? '支持中英文界面，满足不同用户的需求。'
                                        : 'Supports Chinese and English interfaces to meet diverse user needs.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Statement */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <Bookmark className="w-8 h-8 text-primary" />
                        </div>

                        <h2 className="text-3xl font-bold mb-6">
                            {locale === 'zh' ? '我们的使命' : 'Our Mission'}
                        </h2>

                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {locale === 'zh'
                                ? '让每一位互联网用户都能轻松、高效地管理书签，将更多时间投入到真正重要的事情上。'
                                : 'Enable every internet user to manage bookmarks easily and efficiently, dedicating more time to what truly matters.'}
                        </p>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            {locale === 'zh' ? '有任何问题？' : 'Have Questions?'}
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            {locale === 'zh'
                                ? '欢迎随时联系我们，我们很乐意为您提供帮助。'
                                : "Feel free to contact us anytime. We're happy to help."}
                        </p>
                        <a
                            href="/#contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                            {locale === 'zh' ? '联系我们' : 'Contact Us'}
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
