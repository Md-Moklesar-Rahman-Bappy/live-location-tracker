import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [form, setForm] = useState({ displayName: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register(form.displayName, form.email, form.password);
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <main style={{ padding: "2rem", maxWidth: 460, margin: "0 auto" }}>
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
