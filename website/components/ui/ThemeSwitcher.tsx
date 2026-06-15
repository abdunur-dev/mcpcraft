"use client";

import { useState, useEffect } from "react";

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    }
  }, []);

  function applyTheme(t: "dark" | "light") {
    document.documentElement.setAttribute("data-theme", t);
    document.documentElement.style.colorScheme = t;
    document.documentElement.classList.toggle("dark", t === "dark");
    localStorage.setItem("theme", t);
  }

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggle}
      className="relative w-14 h-7 rounded-full border border-white/10 bg-[#0a0a0a] transition-colors duration-200 shrink-0"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5.5 h-5.5 rounded-full bg-white transition-transform duration-200 flex items-center justify-center"
        style={{
          transform: theme === "light" ? "translateX(28px)" : "translateX(0)",
        }}
      >
        {theme === "dark" ? (
          <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
        ) : (
          <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
        )}
      </span>
    </button>
  );
}
