"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, ArrowRight, Search, Menu, Brain } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { AdUnit } from "@/components/AdUnit";

/*
 * Portal Homepage replicating arealme.com style
 * Features:
 * 1. Clean Header
 * 2. Hero Section with Search
 * 3. Category Grid (Simplified for now)
 * 4. Main Quiz Grid (2 cols mobile, 3 cols desktop)
 */

export default function PortalPage() {
  const { t, language } = useLanguage();

  const quizzes = [
    {
      id: "love-quiz",
      href: "/love-quiz",
      titleEn: "How much do you Love Him?",
      titleZh: "你到底有多喜欢他？",
      descEn: "Is it just a crush or true love? Based on Sternberg's Triangular Theory of Love, this deep psychological analysis reveals the true nature of your feelings.",
      descZh: "到底是心动还是真爱？基于斯腾伯格爱情三角理论，通过多维度分析深度剖析你的真实心意，助你看清这段关系的本质。",
      icon: Heart,
      color: "from-rose-500 to-pink-600",
      stats: "2.3M+ Tested",
      badge: "HOT"
    },
    {
      id: "desire-test",
      href: "/desire-test",
      titleEn: "Your Desire Chart",
      titleZh: "你的欲望组成图",
      descEn: "What drives your heart? Discover your inner desires through 12 fun scenarios. Explore 8 desire dimensions and generate your unique desire pie chart!",
      descZh: "你的欲望由什么组成？通过12道趣味情景题，测试你内心深处的真实渴望。探索八大欲望维度，生成专属于你的欲望比重饼图！",
      icon: Sparkles,
      color: "from-amber-500 to-orange-600",
      stats: "Trending",
      badge: "NEW"
    },
    {
      id: "does-he-like-me",
      href: "/does-he-like-me",
      titleEn: "Does He Like Me?",
      titleZh: "他喜欢我吗？",
      descEn: "Decode his mixed signals! We analyze 20 subconscious behavioral details to reveal if he's truly interested in you or just being friendly.",
      descZh: "那个他到底怎么想的？通过20个潜意识行为细节与非语言信号，我们帮你揭秘他对你的真实感觉，不再猜来猜去。",
      icon: Sparkles,
      color: "from-indigo-500 to-violet-600",
      stats: "New Arrival",
      badge: "NEW"
    },
    {
      id: "do-i-like-her",
      href: "/do-i-like-her",
      titleEn: "Do I Like Her?",
      titleZh: "我喜欢她吗？",
      descEn: "Just a friend or something more? Based on the Laws of Attraction, calculate your true affection level and understand your own heart.",
      descZh: "只是朋友还是心动？基于人际吸引力法则，通过心理投射测试解析你对她的真实感觉，帮你理清心中迷雾。",
      icon: Sparkles,
      color: "from-sky-500 to-blue-600",
      stats: "Trending",
      badge: "HOT"
    },
    {
      id: "mental-age",
      href: "/mental-age",
      titleEn: "Mental Age Test",
      titleZh: "心理年龄测试",
      descEn: "How old is your soul? Answer 31 calibrated questions to find out your true mental maturity and how you view the world.",
      descZh: "你的心理年龄是多少？通过31道经过校准的心理测试题，测出你内心深处的真实成熟度与看待世界的方式。",
      icon: Brain,
      color: "from-green-500 to-teal-600",
      stats: "Classic",
      badge: "POPULAR"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-gray-800">

      {/* 2. Hero Section */}
      <section className="bg-white pb-12 pt-24 px-4 text-center border-b border-gray-100">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {language === "zh" ? "探索内心的真实声音" : "Discover Your True Self"}
          </h1>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            {language === "zh"
              ? "专业的心理学模型，帮助你在复杂的感情世界中找到答案。无需注册，即刻开始。"
              : "Professional psychological models to help you find answers in the complex world of emotions. No registration required."}
          </p>



          {/* Search Bar (Visual only for now) */}
          <div className="relative max-w-md mx-auto group">
            <input
              type="text"
              placeholder={language === "zh" ? "搜索测试..." : "Search quizzes..."}
              className="w-full py-3 pl-12 pr-4 bg-gray-100 rounded-full border-2 border-transparent focus:bg-white focus:border-rose-400 focus:outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
          </div>
        </div>
      </section>

      {/* 3. Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* Categories (Simplified) */}
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide mb-4">
          {["All", "Love", "Personality", "IQ", "Career"].map((cat, i) => (
            <button key={cat} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* AdUnit - Interstitial */}
        <div className="w-full flex justify-center">
          <AdUnit slot="HOME_TOP_SLOT" />
        </div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Link key={quiz.id} href={quiz.href} className="group block">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
              >
                {/* Thumbnail Area */}
                <div className={`h-48 relative bg-gradient-to-br ${quiz.color} flex items-center justify-center overflow-hidden`}>
                  {/* Decorative Circles */}
                  <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-black/5 rounded-full blur-xl" />

                  {/* Icon */}
                  <quiz.icon className="w-20 h-20 text-white drop-shadow-md transform group-hover:scale-110 transition-transform duration-500" />

                  {/* Badge */}
                  {quiz.badge && (
                    <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                      {quiz.badge}
                    </span>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">
                    {language === "zh" ? quiz.titleZh : quiz.titleEn}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                    {language === "zh" ? quiz.descZh : quiz.descEn}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                    <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      {quiz.stats}
                    </span>
                    <span className="text-rose-500 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {language === "zh" ? "开始测试" : "Start"} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* 4. Why Choose Us (SEO Content) */}
        <section className="py-12 border-t border-gray-100 mt-12 bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            {language === "zh" ? "为什么选择 Love Quiz?" : "Why Choose Love Quiz?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">{language === "zh" ? "心理学模型" : "Scientific Models"}</h3>
              <p className="text-sm text-gray-500">
                {language === "zh"
                  ? "基于斯腾伯格爱情三角理论与现代心理学研究，确保测试结果具有参考价值。"
                  : (
                    <>
                      Based on <a href="https://en.wikipedia.org/wiki/Triangular_theory_of_love" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">Sternberg's Triangular Theory of Love</a> and modern psychological research.
                    </>
                  )}
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">{language === "zh" ? "隐私保护" : "100% Private"}</h3>
              <p className="text-sm text-gray-500">
                {language === "zh"
                  ? "无需注册，无需下载。所有测试在浏览器端完成，我们绝不存储您的个人隐私数据。"
                  : "No registration, no downloads. All tests run in your browser. We never store personal data."}
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">{language === "zh" ? "完全免费" : "Always Free"}</h3>
              <p className="text-sm text-gray-500">
                {language === "zh"
                  ? "致力于提供高质量的情感分析工具，所有核心功能永久免费主要开放。"
                  : "Dedicated to providing high-quality emotional analysis tools. Core features are free forever."}
              </p>
            </div>
          </div>
        </section>

        {/* 5. FAQ Section (SEO Content) */}
        <section className="py-12 mt-8 bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                {language === "zh" ? "测试结果准确吗？" : "How accurate are the results?"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === "zh"
                  ? "我们的测试题目经过心理学团队精心设计，旨在反映您潜意识中的真实感受。虽然没有任何在线测试能做到 100% 准确，但超过 200 万用户的反馈表明，结果具有很高的参考价值，能帮助您更好地审视这段关系。"
                  : "Our questions are carefully designed by psychology enthusiasts to reflect your subconscious feelings. While no online test is 100% perfect, feedback from over 2M users suggests the results provide valuable insights to help you reflect on your relationship."}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                {language === "zh" ? "需要付费才能看结果吗？" : "Do I need to pay to see results?"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === "zh"
                  ? "不需要。我们的核心测试完全免费。我们通过页面上的少量广告来维持服务器运行，感谢您的理解与支持。"
                  : "No. Our core tests are completely free. We support our server costs through unobtrusive ads on the page. Thank you for your support."}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                {language === "zh" ? "我会收到垃圾邮件吗？" : "Will I receive spam?"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === "zh"
                  ? "绝对不会。我们甚至不要求您输入邮箱地址。一切体验都是即用即走的。"
                  : "Absolutely not. We don't even ask for your email address. The experience is completely anonymous."}
              </p>
            </div>
          </div>
        </section>

        {/* 6. Extensive SEO Content (About Love & Psychology) */}
        <section className="py-12 mt-8 mb-12 bg-white rounded-3xl p-8 shadow-sm">
          <div className="">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === "zh" ? "探索真爱的心理学奥秘" : "Exploring the Psychology of True Love"}
            </h2>

            <div className="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base">
              <p>
                {language === "zh"
                  ? "在这个快节奏的现代社会，我们常常被各种复杂的情绪所困扰。当你问自己“我到底有多喜欢他？”或者“这仅仅是一时的冲动吗？”时，你其实正在寻求一种确定的答案。我们的 **Love Quiz 情感测试平台**正是为此而生。不同于市面上娱乐性质的星座占卜，我们致力于将严肃的心理学理论转化为直观、易懂的在线测试工具。"
                  : "In our fast-paced modern society, we are often overwhelmed by complex emotions. When you ask yourself 'How much do I really love him?' or 'Is this just a fleeting crush?', you are seeking certainty. **Love Quiz** was created for this purpose. Unlike entertainment-focused horoscopes, we bridge the gap between serious psychological theory and accessible online tools."}
              </p>

              <h3 className="font-bold text-gray-800 text-lg mt-4">
                {language === "zh" ? "基于斯腾伯格爱情三角理论" : "Based on Sternberg's Triangular Theory of Love"}
              </h3>
              <p>
                {language === "zh"
                  ? "美国心理学家罗伯特·斯腾伯格（Robert Sternberg）提出的爱情三角理论是现代亲密关系研究的基石。该理论认为，完美的爱情由三个核心元素组成：**亲密（Intimacy）**、**激情（Passion）**和**承诺（Commitment）**。我们的“深度情感测试”正是基于这一模型设计的。通过分析你在面对特定情境时的潜意识反应（例如：你会多频繁地想到他？你是否愿意为了他牺牲个人利益？），我们能够量化这三个维度的强度，从而判断你当前的情感类型——是注定短暂的“迷恋”，还是细水长流的“伴侣之爱”，亦或是人人向往的“完美之爱”。"
                  : "Proposed by psychologist Robert Sternberg, the Triangular Theory of Love is a cornerstone of relationship science. It posits that love consists of three components: **Intimacy**, **Passion**, and **Commitment**. Our deep analysis quiz measures the strength of these dimensions through your subconscious reactions to specific scenarios, helping you identify if you are experiencing a fleeting **Infatuation**, stable **Compassionate Love**, or the ideal **Consummate Love**."}
              </p>

              <h3 className="font-bold text-gray-800 text-lg mt-4">
                {language === "zh" ? "为什么我们需要情感测试？" : "Why Do We Need Relationship Tests?"}
              </h3>
              <p>
                {language === "zh"
                  ? "许多人在感情中容易“当局者迷”。自我认知偏差（Self-serving Bias）往往让我们高估或低估对方在自己心中的地位。通过标准化的问卷（Standardized Questionnaire），我们能像照镜子一样客观地审视这段关系。**“他喜欢我吗？”**测试则运用了非语言沟通（Non-verbal Communication）和行为心理学原理，帮助你捕捉那些被忽略的微表情和肢体语言信号。这些科学的分析维度，能通过数据化的形式呈现，为你下一步的感情决策（表白、分手或继续相处）提供理性的参考依据。"
                  : "We are often blinded by our own biases in relationships. Self-serving bias can make us overestimate or underestimate a partner's importance. Standardized questionnaires act as a mirror, offering an objective view. Our **'Does He Like Me?'** quiz utilizes principles of non-verbal communication and behavioral psychology to decode signals you might miss. These scientific insights provide a rational basis for your next move—whether to confess, move on, or deepen the bond."}
              </p>

              <p className="mt-4 italic text-gray-500">
                {language === "zh"
                  ? "请记住，任何测试都只是辅助工具。真爱不需要完美的测试分数，但需要双方真实的面对与持续的经营。愿你在 Love Quiz 找到属于你的答案。"
                  : "Remember, no test defines your relationship perfectly. True love requires honesty and effort. We hope Love Quiz helps you find the clarity you seek."}
              </p>
            </div>
          </div>
        </section>

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Love Quiz",
              "url": "https://love.teasytools.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://love.teasytools.com/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

      </main>

      {/* Footer is already in layout.tsx, but this div ends the main page content */}
    </div>
  );
}
