import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { AppThemeProvider } from "./theme-provider";
import { RouterProvider } from "./router-provider";
import { ToastProvider } from "./toast-provider";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <RouterProvider>
      <QueryProvider>
        <AppThemeProvider>
          {children}
          <ToastProvider />
        </AppThemeProvider>
      </QueryProvider>
    </RouterProvider>
  );
};
