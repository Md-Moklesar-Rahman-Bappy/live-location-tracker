export default function Landing() {
  return (
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
      <h1>Live Location Tracker</h1>
      <p>By Md Moklesar Rahman</p>
      <p>A secure, consent-based live location sharing application.</p>
      <nav>
        <a href="/login" style={{ marginRight: 12 }}>Login</a>
        <a href="/register">Register</a>
      </nav>
      <section style={{ marginTop: 24 }}>
        <h2>Ethical Use Notice</h2>
        <p>This application supports only voluntary location sharing. It is not an emergency-response service.</p>
        <p>Mobile browsers may suspend geolocation when minimized, locked, or under battery optimization.</p>
      </section>
    </main>
  );
}
