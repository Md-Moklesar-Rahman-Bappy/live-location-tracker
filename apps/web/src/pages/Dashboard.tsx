import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.displayName || user?.email || "User"}</p>
      <nav>
        <Link to="/create-session" style={{ marginRight: 12 }}>Create Session</Link>
        <Link to="/profile" style={{ marginRight: 12 }}>Profile</Link>
        <button onClick={handleLogout} style={{ marginLeft: 12, padding: "4px 8px" }}>Logout</button>
      </nav>
      <section style={{ marginTop: 24 }}>
        <h2>Your Tracking Sessions</h2>
        <p>Session list will appear here after creation.</p>
      </section>
    </main>
  );
}
