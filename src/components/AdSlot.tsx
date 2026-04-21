"use client";

export default function AdSlot({ id, label = "Advertisement" }: { id: string; label?: string }) {
  return (
    <div 
      id={id}
      style={{
        width: "100%",
        minHeight: "100px",
        background: "var(--accent)",
        border: "1px dashed var(--secondary)",
        borderRadius: "0.5rem",
        margin: "1.5rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--secondary)",
        fontSize: "0.75rem",
        overflow: "hidden"
      }}
    >
      <span style={{ opacity: 0.5, marginBottom: "0.25rem" }}>{label}</span>
      <div style={{ fontWeight: 600 }}>Google AdSense Slot</div>
      {/* 
        Once approved, replace this div with:
        <ins className="adsbygoogle" ... />
      */}
    </div>
  );
}
