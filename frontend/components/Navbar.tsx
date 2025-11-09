export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "1rem", margin: 0, padding: 0 }}>
        <li><a href="/">Home</a></li>
        <li><a href="/pto">PTO</a></li>
        <li><a href="/updates">Updates</a></li>
      </ul>
    </nav>
  );
}