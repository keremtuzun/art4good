import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#FBF6EE", color: "#1C2637" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", padding: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "2.5rem", margin: 0 }}>Page not found</h1>
            <p style={{ color: "#5D6B80" }}>This page seems to have wandered off the canvas.</p>
            <Link href="/en" style={{ display: "inline-block", marginTop: "1rem", background: "#E4572E", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "999px", fontWeight: 700, textDecoration: "none" }}>
              Back home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
