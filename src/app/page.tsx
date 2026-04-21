import Link from "next/link";
import Search from "@/components/Search";
import hierarchy from "@/data/geo-hierarchy.json";

export default function Home() {
  const provinces = Object.keys(hierarchy).sort((a, b) => a.localeCompare(b, 'th'));

  return (
    <div className="container">
      <section className="hero">
        <h1>Thai Geo Hub</h1>
        <p>ค้นหารหัสไปรษณีย์และพิกัดภูมิศาสตร์ทั่วประเทศไทย</p>
        <div style={{ marginTop: "2rem" }}>
          <Search />
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
    </div>
  );
}
