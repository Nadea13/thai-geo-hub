"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SearchResult {
  province: string;
  district: string;
  subdistrict: string;
  zipcode: string;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 1) {
        setLoading(true);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const data = await res.json();
          setResults(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <input
        type="text"
        className="search-input"
        placeholder="พิมพ์ชื่อตำบล อำเภอ จังหวัด หรือรหัสไปรษณีย์..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {loading && (
        <div style={{ marginTop: "1rem", color: "var(--secondary)" }}>กำลังค้นหา...</div>
      )}

      {results.length > 0 && (
        <div 
          className="glass-card" 
          style={{ 
            position: "absolute", 
            top: "100%", 
            left: 0, 
            right: 0, 
            zIndex: 10, 
            marginTop: "0.5rem",
            maxHeight: "400px",
            overflowY: "auto",
            padding: "0.5rem"
          }}
        >
          {results.map((item, idx) => (
            <Link 
              key={idx} 
              href={`/p/${encodeURIComponent(item.province)}/${encodeURIComponent(item.district)}/${encodeURIComponent(item.subdistrict)}`}
              style={{ 
                display: "block", 
                padding: "0.75rem", 
                borderBottom: idx === results.length - 1 ? "none" : "1px solid var(--card-border)",
                borderRadius: "0.5rem"
              }}
              className="search-item"
            >
              <div style={{ fontWeight: 600 }}>{item.subdistrict}, {item.district}</div>
              <div style={{ fontSize: "0.875rem", color: "var(--secondary)" }}>
                {item.province} • {item.zipcode}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
