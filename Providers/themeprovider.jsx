"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import TanstackProvider from "./TanstackProvider";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      <TanstackProvider>
      <SessionProvider>{children}</SessionProvider>
      </TanstackProvider>
    </NextThemesProvider>
  );
}
