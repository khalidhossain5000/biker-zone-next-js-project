"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      size="icon"
      className="flex items-center justify-center w-12 h-12 p-3 rounded-full transition-colors border-1 border-yellow-300 cursor-pointer"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Moon className="w-6 h-6 text-white transition-transform duration-300" />
      ) : (
        <Sun className="w-6 h-6 text-black transition-transform duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
