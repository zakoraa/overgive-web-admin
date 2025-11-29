"use client";

import { queryClient } from "@/core/lib/react-query";
import { GetCurrentUserProvider } from "@/modules/auth/hooks/use-get-current-user";
import { QueryClientProvider } from "@tanstack/react-query";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GetCurrentUserProvider>{children}</GetCurrentUserProvider>
    </QueryClientProvider>
  );
}
