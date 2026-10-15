import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ displayName: "", email: "", password: "", confirmPassword: "" });
  return (
    <main style={{ padding: "2rem", maxWidth: 460, margin: "0 auto" }}>
      <h1>Register</h1>
      <form onSubmit={e => { e.preventDefault(); alert("Register stub"); }}>
        <label>Display Name</label>
        <input value={form.displayName} onChange={e => setForm({ ...form, displayName: e.target.value })} required style={{ width: "100%", padding: 8 }} />
        <label style={{ display: "block", marginTop: 12 }}>Email</label>
        <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={{ width: "100%", padding: 8 }} />
        <label style={{ display: "block", marginTop: 12 }}>Password</label>
        <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ width: "100%", padding: 8 }} />
        <label style={{ display: "block", marginTop: 12 }}>Confirm Password</label>
        <input type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required style={{ width: "100%", padding: 8 }} />
        <button type="submit" style={{ marginTop: 16, padding: "8px 16px" }}>Register</button>
      </form>
    </main>
  );
}
