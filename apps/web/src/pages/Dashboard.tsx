import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>Dashboard</h1>
      <nav>
        <Link to="/create-session" style={{ marginRight: 12 }}>Create Session</Link>
        <Link to="/profile" style={{ marginRight: 12 }}>Profile</Link>
      </nav>
      <section style={{ marginTop: 24 }}>
        <h2>Your Tracking Sessions</h2>
        <p>Session list will appear here after creation.</p>
      </section>
    </main>
  );
}
