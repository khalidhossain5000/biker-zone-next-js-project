"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import TanstackProvider from "./TanstackProvider";
import { CartProvider } from "@/app/ContextApi/CartContext";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      <TanstackProvider>
        <CartProvider>
          <SessionProvider>{children}</SessionProvider>
        </CartProvider>
      </TanstackProvider>
    </NextThemesProvider>
  );
}
