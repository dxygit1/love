import { Heart, Shield, Users, Sparkles, BookOpen, MessageCircle } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-white to-indigo-50">
            <div className="flex-grow container mx-auto px-4 md:px-8 pt-24 pb-12 max-w-5xl">
                <div className="text-center mb-12">
                    <div className="inline-block p-3 rounded-2xl bg-rose-100 text-rose-500 mb-4">
                        <Heart className="w-8 h-8 fill-current" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">关于我们</h1>
                    <p className="text-gray-600 text-lg">探索情感，发现真心</p>
                </div>

                <div className="space-y-10 bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-sm border border-white/50">
                    {/* 项目初衷 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-6 h-6 text-rose-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">项目初衷</h2>
                        </div>
                        <div className="text-gray-600 text-base md:text-lg leading-relaxed space-y-4">
                            <p>
                                "测测你到底有多喜欢他" 是一个专注于情感分析与心理探索的在线测试平台。我们深知在现代快节奏的生活中，人们往往容易忽视或混淆自己内心真实的情感。无论是暗恋中的迷茫、热恋中的困惑，还是对自我认知的渴望，都需要一个安全、私密的空间来进行探索。
                            </p>
                            <p>
                                这个项目的初衷，就是希望通过科学、有趣的心理测试题目，帮助用户理清思绪，看清自己对心仪对象的真实感受。我们相信，只有真正了解自己的内心，才能在感情中做出更明智的选择，收获更真实的幸福。
                            </p>
                            <p>
                                我们的测试题目经过精心设计，参考了心理学家Robert Sternberg的爱情三角理论、John Bowlby的依恋理论、以及Alfred Kinsey的性取向研究等经典心理学成果。每一道题目都旨在帮助你从不同角度审视自己的情感状态。
                            </p>
                        </div>
                    </section>

                    {/* 我们的使命 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-6 h-6 text-indigo-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">我们的使命</h2>
                        </div>
                        <div className="text-gray-600 text-base md:text-lg leading-relaxed space-y-4">
                            <p>
                                我们致力于创造一个温暖、包容的情感探索空间。在这里，没有对错之分，只有对自我更深层次的理解。我们希望每一位用户都能在完成测试后，对自己的情感有更清晰的认识。
                            </p>
                            <p>
                                我们的核心价值观包括：
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li><strong>科学性</strong>：所有测试都基于经过验证的心理学理论和研究成果</li>
                                <li><strong>隐私保护</strong>：您的测试数据完全在本地处理，不会上传至任何服务器</li>
                                <li><strong>用户至上</strong>：简洁的界面设计，让您专注于测试本身</li>
                                <li><strong>持续创新</strong>：不断更新和优化测试内容，提供更好的用户体验</li>
                            </ul>
                        </div>
                    </section>

                    {/* 测试方法论 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <BookOpen className="w-6 h-6 text-amber-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">测试方法论</h2>
                        </div>
                        <div className="text-gray-600 text-base md:text-lg leading-relaxed space-y-4">
                            <p>
                                我们的测试题目设计遵循严格的心理学测量原则。每个测试都经过以下流程：
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>基于经典心理学理论构建测试框架</li>
                                <li>设计多维度的评估问题</li>
                                <li>采用科学的评分算法</li>
                                <li>生成个性化的分析报告</li>
                            </ul>
                            <p>
                                我们的爱情测试主要参考斯腾伯格的爱情三角理论（Triangular Theory of Love），该理论认为完整的爱情由亲密、激情和承诺三个要素组成。通过分析您在这三个维度上的表现，我们能够帮助您更好地理解自己的情感状态。
                            </p>
                        </div>
                    </section>

                    {/* 免责声明 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">免责声明</h2>
                        </div>
                        <div className="text-gray-600 text-base md:text-lg leading-relaxed space-y-4">
                            <p>
                                本网站提供的测试结果仅供娱乐和参考，不构成专业的心理咨询或治疗建议。每一段感情都是独一无二的，测试结果无法涵盖所有复杂的情感维度。
                            </p>
                            <p>
                                如果您正在经历严重的情感困扰或心理问题，我们建议您寻求专业心理咨询师或治疗师的帮助。测试结果仅作为自我探索的工具，不能替代专业的心理健康服务。
                            </p>
                            <p>
                                请根据您的实际情况和内心感受来判断您的情感状态。我们鼓励您以开放、诚实的心态完成测试，这样才能获得最有参考价值的结果。
                            </p>
                        </div>
                    </section>

                    {/* 联系我们 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <MessageCircle className="w-6 h-6 text-green-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">联系我们</h2>
                        </div>
                        <div className="text-gray-600 text-base md:text-lg leading-relaxed space-y-4">
                            <p>
                                如果您有任何建议、反馈或合作意向，欢迎随时通过以下方式联系我们。我们非常重视用户的反馈，您的每一条建议都可能会帮助我们改进产品。
                            </p>
                            <p>
                                <strong>Email:</strong> contact@lovequiz.app
                            </p>
                            <p>
                                我们通常会在1-2个工作日内回复您的邮件。感谢您对我们的支持与信任！
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
