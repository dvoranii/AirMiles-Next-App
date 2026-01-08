import { APP_NAME } from "@/lib/cross-cutting/constants";
import Image from "next/image";
import logo from "../../public/airmiles-logo.png";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex py-4 items-center">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center p-4">
            <Image
              src={logo}
              alt="Air Miles Logo"
              width={128}
              height={128}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-lg font-semibold">{APP_NAME}</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Partner Portal</span>
        </div>
      </div>
    </header>
  );
}
