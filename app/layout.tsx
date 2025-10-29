import type { Metadata } from "next";
import { Inter, Fira_Mono } from "next/font/google";
import "./globals.css";


const interSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});


const firaMono = Fira_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "MetaStriker Lab",
  description: "Mejora tu juego en FC con análisis personalizado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${firaMono.variable} antialiased bg-gray-900`}
        style={{
          fontFamily: "var(--font-sans)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
