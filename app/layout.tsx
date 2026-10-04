import type { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { FluxThemeProvider } from "@/components/providers/FluxThemeProvider";
import { DeviceViewProvider } from "@/components/providers/DeviceViewProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { FavoritesProvider } from "@/components/providers/FavoritesProvider";
import { DeviceViewContainer } from "@/components/layout/DeviceViewContainer";

export const metadata: Metadata = {
  title: "BRKExperiments — Hardware Lab, IoT Projects & Shorts AI Agent",
  description:
    "Official BRKExperiments Hardware Engineering Lab created by Balaram. Production-tested Arduino, ESP32, ESP8266, RP2040 Pico & STM32 projects, full C++ firmware sketches, wiring schematics, and embedded YouTube Shorts AI Hardware Expander.",
  keywords: [
    "BRKExperiments",
    "Balaram",
    "Arduino projects",
    "ESP32 IoT",
    "microcontroller circuits",
    "YouTube Shorts AI",
    "hardware marketplace",
    "schematics",
    "circuit diagrams",
    "firmware code",
  ],
  authors: [{ name: "Balaram • BRKExperiments" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#050508] text-neutral-100 flex flex-col antialiased selection:bg-cyan-500/30 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <FluxThemeProvider>
            <AuthProvider>
              <FavoritesProvider>
                <DeviceViewProvider>
                  <DeviceViewContainer>{children}</DeviceViewContainer>
                </DeviceViewProvider>
              </FavoritesProvider>
            </AuthProvider>
          </FluxThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
