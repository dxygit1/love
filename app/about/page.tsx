import { Heart } from "lucide-react";

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
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">项目初衷</h2>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                            "测测你到底有多喜欢他" 是一个专注于情感分析的在线测试工具。我们深知在现代快节奏的生活中，人们往往容易忽视或混淆自己内心真实的情感。
                            这个项目的初衷，就是希望通过科学、有趣的心理测试题目，帮助用户理清思绪，看清自己对心仪对象的真实感受。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">免责声明</h2>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                            本网站提供的测试结果仅供娱乐和参考，不构成专业的心理咨询建议。每一段感情都是独一无二的，测试结果无法涵盖所有复杂的情感维度。
                            请根据您的实际情况和内心感受来判断您的情感状态。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">联系我们</h2>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                            如果您有任何建议、反馈或合作意向，欢迎随时通过邮件联系我们。
                            <br />
                            Email: contact@lovequiz.app
                        </p>
                    </section>
                </div>
            </div>

        </main>
    );
}
