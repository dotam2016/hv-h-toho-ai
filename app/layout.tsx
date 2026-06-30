import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TOHO 電動バイク | Compact Electric Mobility",
  description: "株式会社TOHOが展開するコンパクト電動バイクのプレミアムブランドサイト試作。",
  openGraph: {
    title: "TOHO 電動バイク",
    description: "街をもっと軽くする、折りたたみ式コンパクト電動モビリティ。",
    images: ["/media/city-ride.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
