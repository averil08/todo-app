import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/todo-logo.svg"
      alt="logo"
      width={120}
      height={40}
      className={cn("rounded-h-6 w-auto", className)}
    />
  );
}