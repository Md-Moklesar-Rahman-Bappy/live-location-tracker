import { useState } from "react";
import { apiRequest } from "../api/client";

export default function CreateSession() {
  const [label, setLabel] = useState("");
  const [historyEnabled, setHistoryEnabled] = useState(true);
  const [minutes, setMinutes] = useState(60);
  const [result, setResult] = useState<{ sessionId: string; publicId: string; shareUrl: string } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await apiRequest("/api/sessions", {
        method: "POST",
        body: JSON.stringify({ label, historyEnabled, expiresMinutes: minutes }),
      });
      setResult({ sessionId: data.sessionId, publicId: data.publicId, shareUrl: data.shareUrl });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create session");
    }
  };

  return (
    <main style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h1>Create Tracking Session</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Optional Label</label>
        <input value={label} onChange={e => setLabel(e.target.value)} style={{ width: "100%", padding: 8 }} />
        <label style={{ display: "block", marginTop: 12 }}>History Enabled</label>
        <input type="checkbox" checked={historyEnabled} onChange={e => setHistoryEnabled(e.target.checked)} />
        <label style={{ display: "block", marginTop: 12 }}>Expiration (minutes)</label>
        <input type="number" value={minutes} onChange={e => setMinutes(Number(e.target.value))} min={15} max={1440} style={{ width: "100%", padding: 8 }} />
        <button type="submit" style={{ marginTop: 16, padding: "8px 16px" }}>Create</button>
      </form>
      {result && (
        <div style={{ marginTop: 24, padding: 12, background: "#e8f5e9" }}>
          <h3>Session Created</h3>
          <p>ID: {result.sessionId}</p>
          <p>Public ID: {result.publicId}</p>
          <p>Share Link: <a href={result.shareUrl} target="_blank" rel="noreferrer">{result.shareUrl}</a></p>
        </div>
      )}
    </main>
  );
}
