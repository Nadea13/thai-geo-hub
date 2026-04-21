import Link from "next/link";
import hierarchy from "@/data/geo-hierarchy.json";
import { notFound } from "next/navigation";

export default async function DistrictPage({ params }: { params: Promise<{ province: string, district: string }> }) {
  const { province: encodedProvince, district: encodedDistrict } = await params;
  const province = decodeURIComponent(encodedProvince);
  const district = decodeURIComponent(encodedDistrict);
  const provinceData = (hierarchy as any)[province];
  
  if (!provinceData) notFound();
  
  const subdistricts = provinceData.districts[district];
  if (!subdistricts) notFound();

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">หน้าแรก</Link> / 
        <Link href={`/p/${encodeURIComponent(province)}`}>{province}</Link> / 
        <span>{district}</span>
      </div>

      <h1>รหัสไปรษณีย์อำเภอ{district}</h1>
      <p style={{ color: "var(--secondary)", marginBottom: "2rem" }}>
        ข้อมูลรหัสไปรษณีย์รายตำบลในอำเภอ{district} จังหวัด{province}
      </p>

      <div className="grid">
        {subdistricts.map((item: any, idx: number) => (
          <Link key={idx} href={`/p/${encodeURIComponent(province)}/${encodeURIComponent(district)}/${encodeURIComponent(item.subdistrict)}`}>
            <div className="glass-card">
              <h3 style={{ marginBottom: "0.5rem" }}>{item.subdistrict}</h3>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--primary)" }}>
                {item.zipcode}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
