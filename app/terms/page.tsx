import { FileText } from "lucide-react";

export default function TermsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-white to-indigo-50">
            <div className="flex-grow container mx-auto px-4 md:px-8 pt-24 pb-12 max-w-5xl">
                <div className="text-center mb-12">
                    <div className="inline-block p-3 rounded-2xl bg-blue-100 text-blue-500 mb-4">
                        <FileText className="w-8 h-8 fill-current" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">用户协议</h1>
                    <p className="text-gray-600">使用规则与条款</p>
                </div>

                <div className="space-y-8 bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-sm border border-white/50 text-gray-600 leading-relaxed text-base md:text-lg">
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">1. 条款接受</h2>
                        <p>
                            访问或使用"测测你到底有多喜欢他"网站，即表示您同意遵守本用户协议的所有条款。如果您不同意这些条款，请停止使用本服务。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">2. 服务性质</h2>
                        <p>
                            本网站提供的测试仅供娱乐目的。虽然我们基于心理学理论设计题目，但测试结果不应被视为专业的情感咨询或心理治疗建议。我们不对基于测试结果做出的任何决定负责。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">3. 知识产权</h2>
                        <p>
                            本网站的所有内容、设计、图形和代码均受版权法保护。未经许可，不得复制或用于商业用途。
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">4. 免责声明</h2>
                        <p>
                            我们在“按原样”的基础上提供服务，不提供任何形式的明示或暗示担保。我们不保证服务不会中断或没有错误。
                        </p>
                    </section>
                </div>
            </div>

        </main>
    );
}
