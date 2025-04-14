"use client";

import { toast as sonnerToast } from "@/components/ui/sonner";

export function useToast() {
  return {
    toast: (options: any) => sonnerToast(options), // accept object options
    dismiss: (id?: string) => sonnerToast.dismiss(id),
  };
}
