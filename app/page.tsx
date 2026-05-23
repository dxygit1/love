export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">服务器维护公告</h1>

        <p className="text-gray-600 leading-relaxed mb-6">
          由于最近访问流量激增，服务器资源暂时无法承载，我们正在进行优化调整。请您先通过以下临时地址访问使用：
        </p>

        <a
          href="http://47.104.247.159/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors mb-6"
        >
          访问临时地址
        </a>

        <div className="border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500 mb-3">如有问题或建议，欢迎联系我们：</p>
          <div className="space-y-2 text-sm text-gray-700">
            <p>邮箱：<a href="mailto:dxysy1@gmail.com" className="text-rose-500 hover:underline">dxysy1@gmail.com</a></p>
            <p>QQ：960896265</p>
            <p>QQ邮箱：<a href="mailto:960896265@qq.com" className="text-rose-500 hover:underline">960896265@qq.com</a></p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-8">感谢您的支持</p>
      </div>
    </div>
  );
}
