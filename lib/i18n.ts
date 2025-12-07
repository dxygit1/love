export type Locale = "zh" | "en"

export const translations = {
  zh: {
    // Navigation
    nav: {
      features: "功能特性",
      pricing: "定价",
      testimonials: "用户评价",
      faq: "常见问题",
      contact: "联系我们",
      login: "登录",
      getStarted: "开始使用",
      dashboard: "控制台",
    },

    // Hero
    hero: {
      badge: "AI 驱动的书签管理",
      title: "智能书签管理",
      titleHighlight: "让收藏更有序",
      description: "添加任意网址，AI 自动分析内容并智能分类。告别杂乱无章的书签，让每一个收藏都触手可及。",
      cta: "免费开始使用",
      secondaryCta: "了解更多",
    },

    // Stats
    stats: {
      bookmarks: "书签已分类",
      accuracy: "分类准确率",
      users: "活跃用户",
      categories: "智能分类",
    },

    // Features
    features: {
      title: "强大功能",
      subtitle: "让书签管理变得前所未有的简单",
      items: [
        {
          title: "AI 智能分类",
          description: "自动识别网站类型，智能归类到对应文件夹",
        },
        {
          title: "闪电搜索",
          description: "全文搜索，快速找到任何书签",
        },
        {
          title: "云端同步",
          description: "数据实时同步，随时随地访问",
        },
        {
          title: "浏览器扩展 🚀",
          description: "一键保存、搜索结果集成，浏览更便捷（即将推出）",
        },
        {
          title: "批量导入导出",
          description: "支持从其他工具导入，一键导出备份",
        },
        {
          title: "多语言支持",
          description: "支持中英文界面，满足不同需求",
        },
      ],
    },

    // Use Cases
    cases: {
      title: "使用场景",
      subtitle: "适用于各种工作和生活场景",
      items: [
        {
          title: "开发者",
          description: "技术文档、GitHub 项目、Stack Overflow 答案，自动归类到技术分类",
        },
        {
          title: "设计师",
          description: "设计灵感、Dribbble 作品、配色方案，轻松管理创意资源",
        },
        {
          title: "研究者",
          description: "论文文献、学术资源、参考资料，高效组织研究内容",
        },
        {
          title: "营销人员",
          description: "竞品分析、市场报告、工具平台，助力业务增长",
        },
      ],
    },

    // Pricing
    // Pricing
    pricing: {
      title: "早鸟预售",
      subtitle: "以超低价格获取终身会员。限时优惠。",
      monthly: "月付",
      yearly: "年付",
      save: "省 20%",
      plans: [
        {
          name: "免费版",
          price: "¥0",
          period: "/永久",
          description: "适合个人轻度使用",
          features: ["每月 30 次 AI 智能分类", "100 个书签限制", "基础搜索", "浏览器扩展 (基础版)"],
          cta: "免费开始",
          popular: false,
        },
        {
          name: "终身专业版",
          price: "¥199",
          period: "/终身",
          description: "高性价比之选",
          features: [
            "每月 3,000 次 AI 智能分类",
            "无限书签存储",
            "🔍 搜索伴侣 (Google/百度集成)",
            "📝 智能摘要",
            "⚡️ 一键快存",
            "优先技术支持",
          ],
          cta: "加入等待列表",
          popular: true,
        },
        {
          name: "终身尊享版",
          price: "¥399",
          period: "/终身",
          description: "发烧友的极致体验",
          features: [
            "每月 10,000 次 AI 智能分类",
            "无限书签存储",
            "包含专业版全部功能",
            "🚀 优先体验新功能 (Beta)",
            "👑 专属客服通道",
            "支持者徽章",
          ],
          cta: "加入等待列表",
          popular: false,
        },
      ],
    },

    // Testimonials
    testimonials: {
      title: "用户评价",
      subtitle: "来自全球用户的真实反馈，AI Bookmark 已成为提升效率的必备工具",
      items: [
        {
          content: "AI Bookmark 让我的收藏效率提升了10倍，再也不用担心找不到链接了。分类准确率非常高！",
          author: "David Z.",
          role: "全栈工程师",
          company: "大型互联网公司",
        },
        {
          content: "作为设计师，我每天都要收藏大量灵感素材。现在 AI 自动分类后，查找资料方便太多了。",
          author: "李女士",
          role: "UI 设计师",
          company: "知名设计工作室",
        },
        {
          content: "团队共享功能很实用，项目资料统一管理，协作效率大大提高。强烈推荐！",
          author: "陈工",
          role: "技术负责人",
          company: "独角兽企业",
        },
        {
          content: "以前收藏的链接根本找不到，现在 AI 自动分类后，效率提升太多了！客服响应也很及时。",
          author: "王先生",
          role: "产品经理",
          company: "头部科技公司",
        },
        {
          content: "作为独立开发者，这个工具帮我节省了大量整理时间。界面简洁，功能强大。",
          author: "Sarah L.",
          role: "独立开发者",
          company: "iOS 专家",
        },
        {
          content: "学术研究需要收集大量文献资料，AI Bookmark 让我的资料管理变得井井有条。",
          author: "赵同学",
          role: "博士研究生",
          company: "985高校",
        },
      ],
    },

    // FAQ
    faq: {
      title: "常见问题",
      subtitle: "还有疑问？我们来解答",
      items: [
        {
          question: "AI 分类准确吗？",
          answer: "我们的 AI 模型经过大量数据训练，分类准确率超过 95%。同时支持手动调整分类。",
        },
        {
          question: "数据安全吗？",
          answer: "所有数据均使用行业标准加密存储，我们不会查看或分享你的书签数据。",
        },
        {
          question: "支持哪些浏览器？",
          answer: "支持 Chrome、Firefox、Edge、Safari 等主流浏览器扩展。",
        },
        {
          question: "可以导入现有书签吗？",
          answer: "专业版支持从浏览器批量导入书签，并自动进行 AI 分类。",
        },
        {
          question: "免费版有什么限制？",
          answer: "免费版最多支持 100 个书签，足够轻度使用。升级专业版可享受无限书签。",
        },
      ],
    },

    // Contact
    contact: {
      title: "联系我们",
      subtitle: "有任何问题？随时联系我们",
      form: {
        name: "姓名",
        email: "邮箱",
        message: "留言",
        submit: "发送消息",
        sending: "发送中...",
        success: "消息已发送！",
      },
      info: {
        email: "support@aibookmark.com",
        twitter: "https://x.com/OwenDong_sy",
        twitterHandle: "@OwenDong_sy",
      },
    },

    // Auth
    auth: {
      login: "登录",
      register: "注册",
      email: "邮箱",
      password: "密码",
      confirmPassword: "确认密码",
      forgotPassword: "忘记密码？",
      noAccount: "还没有账号？",
      hasAccount: "已有账号？",
      orContinueWith: "或使用以下方式",
      google: "使用 Google 登录",
      loginSuccess: "登录成功",
      registerSuccess: "注册成功",
      loggingIn: "登录中...",
      registering: "注册中...",
    },

    // Footer
    footer: {
      description: "AI 驱动的智能书签管理工具",
      product: "产品",
      company: "公司",
      legal: "法律",
      about: "关于我们",
      contact: "联系我们",
      terms: "服务条款",
      privacy: "隐私政策",
      copyright: "© 2025 AI Bookmark. 保留所有权利。",
    },

    // Dashboard (existing)
    aiSmartClassify: "AI 智能分类",
    smartBookmarkManager: "智能书签管理",
    subtitle: "添加网址，让 AI 自动为你分类整理",
    addBookmark: "添加书签",
    title: "标题",
    titlePlaceholder: "网站标题（选填）",
    url: "网址",
    urlPlaceholder: "https://example.com",
    group: "分组",
    groupPlaceholder: "点击 AI 识别 自动分类，或手动输入",
    aiClassify: "AI 识别",
    classifying: "识别中...",
    save: "保存书签",
    cancel: "取消",
    urlRequired: "请先输入网址",
    classifyFailed: "识别失败，请手动输入分组",
    enterUrl: "请输入网址",
    myBookmarks: "我的书签",
    allBookmarks: "全部书签",
    recentlyAdded: "最近添加",
    items: "个",
    noBookmarks: "暂无书签",
    addFirstBookmark: "添加你的第一个书签吧",
    uncategorized: "未分类",
    openLink: "打开链接",
    deleteBookmark: "删除书签",
    favorites: "收藏夹",
    trash: "回收站",
    restore: "恢复",
    deletePermanently: "永久删除",
    addToFavorites: "添加收藏",
    removeFromFavorites: "取消收藏",
    noDescription: "暂无描述",
    theme: "主题",
    light: "浅色",
    dark: "深色",
    system: "跟随系统",
    language: "语言",
    searchPlaceholder: "搜索标签...",

    // Add Bookmark Dialog
    addDialog: {
      title: "添加新书签",
      description: "粘贴网址，让 AI 为你自动整理",
      supported: "支持: GitHub, Twitter, YouTube, Bilibili, and more...",
      analyze: "智能分析",
      analyzingTitle: "AI 正在分析中...",
      analyzingDesc: "正在提取内容、生成摘要并预测分类",
      summary: "摘要",
      noSummary: "暂无摘要",
      smartGrouping: "智能分组",
      back: "返回",
      confirmSave: "确认并保存",
      loginRequired: "请先登录",
    },

    // Tech Stack
    techStack: {
      title: "基于现代技术栈构建",
    },

    // Beta Banner
    betaBanner: {
      text: "🚀 AI Bookmark 目前处于 Beta 阶段，完全免费！立即体验。",
      link: "开始使用",
    },
  },
  en: {
    // Navigation
    nav: {
      features: "Features",
      pricing: "Pricing",
      testimonials: "Testimonials",
      faq: "FAQ",
      contact: "Contact",
      login: "Login",
      getStarted: "Get Started",
      dashboard: "Dashboard",
    },

    // Hero
    hero: {
      badge: "AI-Powered Bookmark Management",
      title: "Smart Bookmark Manager",
      titleHighlight: "Organized Collections",
      description:
        "Add any URL and let AI automatically analyze and categorize it. Say goodbye to messy bookmarks and make every save easily accessible.",
      cta: "Get Started Free",
      secondaryCta: "Learn More",
    },

    // Stats
    stats: {
      bookmarks: "Bookmarks Classified",
      accuracy: "Classification Accuracy",
      users: "Active Users",
      categories: "Smart Categories",
    },

    // Features
    features: {
      title: "Powerful Features",
      subtitle: "Making bookmark management easier than ever",
      items: [
        {
          title: "AI Smart Classification",
          description: "Auto-detect website type and intelligently organize into folders",
        },
        {
          title: "Lightning Fast Search",
          description: "Full-text search, find any bookmark instantly",
        },
        {
          title: "Cloud Sync",
          description: "Real-time data sync, access anywhere, anytime",
        },
        {
          title: "Browser Extension 🚀",
          description: "One-click save, search integration, browse smarter (Coming soon)",
        },
        {
          title: "Batch Import/Export",
          description: "Import from other tools, export with one click",
        },
        {
          title: "Multi-language Support",
          description: "Chinese and English interfaces, fits different needs",
        },
      ],
    },

    // Use Cases
    cases: {
      title: "Use Cases",
      subtitle: "Perfect for work and life scenarios",
      items: [
        {
          title: "Developers",
          description: "Tech docs, GitHub projects, Stack Overflow answers, auto-categorized",
        },
        {
          title: "Designers",
          description: "Design inspiration, Dribbble works, color schemes, easily managed",
        },
        {
          title: "Researchers",
          description: "Papers, academic resources, references, efficiently organized",
        },
        {
          title: "Marketers",
          description: "Competitor analysis, market reports, tool platforms, boost growth",
        },
      ],
    },

    // Pricing
    pricing: {
      title: "Early Bird Pre-order",
      subtitle: "Get lifetime access at a fraction of the price. Limited time offer.",
      monthly: "Monthly",
      yearly: "Yearly",
      save: "Save 20%",
      plans: [
        {
          name: "Free",
          price: "$0",
          period: "/forever",
          description: "For personal light use",
          features: ["30 AI Classifications / mo", "100 Bookmarks Limit", "Basic Search", "Browser Extension (Basic)"],
          cta: "Get Started Free",
          popular: false,
        },
        {
          name: "Lifetime Pro",
          price: "$29.9",
          period: "/lifetime",
          description: "Best Value",
          features: [
            "3,000 AI Classifications / mo",
            "Unlimited Bookmarks",
            "🔍 Search Companion",
            "📝 Smart Summary",
            "⚡️ One-click Save",
            "Priority Support",
          ],
          cta: "Join Waitlist",
          popular: true,
        },
        {
          name: "Lifetime Ultra",
          price: "$59.9",
          period: "/lifetime",
          description: "For Power Users",
          features: [
            "10,000 AI Classifications / mo",
            "Unlimited Bookmarks",
            "All Pro Features",
            "🚀 Early Access to New Features",
            "👑 Dedicated Support",
            "Supporter Badge",
          ],
          cta: "Join Waitlist",
          popular: false,
        },
      ],
    },

    // Testimonials
    testimonials: {
      title: "What Our Users Say",
      subtitle: "Real feedback from users worldwide. AI Bookmark has become an essential productivity tool",
      items: [
        {
          content:
            "AI Bookmark boosted my saving efficiency 10x. Never worry about losing links again. Classification accuracy is impressive!",
          author: "David Z.",
          role: "Full Stack Engineer",
          company: "Major Tech Company",
        },
        {
          content:
            "As a designer, I save tons of inspiration daily. AI auto-categorization makes finding resources so much easier.",
          author: "Emily W.",
          role: "UI Designer",
          company: "Design Studio",
        },
        {
          content:
            "Team sharing feature is super useful. Unified project resource management, collaboration efficiency greatly improved!",
          author: "Mr. Chen",
          role: "Tech Lead",
          company: "Unicorn Startup",
        },
        {
          content:
            "I could never find my saved links before. Now with AI auto-categorization, my productivity has skyrocketed! Support is responsive too.",
          author: "Mr. Wang",
          role: "Product Manager",
          company: "Top Tech Company",
        },
        {
          content:
            "As an indie developer, this tool saves me tons of organizing time. Clean interface, powerful features.",
          author: "Sarah L.",
          role: "Indie Developer",
          company: "iOS Expert",
        },
        {
          content:
            "Academic research requires collecting lots of references. AI Bookmark keeps my materials perfectly organized.",
          author: "Alex S.",
          role: "PhD Candidate",
          company: "Top University",
        },
      ],
    },

    // FAQ
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Got questions? We have answers",
      items: [
        {
          question: "How accurate is the AI classification?",
          answer:
            "Our AI model is trained on extensive data with over 95% accuracy. Manual adjustments are also supported.",
        },
        {
          question: "Is my data secure?",
          answer: "All data is encrypted using industry standards. We never view or share your bookmark data.",
        },
        {
          question: "Which browsers are supported?",
          answer: "We support Chrome, Firefox, Edge, Safari and other major browser extensions.",
        },
        {
          question: "Can I import existing bookmarks?",
          answer: "Pro version supports bulk import from browsers with automatic AI classification.",
        },
        {
          question: "What are the Free plan limitations?",
          answer: "Free plan supports up to 100 bookmarks, enough for casual use. Upgrade to Pro for unlimited.",
        },
      ],
    },

    // Contact
    contact: {
      title: "Contact Us",
      subtitle: "Have questions? We'd love to hear from you",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send Message",
        sending: "Sending...",
        success: "Message sent!",
      },
      info: {
        email: "support@aibookmark.com",
        twitter: "https://x.com/OwenDong_sy",
        twitterHandle: "@OwenDong_sy",
      },
    },

    // Auth
    auth: {
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      orContinueWith: "Or continue with",
      google: "Continue with Google",
      loginSuccess: "Login successful",
      registerSuccess: "Registration successful",
      loggingIn: "Logging in...",
      registering: "Registering...",
    },

    // Footer
    footer: {
      description: "AI-powered smart bookmark management tool",
      product: "Product",
      company: "Company",
      legal: "Legal",
      about: "About Us",
      contact: "Contact",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      copyright: "© 2025 AI Bookmark. All rights reserved.",
    },

    // Dashboard (existing)
    aiSmartClassify: "AI Smart Classify",
    smartBookmarkManager: "Smart Bookmark Manager",
    subtitle: "Add URLs and let AI automatically categorize them",
    addBookmark: "Add Bookmark",
    title: "Title",
    titlePlaceholder: "Website title (optional)",
    url: "URL",
    urlPlaceholder: "https://example.com",
    group: "Group",
    groupPlaceholder: "Click AI Classify or enter manually",
    aiClassify: "AI Classify",
    classifying: "Classifying...",
    save: "Save Bookmark",
    cancel: "Cancel",
    urlRequired: "Please enter a URL first",
    classifyFailed: "Classification failed, please enter manually",
    enterUrl: "Please enter a URL",
    myBookmarks: "My Bookmarks",
    allBookmarks: "All Bookmarks",
    recentlyAdded: "Recently Added",
    items: "items",
    noBookmarks: "No bookmarks yet",
    addFirstBookmark: "Add your first bookmark",
    uncategorized: "Uncategorized",
    openLink: "Open link",
    deleteBookmark: "Delete bookmark",
    favorites: "Favorites",
    trash: "Trash",
    restore: "Restore",
    deletePermanently: "Delete permanently",
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
    noDescription: "No description available.",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    language: "Language",
    searchPlaceholder: "Search tags...",

    // Add Bookmark Dialog
    addDialog: {
      title: "Add New Bookmark",
      description: "Paste a URL and let AI organize it for you",
      supported: "Supports: GitHub, Twitter, YouTube, Bilibili, and more...",
      analyze: "Analyze",
      analyzingTitle: "AI Analysis in Progress...",
      analyzingDesc: "Extracting content, generating summary, and predicting tags",
      summary: "Summary",
      noSummary: "No summary generated",
      smartGrouping: "Smart Grouping",
      back: "Back",
      confirmSave: "Confirm & Save",
      loginRequired: "Login required",
    },

    // Tech Stack
    techStack: {
      title: "Built with modern technologies",
    },

    // Beta Banner
    betaBanner: {
      text: "🚀 AI Bookmark is currently in Beta and 100% Free! Try it now.",
      link: "Get Started",
    },
  },
} as const

export type TranslationKey = keyof typeof translations.zh
