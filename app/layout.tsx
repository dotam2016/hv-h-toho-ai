import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FOLMO 電動バイク | Compact Electric Mobility",
  description: "株式会社TOHOが展開するコンパクト電動バイクのプレミアムブランドサイト試作。",
  openGraph: {
    title: "FOLMO 電動バイク",
    description: "街をスマートに走る、FOLMOコンパクト電動バイク。",
    images: ["/media/hero-commute-helmet.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
