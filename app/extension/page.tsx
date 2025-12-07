import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Chrome, Settings, FolderOpen, Puzzle } from "lucide-react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

export default function ExtensionPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Chrome className="w-4 h-4" />
                            Chrome 浏览器扩展
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4">
                            安装 AI Bookmark 插件
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            在任意网页一键保存书签，AI 自动分类整理
                        </p>
                    </div>

                    {/* Download Button */}
                    <div className="flex justify-center mb-16">
                        <a href="/ai-bookmark-extension.zip" download>
                            <Button size="lg" className="gap-2 px-8 py-6 text-lg">
                                <Download className="w-5 h-5" />
                                下载插件 (.zip)
                            </Button>
                        </a>
                    </div>

                    {/* Installation Steps */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-semibold text-center mb-8">安装步骤</h2>

                        {/* Step 1 */}
                        <div className="flex gap-6 items-start p-6 bg-card rounded-xl border">
                            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                                1
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                    <Download className="w-5 h-5 text-primary" />
                                    下载并解压
                                </h3>
                                <p className="text-muted-foreground">
                                    点击上方按钮下载 <code className="bg-muted px-1.5 py-0.5 rounded text-sm">ai-bookmark-extension.zip</code>，
                                    然后解压到任意文件夹。
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-6 items-start p-6 bg-card rounded-xl border">
                            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                                2
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                    <Chrome className="w-5 h-5 text-primary" />
                                    打开 Chrome 扩展管理
                                </h3>
                                <p className="text-muted-foreground">
                                    在 Chrome 地址栏输入 <code className="bg-muted px-1.5 py-0.5 rounded text-sm">chrome://extensions</code> 并回车。
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-6 items-start p-6 bg-card rounded-xl border">
                            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                                3
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                    <Settings className="w-5 h-5 text-primary" />
                                    开启开发者模式
                                </h3>
                                <p className="text-muted-foreground">
                                    在页面右上角找到「开发者模式」开关，点击开启。
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex gap-6 items-start p-6 bg-card rounded-xl border">
                            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                                4
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                    <FolderOpen className="w-5 h-5 text-primary" />
                                    加载扩展
                                </h3>
                                <p className="text-muted-foreground">
                                    点击「加载已解压的扩展程序」，选择刚才解压的 <code className="bg-muted px-1.5 py-0.5 rounded text-sm">extension</code> 文件夹。
                                </p>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="flex gap-6 items-start p-6 bg-card rounded-xl border">
                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shrink-0">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                    <Puzzle className="w-5 h-5 text-green-500" />
                                    完成！
                                </h3>
                                <p className="text-muted-foreground">
                                    插件图标会出现在工具栏。点击图标，登录账号，即可开始使用！
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900">
                        <h3 className="font-semibold mb-2">💡 使用提示</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 在任意网页点击插件图标，即可一键保存</li>
                            <li>• 在地址栏输入 <code className="bg-muted px-1 rounded">bm</code> + 空格，可快速搜索书签</li>
                        </ul>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center mt-12">
                        <Link href="/">
                            <Button variant="outline">返回首页</Button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
