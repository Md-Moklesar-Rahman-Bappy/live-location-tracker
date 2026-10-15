import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.icon({ iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41] });

function MapUpdater({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
}

export default function OwnerShare() {
  const { publicId } = useParams();
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [accuracy, setAccuracy] = useState(0);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [sharing, setSharing] = useState(false);

  const startSharing = useCallback(() => {
    if (!navigator.geolocation) return;
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition([lat, lng]);
        setAccuracy(pos.coords.accuracy);
      },
      () => alert("Geolocation error or denied"),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    );
    setWatchId(id);
    setSharing(true);
  }, []);

  const stopSharing = useCallback(() => {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    setWatchId(null);
    setSharing(false);
  }, [watchId]);

  return (
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>Share Session: {publicId}</h1>
      {!sharing ? (
        <div>
          <p>Consent notice: Starting sharing will request browser geolocation permission. This is voluntary and can be stopped at any time.</p>
          <button onClick={startSharing}>Start Sharing</button>
        </div>
      ) : (
        <div>
          <p>Active sharing indicator: LIVE</p>
          <p>GPS Accuracy: {accuracy.toFixed(1)} meters</p>
          <button onClick={stopSharing}>Stop Sharing</button>
          <div style={{ height: 400, marginTop: 12 }}>
            <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
              <Marker position={position} icon={icon}><Popup>You are here</Popup></Marker>
              <MapUpdater position={position} />
            </MapContainer>
          </div>
        </div>
      )}
    </main>
  );
}
