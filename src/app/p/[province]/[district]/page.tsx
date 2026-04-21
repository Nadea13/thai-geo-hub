import Link from "next/link";
import hierarchy from "@/data/geo-hierarchy.json";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ province: string, district: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { province: encodedProvince, district: encodedDistrict } = await params;
  const province = decodeURIComponent(encodedProvince);
  const district = decodeURIComponent(encodedDistrict);
  
  const title = `รหัสไปรษณีย์อำเภอ${district} จังหวัด${province} - ค้นหารหัสไปรษณีย์รายตำบล`;
  const description = `ข้อมูลรหัสไปรษณีย์อำเภอ${district} จังหวัด${province} ครบทุกตำบล พร้อมรายละเอียดพิกัดภูมิศาสตร์ ค้นหาง่ายและแม่นยำ`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://thai-geo-hub.vercel.app/p/${encodedProvince}/${encodedDistrict}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    }
  };
}

export default async function DistrictPage({ params }: Props) {
  const { province: encodedProvince, district: encodedDistrict } = await params;
  const province = decodeURIComponent(encodedProvince);
  const district = decodeURIComponent(encodedDistrict);
  const provinceData = (hierarchy as any)[province];
  
  if (!provinceData) notFound();
  
  const subdistricts = provinceData.districts[district];
  if (!subdistricts) notFound();

  // JSON-LD for Breadcrumbs
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "หน้าแรก",
        "item": "https://thai-geo-hub.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": province,
        "item": `https://thai-geo-hub.vercel.app/p/${encodedProvince}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": district,
        "item": `https://thai-geo-hub.vercel.app/p/${encodedProvince}/${encodedDistrict}`
      }
    ]
  };

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
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
