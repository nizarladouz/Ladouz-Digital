"use client";
export const G = "#8dc63f";
export function Brand({ sub }: { sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 34, height: 34, borderRadius: 9, background: G, color: "#0b1233", display: "grid", placeItems: "center", fontWeight: 700, fontFamily: "var(--font-jost)" }}>L</div>
      <div style={{ fontFamily: "var(--font-jost)", lineHeight: 1.1 }}>
        <div style={{ fontWeight: 600, letterSpacing: ".02em" }}>L Digital Hub</div>
        <div style={{ fontSize: 11, opacity: .55, letterSpacing: ".14em", textTransform: "uppercase" }}>{sub ?? "Beta · Ladouz Digital"}</div>
      </div>
    </div>
  );
}
