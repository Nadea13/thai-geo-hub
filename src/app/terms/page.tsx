import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container" style={{ padding: "4rem 1rem", maxWidth: "800px" }}>
      <Link href="/" style={{ color: "var(--primary)" }}>← กลับหน้าหลัก</Link>
      <h1 style={{ marginTop: "2rem" }}>ข้อกำหนดการใช้งาน (Terms of Service)</h1>
      <p>ยินดีต้อนรับสู่ Thai Geo Hub โดยการใช้งานเว็บไซต์นี้คุณตกลงที่จะปฏิบัติตามข้อกำหนดดังนี้:</p>
      <ul style={{ margin: "1rem 0", paddingLeft: "2rem" }}>
        <li>ข้อมูลที่แสดงบนเว็บไซต์มีวัตถุประสงค์เพื่อการอ้างอิงเท่านั้น เราไม่รับผิดชอบต่อความผิดพลาดของข้อมูล</li>
        <li>ห้ามนำข้อมูลบนเว็บไซต์ไปใช้ในทางที่ผิดกฎหมายหรือละเมิดลิขสิทธิ์</li>
        <li>เราขอสงวนสิทธิ์ในการปรับปรุงข้อมูลและข้อกำหนดต่างๆ โดยไม่ต้องแจ้งให้ทราบล่วงหน้า</li>
      </ul>
    </div>
  );
}
