import Link from "next/link";
import Search from "@/components/Search";
import hierarchy from "@/data/geo-hierarchy.json";

export default function Home() {
  const provinces = Object.keys(hierarchy).sort((a, b) => a.localeCompare(b, 'th'));

  // JSON-LD for Website search
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Thai Geo Hub",
    "url": "https://thai-geo-hub.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://thai-geo-hub.vercel.app/api/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      
      <section className="hero">
        <h1>Thai Geo Hub: ค้นหารหัสไปรษณีย์และพิกัดภูมิศาสตร์</h1>
        <p>รวบรวมข้อมูลรหัสไปรษณีย์ทั่วประเทศไทย ครบทุกจังหวัด อำเภอ และตำบล พร้อมพิกัด GPS แม่นยำ</p>
        <div style={{ marginTop: "2rem" }}>
          <Search />
        </div>
      </section>

      <section style={{ margin: "4rem 0", background: "var(--accent)", padding: "2rem", borderRadius: "1rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>ทำไมต้องใช้ Thai Geo Hub?</h2>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem" }}>📍 ข้อมูลครบถ้วน</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--secondary)" }}>มีข้อมูลครบทั้ง 77 จังหวัด ทั่วประเทศไทย อัปเดตล่าสุด</p>
          </div>
          <div>
            <h3 style={{ fontSize: "1.1rem" }}>🔍 ค้นหาง่าย</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--secondary)" }}>ระบบค้นหาที่ชาญฉลาด ช่วยให้คุณหารหัสไปรษณีย์ได้ในไม่กี่วินาที</p>
          </div>
          <div>
            <h3 style={{ fontSize: "1.1rem" }}>🌐 พิกัด GPS</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--secondary)" }}>ไม่ใช่แค่รหัสไปรษณีย์ แต่เรายังมี Latitude และ Longitude สำหรับนักพัฒนาและนักเดินทาง</p>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>เลือกค้นหารายจังหวัด</h2>
        <div className="grid">
          {provinces.map((province) => (
            <Link key={province} href={`/p/${encodeURIComponent(province)}`}>
              <div className="glass-card" style={{ textAlign: "center" }}>
                <h3 style={{ margin: 0 }}>{province}</h3>
                <span className="badge">
                  {Object.keys((hierarchy as any)[province].districts).length} อำเภอ
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "4rem", textAlign: "center", opacity: 0.8 }}>
        <p style={{ fontSize: "0.875rem" }}>
          Thai Geo Hub เป็นเครื่องมือออนไลน์ที่ช่วยให้การส่งพัสดุและการค้นหาที่อยู่เป็นเรื่องง่าย <br/>
          รองรับการใช้งานทั้งบนมือถือและคอมพิวเตอร์ ตลอด 24 ชั่วโมง
        </p>
      </section>
    </div>
  );
}
