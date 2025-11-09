export const metadata = {
  title: "PTO Tracker",
  description: "Frontend powered by Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        <header style={{ background: "#0070f3", padding: "1rem", color: "white" }}>
          <h1>PTO Tracker</h1>
        </header>
        <main style={{ padding: "2rem" }}>{children}</main>
      </body>
    </html>
  );
}