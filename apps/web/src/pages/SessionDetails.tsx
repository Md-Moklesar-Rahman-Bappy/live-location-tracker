import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SessionDetails() {
  const { id } = useParams();
  return (
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>Session Details</h1>
      <p>ID: {id}</p>
      <p>Expiration, status, and controls will appear here.</p>
      <nav style={{ marginTop: 12 }}>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </main>
  );
}
