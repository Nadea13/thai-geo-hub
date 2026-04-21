"use client";

import { useEffect } from "react";

interface AdSlotProps {
  adClient?: string;
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSlot({ 
  adClient = "ca-pub-4949559489862473", 
  adSlot, 
  adFormat = "auto", 
  fullWidthResponsive = true 
}: AdSlotProps) {
  
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div style={{ margin: "2rem 0", textAlign: "center", overflow: "hidden" }}>
      <span style={{ fontSize: "0.65rem", color: "var(--secondary)", display: "block", marginBottom: "0.5rem", opacity: 0.5 }}>
        ADVERTISEMENT
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}
