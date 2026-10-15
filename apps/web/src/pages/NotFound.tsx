import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404 - Not Found</h1>
      <Link to="/">Back to Home</Link>
    </main>
  );
}
