"use client";

import { toast } from "@/components/ui/sonner";

export function useToast() {
  return {
    toast: (message: string, options?: any) => toast(message, options),
    dismiss: (id?: string) => toast.dismiss(id),
  };
}
