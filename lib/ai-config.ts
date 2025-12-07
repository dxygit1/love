export const AI_CONFIG = {
  baseUrl: "https://apis.iflow.cn/v1",
  apiKey: "sk-18aaabe3a97b984c3602fb71ab8996f1",
  model: "qwen3-max",
  maxTokens: 150, // Increased from 20 to allow complete JSON with summary
  temperature: 0.1,
}

// 已知网站分类映射
export const KNOWN_SITES: Record<string, string> = {
}
