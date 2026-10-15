import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ViewerPage() {
  const { publicId } = useParams();

  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    setStatus("connected");

    return () => {
      setStatus("disconnected");
    };
  }, []);

  return (
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>Public Viewer</h1>

      <p>Public ID: {publicId}</p>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <p>
        Only this session's updates will be shown. No owner profile data is
        revealed.
      </p>

      <section
        style={{
          marginTop: 16,
          padding: 12,
          background: "#f5f5f5",
          borderRadius: 8,
        }}
      >
        <h3>Privacy Notice</h3>

        <ul>
          <li>
            Anyone with this link may view the shared location while active.
          </li>
          <li>
            The application is not an emergency-response service.
          </li>
          <li>
            Accuracy depends on the device and environment.
          </li>
        </ul>
      </section>
    </main>
  );
}