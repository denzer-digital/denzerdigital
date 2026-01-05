"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ContactDialogProvider } from "@/contexts/ContactDialogContext";
import { GTMPageView } from "@/components/GTMPageView";
import { ReactNode, useState, useEffect } from "react";
import { saveUTMs } from "@/lib/utmHelper";

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  // Captura UTMs quando o componente monta (executa uma única vez)
  useEffect(() => {
    saveUTMs();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ContactDialogProvider>
        <TooltipProvider>
          <GTMPageView />
          <ShadcnToaster />
          <SonnerToaster />
          {children}
        </TooltipProvider>
      </ContactDialogProvider>
    </QueryClientProvider>
  );
}

