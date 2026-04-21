import Link from "next/link";
import hierarchy from "@/data/geo-hierarchy.json";
import { notFound } from "next/navigation";

export default async function ProvincePage({ params }: { params: Promise<{ province: string }> }) {
  const { province: encodedProvince } = await params;
  const province = decodeURIComponent(encodedProvince);
  const data = (hierarchy as any)[province];

  if (!data) notFound();

  const districts = Object.keys(data.districts).sort((a, b) => a.localeCompare(b, 'th'));

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">หน้าแรก</Link> / <span>{province}</span>
      </div>

      <h1>รหัสไปรษณีย์จังหวัด{province}</h1>
      <p style={{ color: "var(--secondary)", marginBottom: "2rem" }}>
        เลือกอำเภอในจังหวัด{province} เพื่อดูรหัสไปรษณีย์รายตำบล
      </p>

      <div className="grid">
        {districts.map((district) => (
          <Link key={district} href={`/p/${encodeURIComponent(province)}/${encodeURIComponent(district)}`}>
            <div className="glass-card">
              <h3 style={{ margin: 0 }}>{district}</h3>
              <span className="badge">
                {data.districts[district].length} ตำบล
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
