import Link from "next/link";
import hierarchy from "@/data/geo-hierarchy.json";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import AgodaAffiliate from "@/components/AgodaAffiliate";
import { Metadata } from "next";

type Props = {
  params: Promise<{ province: string, district: string, subdistrict: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { province: encodedProvince, district: encodedDistrict, subdistrict: encodedSubdistrict } = await params;
  const province = decodeURIComponent(encodedProvince);
  const district = decodeURIComponent(encodedDistrict);
  const subdistrict = decodeURIComponent(encodedSubdistrict);
  
  const title = `รหัสไปรษณีย์ ${subdistrict} อำเภอ${district} จังหวัด${province} - ข้อมูลพิกัด GPS`;
  const description = `ค้นหารหัสไปรษณีย์ ${subdistrict} อำเภอ${district} จังหวัด${province} พร้อมข้อมูลพิกัดภูมิศาสตร์ Latitude Longitude และแผนที่การเดินทาง`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://thai-geo-hub.vercel.app/p/${encodedProvince}/${encodedDistrict}/${encodedSubdistrict}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    }
  };
}

export default async function SubdistrictPage({ params }: Props) {
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

  // JSON-LD for Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": subdistrict,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": subdistrict,
      "addressRegion": province,
      "postalCode": item.zipcode,
      "addressCountry": "TH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": item.lat,
      "longitude": item.lng
    }
  };

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="breadcrumb">
        <Link href="/">หน้าแรก</Link> / 
        <Link href={`/p/${encodeURIComponent(province)}`}>{province}</Link> / 
        <Link href={`/p/${encodeURIComponent(province)}/${encodeURIComponent(district)}`}>{district}</Link> / 
        <span>{subdistrict}</span>
      </div>

      <div className="glass-card" style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem", textAlign: "center" }}>
        <AdSlot adSlot="2789183587" />
        
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
        
        <AdSlot adSlot="2789183587" />

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

        <AgodaAffiliate locationName={`${district}, ${province}`} />

        <AdSlot adSlot="2789183587" />
      </div>
    </div>
  );
}
