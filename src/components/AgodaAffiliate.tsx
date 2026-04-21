"use client";

import React from "react";

interface AgodaAffiliateProps {
  locationName: string;
  aid?: string;
}

export default function AgodaAffiliate({ locationName, aid = "YOUR_AGODA_AID" }: AgodaAffiliateProps) {
  // Construct a search URL for Agoda
  const searchUrl = `https://www.agoda.com/search?city=${encodeURIComponent(locationName)}&aid=${aid}`;

  return (
    <div className="agoda-container" style={{
      margin: "2rem 0",
      padding: "2rem",
      background: "linear-gradient(135deg, #12295d 0%, #1a3a8a 100%)",
      borderRadius: "1rem",
      color: "white",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    }}>
      <div style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", opacity: 0.8 }}>
        ที่พักแนะนำใน {locationName}
      </div>
      <h2 style={{ margin: "0 0 1.5rem 0", fontSize: "1.75rem", color: "white" }}>
        ค้นหาโรงแรมที่ดีที่สุดใน {locationName}
      </h2>
      <p style={{ marginBottom: "2rem", maxWidth: "500px", opacity: 0.9, lineHeight: 1.6 }}>
        เปรียบเทียบราคาโรงแรม รีสอร์ต และที่พักราคาสุดคุ้มใน{locationName} พร้อมข้อเสนอพิเศษสำหรับคุณ
      </p>
      <a 
        href={searchUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        style={{
          background: "#ff567d",
          color: "white",
          padding: "1rem 2.5rem",
          borderRadius: "3rem",
          fontWeight: "bold",
          textDecoration: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
          display: "inline-block",
          boxShadow: "0 4px 15px rgba(255, 86, 125, 0.4)"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 86, 125, 0.6)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 86, 125, 0.4)";
        }}
      >
        ดูที่พักทั้งหมดใน{locationName}
      </a>
      <div style={{ marginTop: "1rem", fontSize: "0.75rem", opacity: 0.6 }}>
        * สนับสนุนเราผ่านการจองที่พักผ่านลิงก์นี้
      </div>
    </div>
  );
}
