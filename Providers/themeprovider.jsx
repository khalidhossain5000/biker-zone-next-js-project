"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>
    <SessionProvider>
    {children}</SessionProvider></NextThemesProvider>;
}
