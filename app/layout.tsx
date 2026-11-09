import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import IdleTimeoutProvider from "@/components/IdleTimeoutProvider";
import ScaledStage from "@/components/ScaledStage";
import { settings, timeout } from "@/data/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Museum Kiosk",
  description: "Museum Kiosk - A digital museum experience",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <ScaledStage width={settings.designWidth} height={settings.designHeight}>
          <IdleTimeoutProvider
            idleTimeoutSeconds={settings.idleTimeoutSeconds}
            warningSeconds={settings.warningSeconds}
            text={timeout}
          >
            {children}
          </IdleTimeoutProvider>
        </ScaledStage>
      </body>
    </html>
  );
}
