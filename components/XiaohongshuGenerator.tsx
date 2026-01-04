
"use client";

import { useState } from 'react';
import { generateXiaohongshuCopy, XiaohongshuResult } from '@/lib/ai';
import { Sparkles, Copy, Check } from 'lucide-react';

interface XiaohongshuGeneratorProps {
    type: 'mental-age' | 'love-quiz' | 'does-he-like-me' | 'do-i-like-her' | 'gay-test' | 'do-i-like-him';
    data: any;
}

export function XiaohongshuGenerator({ type, data }: XiaohongshuGeneratorProps) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<XiaohongshuResult | null>(null);
    const [copiedTitle, setCopiedTitle] = useState(false);
    const [copiedContent, setCopiedContent] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await generateXiaohongshuCopy(type, data);
            setResult(res);
        } catch (e) {
            alert("生成失败，请重试");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string, isTitle: boolean) => {
        navigator.clipboard.writeText(text);
        if (isTitle) {
            setCopiedTitle(true);
            setTimeout(() => setCopiedTitle(false), 2000);
        } else {
            setCopiedContent(true);
            setTimeout(() => setCopiedContent(false), 2000);
        }
    };

    return (
        <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-4 md:p-6 border border-pink-100 mt-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <span className="bg-red-500 text-white p-1 rounded-md text-xs">小红书</span>
                    爆款文案生成器
                </h3>
            </div>

            {!result && (
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full py-3 bg-red-500 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Sparkles className="w-5 h-5 animate-spin" />
                            正在根据结果分析...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            一键生成发布文案
                        </>
                    )}
                </button>
            )}

            {result && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Title Section */}
                    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm relative group">
                        <span className="text-xs text-gray-400 absolute top-2 left-3">标题</span>
                        <div className="mt-4 font-bold text-gray-800 pr-8">{result.title}</div>
                        <button
                            onClick={() => copyToClipboard(result.title, true)}
                            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="复制标题"
                        >
                            {copiedTitle ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm relative group">
                        <span className="text-xs text-gray-400 absolute top-2 left-3">正文</span>
                        <div className="mt-4 text-gray-600 text-sm whitespace-pre-wrap pr-8 leading-relaxed">
                            {result.content}
                        </div>
                        <button
                            onClick={() => copyToClipboard(result.content, false)}
                            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="复制正文"
                        >
                            {copiedContent ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleGenerate}
                            className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                            不满意？重新生成
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
