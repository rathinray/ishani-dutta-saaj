import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ishani Dutta — Saaj",
  description: "Bengali bridal and festive makeup artistry by Ishani Dutta."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
