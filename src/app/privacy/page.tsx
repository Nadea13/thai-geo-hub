import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: "4rem 1rem", maxWidth: "800px" }}>
      <Link href="/" style={{ color: "var(--primary)" }}>← กลับหน้าหลัก</Link>
      <h1 style={{ marginTop: "2rem" }}>นโยบายความเป็นส่วนตัว (Privacy Policy)</h1>
      <p>เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ ข้อมูลที่เราเก็บรวบรวมประกอบด้วย:</p>
      <ul style={{ margin: "1rem 0", paddingLeft: "2rem" }}>
        <li>ข้อมูลคุกกี้เพื่อปรับปรุงประสบการณ์การใช้งาน</li>
        <li>ข้อมูลการเข้าชมเว็บไซต์เพื่อการวิเคราะห์ทางสถิติ (Google Analytics)</li>
        <li>การแสดงโฆษณาจากบุคคลที่สาม (Google AdSense)</li>
      </ul>
      <p>เราไม่มีการเก็บข้อมูลส่วนบุคคล เช่น ชื่อ ที่อยู่ หรือเบอร์โทรศัพท์ ของผู้ใช้งานโดยตรงผ่านเว็บไซต์นี้</p>
    </div>
  );
}
