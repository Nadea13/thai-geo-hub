import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ค้นหารหัสไปรษณีย์และข้อมูลภูมิศาสตร์ประเทศไทย | Thai Geo Hub",
  description: "ระบบค้นหารหัสไปรษณีย์ จังหวัด อำเภอ ตำบล และพิกัด GPS ทั่วประเทศไทย ใช้งานง่าย รวดเร็ว และแม่นยำ",
  keywords: ["รหัสไปรษณีย์", "ประเทศไทย", "จังหวัด", "อำเภอ", "ตำบล", "พิกัด GPS", "Geography Thailand"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <main>
          {children}
        </main>
        <footer className="footer container">
          <p>© {new Date().getFullYear()} Thai Geo Hub - ข้อมูลรหัสไปรษณีย์ประเทศไทย</p>
          <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Link href="/privacy">นโยบายความเป็นส่วนตัว</Link>
            <Link href="/terms">ข้อกำหนดการใช้งาน</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
