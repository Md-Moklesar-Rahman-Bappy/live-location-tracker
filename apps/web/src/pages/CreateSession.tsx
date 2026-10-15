import { useState } from "react";

export default function CreateSession() {
  const [label, setLabel] = useState("");
  const [historyEnabled, setHistoryEnabled] = useState(true);
  const [minutes, setMinutes] = useState(60);
  return (
    <main style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h1>Create Tracking Session</h1>
      <form onSubmit={e => { e.preventDefault(); alert("Session created (stub)"); }}>
        <label>Optional Label</label>
        <input value={label} onChange={e => setLabel(e.target.value)} style={{ width: "100%", padding: 8 }} />
        <label style={{ display: "block", marginTop: 12 }}>History Enabled</label>
        <input type="checkbox" checked={historyEnabled} onChange={e => setHistoryEnabled(e.target.checked)} />
        <label style={{ display: "block", marginTop: 12 }}>Expiration (minutes)</label>
        <input type="number" value={minutes} onChange={e => setMinutes(Number(e.target.value))} min={15} max={1440} style={{ width: "100%", padding: 8 }} />
        <button type="submit" style={{ marginTop: 16, padding: "8px 16px" }}>Create</button>
      </form>
    </main>
  );
}
