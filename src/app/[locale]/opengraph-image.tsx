import { ImageResponse } from "next/og";
import { getDictionary, isLocale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Art4Good";

export default function OgImage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(isLocale(params.locale) ? params.locale : "en");
  const petals = ["#E4572E", "#FFC24B", "#35B36B", "#14AEB0", "#2F6FE0", "#8A5CD6"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#FBF6EE",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ position: "relative", width: 84, height: 84, display: "flex", alignItems: "center", justifyContent: "center", background: "#1C2637", borderRadius: 999 }}>
            {petals.map((c, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 14,
                  height: 34,
                  background: c,
                  borderRadius: 999,
                  transform: `rotate(${i * 60}deg) translateY(-20px)`,
                }}
              />
            ))}
            <div style={{ position: "absolute", width: 14, height: 14, background: "#fff", borderRadius: 999 }} />
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, color: "#1C2637" }}>
            <span>Art</span>
            <span style={{ color: "#E4572E" }}>4</span>
            <span>Good</span>
          </div>
        </div>

        <div style={{ fontSize: 68, fontWeight: 700, color: "#1C2637", lineHeight: 1.05, maxWidth: 980, display: "flex" }}>
          {dict.meta.tagline}
        </div>

        <div style={{ fontSize: 28, color: "#5D6B80", display: "flex" }}>
          {dict.footer.based} · @art4good.ist
        </div>
      </div>
    ),
    size
  );
}
