import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/modal-provider";
import { ToasterAlert } from "@/components/toaster-alert";
import { ChatProvider } from "@/components/chat-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Personal Data Assistance",
  description: "Generated AI Power Productivity App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <ChatProvider />
        <body className={cn("bg-[#d5d9e2]", inter.className)}>
          <ModalProvider />
          <ToasterAlert />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
