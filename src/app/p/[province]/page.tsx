import Link from "next/link";
import hierarchy from "@/data/geo-hierarchy.json";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import AgodaAffiliate from "@/components/AgodaAffiliate";
import { Metadata } from "next";

type Props = {
  params: Promise<{ province: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { province: encodedProvince } = await params;
  const province = decodeURIComponent(encodedProvince);
  
  const title = `รหัสไปรษณีย์จังหวัด${province} ทุกอำเภอ ทุกตำบล - Thai Geo Hub`;
  const description = `รวมรหัสไปรษณีย์จังหวัด${province} ทุกอำเภอและตำบล พร้อมข้อมูลภูมิศาสตร์ครบถ้วน ค้นหาง่าย รวดเร็ว`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://thai-geo-hub.vercel.app/p/${encodedProvince}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    }
  };
}

export default async function ProvincePage({ params }: Props) {
  const { province: encodedProvince } = await params;
  const province = decodeURIComponent(encodedProvince);
  const data = (hierarchy as any)[province];

  if (!data) notFound();

  const districts = Object.keys(data.districts).sort((a, b) => a.localeCompare(b, 'th'));

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
        <Link href="/">หน้าแรก</Link> / <span>{province}</span>
      </div>

      <h1>รหัสไปรษณีย์จังหวัด{province}</h1>
      <p style={{ color: "var(--secondary)", marginBottom: "2rem" }}>
        เลือกอำเภอในจังหวัด{province} เพื่อดูรหัสไปรษณีย์รายตำบล
      </p>

      <AdSlot adSlot="2789183587" />

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

      <AgodaAffiliate locationName={province} />
    </div>
  );
}
