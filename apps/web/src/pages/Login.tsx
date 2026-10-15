import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main style={{ padding: "2rem", maxWidth: 420, margin: "0 auto" }}>
      <h1>Login</h1>
      <form onSubmit={(e) => { e.preventDefault(); alert("Login stub"); }}>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%", padding: 8 }} />
        <label style={{ display: "block", marginTop: 12 }}>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", padding: 8 }} />
        <button type="submit" style={{ marginTop: 16, padding: "8px 16px" }}>Log In</button>
      </form>
    </main>
  );
}
