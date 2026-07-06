"use client";

import { useEffect, useRef } from "react";

export function AdsterraNativeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if the script is already added to document
    const scriptSrc = "https://blakeunwanted.com/bdfccc9670610356cd1b686b21e03f38/invoke.js";
    let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = scriptSrc;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-6 overflow-hidden">
      <div 
        id="container-bdfccc9670610356cd1b686b21e03f38" 
        ref={containerRef}
        className="w-full max-w-4xl min-h-[100px]"
      />
    </div>
  );
}
