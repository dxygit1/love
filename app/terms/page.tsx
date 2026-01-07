import { FileText, AlertTriangle, Scale, Copyright, Ban, RefreshCw, Mail } from "lucide-react";

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

                    {/* 条款接受 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">1. 条款接受</h2>
                        </div>
                        <div className="space-y-4">
                            <p>
                                欢迎使用"测测你到底有多喜欢他"网站（以下简称"本网站"或"本服务"）。在访问或使用本网站之前，请仔细阅读以下用户协议条款。
                            </p>
                            <p>
                                访问或使用本网站，即表示您同意遵守本用户协议的所有条款和条件。如果您不同意这些条款，请停止使用本服务。我们保留随时更改这些条款的权利，更改后继续使用本网站即表示您接受修改后的条款。
                            </p>
                        </div>
                    </section>

                    {/* 服务描述 */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">2. 服务描述</h2>
                        <div className="space-y-4">
                            <p>
                                本网站提供在线心理测试服务，包括但不限于爱情测试、性格测试、心理年龄测试等。这些测试基于心理学理论设计，旨在帮助用户进行自我探索和娱乐。
                            </p>
                            <p>
                                我们提供的服务包括：
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>各类心理测试和性格分析</li>
                                <li>测试结果生成和展示</li>
                                <li>结果分享功能</li>
                                <li>AI情感建议（部分测试提供）</li>
                            </ul>
                            <p>
                                我们会不断更新和改进服务内容，可能会添加新功能或调整现有功能。
                            </p>
                        </div>
                    </section>

                    {/* 服务性质和免责 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-amber-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">3. 服务性质与免责声明</h2>
                        </div>
                        <div className="space-y-4">
                            <p>
                                <strong>重要提示：</strong>本网站提供的测试仅供娱乐和自我探索目的。虽然我们的测试题目基于心理学理论设计，但测试结果不应被视为：
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>专业的心理咨询或诊断</li>
                                <li>医学或健康建议</li>
                                <li>情感关系的决定性依据</li>
                                <li>任何形式的专业治疗建议</li>
                            </ul>
                            <p>
                                我们不对基于测试结果做出的任何决定承担责任。如果您正在经历严重的情感困扰或心理问题，请寻求专业心理咨询师或治疗师的帮助。
                            </p>
                            <p>
                                我们在"按原样"的基础上提供服务，不提供任何形式的明示或暗示担保，包括但不限于对适销性、特定用途适用性和非侵权性的担保。
                            </p>
                        </div>
                    </section>

                    {/* 用户行为准则 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Ban className="w-6 h-6 text-rose-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">4. 用户行为准则</h2>
                        </div>
                        <div className="space-y-4">
                            <p>
                                在使用本网站时，您同意不会：
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>从事任何违反适用法律法规的活动</li>
                                <li>试图未经授权访问本网站的系统或数据</li>
                                <li>上传或传播恶意软件、病毒或其他有害代码</li>
                                <li>干扰或破坏本网站的正常运行</li>
                                <li>使用自动化工具批量访问或抓取本网站内容</li>
                                <li>冒充他人或虚假陈述您与任何人或实体的关系</li>
                                <li>收集或存储其他用户的个人信息</li>
                            </ul>
                            <p>
                                违反上述规定可能导致我们立即终止您对本网站的访问权限。
                            </p>
                        </div>
                    </section>

                    {/* 知识产权 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Copyright className="w-6 h-6 text-indigo-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">5. 知识产权</h2>
                        </div>
                        <div className="space-y-4">
                            <p>
                                本网站的所有内容、设计、图形、用户界面、代码和商标均受版权法和其他知识产权法保护。这些内容归本网站或其许可方所有。
                            </p>
                            <p>
                                除非获得我们的明确书面许可，否则您不得：
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>复制、修改或分发本网站的任何内容</li>
                                <li>将本网站内容用于商业目的</li>
                                <li>创建本网站服务的衍生作品</li>
                                <li>对本网站进行反向工程</li>
                            </ul>
                            <p>
                                您可以在个人、非商业用途下分享测试结果链接。
                            </p>
                        </div>
                    </section>

                    {/* 责任限制 */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">6. 责任限制</h2>
                        <div className="space-y-4">
                            <p>
                                在适用法律允许的最大范围内，本网站及其运营者不对以下情况承担责任：
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>使用或无法使用本服务造成的任何直接、间接、附带、特殊或后果性损害</li>
                                <li>因服务中断、延迟或错误导致的任何损失</li>
                                <li>因第三方行为导致的任何损害</li>
                                <li>用户基于测试结果做出的任何决定</li>
                            </ul>
                        </div>
                    </section>

                    {/* 条款修改 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <RefreshCw className="w-6 h-6 text-green-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">7. 条款修改</h2>
                        </div>
                        <div className="space-y-4">
                            <p>
                                我们保留随时修改本用户协议的权利。修改后的条款将在本页面发布后立即生效。我们建议您定期查看本页面以了解任何变更。
                            </p>
                            <p>
                                继续使用本网站即表示您接受修改后的条款。如果您不同意修改后的条款，请停止使用本服务。
                            </p>
                        </div>
                    </section>

                    {/* 适用法律 */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">8. 适用法律</h2>
                        <div className="space-y-4">
                            <p>
                                本用户协议受中华人民共和国法律管辖并按其解释。因本协议引起的任何争议，双方应首先尝试友好协商解决。如协商不成，任何一方均可向有管辖权的人民法院提起诉讼。
                            </p>
                        </div>
                    </section>

                    {/* 联系我们 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">9. 联系我们</h2>
                        </div>
                        <div className="space-y-4">
                            <p>
                                如果您对本用户协议有任何疑问，请通过以下方式联系我们：
                            </p>
                            <p>
                                <strong>Email:</strong> contact@lovequiz.app
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
