import Link from "next/link";
import hierarchy from "@/data/geo-hierarchy.json";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";

export default async function SubdistrictPage({ params }: { params: Promise<{ province: string, district: string, subdistrict: string }> }) {
  const { province: encodedProvince, district: encodedDistrict, subdistrict: encodedSubdistrict } = await params;
  const province = decodeURIComponent(encodedProvince);
  const district = decodeURIComponent(encodedDistrict);
  const subdistrict = decodeURIComponent(encodedSubdistrict);
  
  const provinceData = (hierarchy as any)[province];
  if (!provinceData) notFound();
  
  const subdistricts = provinceData.districts[district];
  if (!subdistricts) notFound();
  
  const item = subdistricts.find((s: any) => s.subdistrict === subdistrict);
  if (!item) notFound();

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">หน้าแรก</Link> / 
        <Link href={`/p/${encodeURIComponent(province)}`}>{province}</Link> / 
        <Link href={`/p/${encodeURIComponent(province)}/${encodeURIComponent(district)}`}>{district}</Link> / 
        <span>{subdistrict}</span>
      </div>

      <div className="glass-card" style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem", textAlign: "center" }}>
        <AdSlot id="top-ad" label="Top Advertisement" />
        
        <span className="badge" style={{ marginBottom: "1rem" }}>ข้อมูลตำบล/แขวง</span>
        <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{subdistrict}</h1>
        <h2 style={{ color: "var(--secondary)", fontWeight: 400, marginBottom: "2rem" }}>
          อำเภอ{district} จังหวัด{province}
        </h2>

        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "2rem", 
          marginTop: "2rem",
          padding: "2rem",
          background: "var(--accent)",
          borderRadius: "1rem"
        }}>
          <div>
            <div style={{ fontSize: "0.875rem", color: "var(--secondary)" }}>รหัสไปรษณีย์</div>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--primary)" }}>{item.zipcode}</div>
          </div>
        </div>

        <div style={{ marginTop: "3rem", textAlign: "left" }}>
          <h3 style={{ borderBottom: "2px solid var(--card-border)", paddingBottom: "0.5rem" }}>พิกัดภูมิศาสตร์ (GPS)</h3>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div className="glass-card">
              <div style={{ fontSize: "0.875rem", color: "var(--secondary)" }}>Latitude</div>
              <div style={{ fontWeight: 600 }}>{item.lat || "ไม่มีข้อมูล"}</div>
            </div>
            <div className="glass-card">
              <div style={{ fontSize: "0.875rem", color: "var(--secondary)" }}>Longitude</div>
              <div style={{ fontWeight: 600 }}>{item.lng || "ไม่มีข้อมูล"}</div>
            </div>
          </div>
        </div>
        
        <AdSlot id="mid-ad" label="In-Content Ad" />

        {item.lat && item.lng && (
          <div style={{ marginTop: "2rem" }}>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card"
              style={{ display: "block", background: "var(--foreground)", color: "var(--background)", textAlign: "center", marginBottom: "1rem" }}
            >
              ดูบน Google Maps
            </a>
          </div>
        )}

        <div style={{ marginTop: "3rem", textAlign: "left" }}>
          <h3 style={{ borderBottom: "2px solid var(--card-border)", paddingBottom: "0.5rem" }}>การเดินทางและที่พัก</h3>
          <p style={{ fontSize: "0.875rem", color: "var(--secondary)", margin: "1rem 0" }}>
            กำลังวางแผนเดินทางไปที่ {subdistrict} หรือ {district} ใช่หรือไม่? ค้นหาข้อเสนอที่ดีที่สุดได้ที่นี่:
          </p>
          <div className="grid" style={{ gridTemplateColumns: "1fr", gap: "1rem" }}>
            <a 
              href={`https://www.agoda.com/search?city=${encodeURIComponent(district + " " + province)}&cid=1897000`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(90deg, #10294d, #1f4e91)", color: "white" }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>จองโรงแรมใน {district}</div>
                <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>ราคาพิเศษเฉพาะวันนี้บน Agoda</div>
              </div>
              <div style={{ fontSize: "1.5rem" }}>→</div>
            </a>
          </div>
        </div>

        <AdSlot id="bottom-ad" label="Bottom Advertisement" />
      </div>
    </div>
  );
}
