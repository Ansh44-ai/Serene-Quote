"use client";

import { cn } from "@/lib/utils";

export function AdPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full min-h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50 text-center text-muted-foreground",
        className
      )}
    >
      <p className="text-sm">Advertisement</p>
    </div>
  );
}
