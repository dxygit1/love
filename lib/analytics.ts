declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_ID = "G-80MFW8WQKM";

export const pageview = (url: string) => {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("config", GA_ID, { page_path: url });
};

export const event = (action: string, params?: Record<string, unknown>) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
};

export const quizStart = (quizType: string) => {
  event("quiz_start", { quiz_type: quizType });
};

export const quizComplete = (quizType: string) => {
  event("quiz_complete", { quiz_type: quizType });
};
