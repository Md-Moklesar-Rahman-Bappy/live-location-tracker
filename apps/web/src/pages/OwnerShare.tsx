import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapUpdater({
  position,
}: {
  position: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);

  return null;
}

export default function OwnerShare() {
  const { publicId } = useParams();

  const [position, setPosition] = useState<[number, number]>([
    51.505,
    -0.09,
  ]);

  const [routeHistory, setRouteHistory] = useState<
    [number, number][]
  >([[51.505, -0.09]]);

  const [accuracy, setAccuracy] = useState(0);

  const [watchId, setWatchId] = useState<number | null>(null);

  const [sharing, setSharing] = useState(false);

  const startSharing = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition([lat, lng]);

        setRouteHistory((prev) => [
          ...prev,
          [lat, lng],
        ]);

        setAccuracy(pos.coords.accuracy);
      },
      () => {
        alert("Geolocation permission denied or unavailable.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000,
      }
    );

    setWatchId(id);
    setSharing(true);
  }, []);

  const stopSharing = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    setWatchId(null);
    setSharing(false);
  }, [watchId]);

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h1>Share Session: {publicId}</h1>

      {!sharing ? (
        <div>
          <p>
            Consent Notice: Starting location sharing
            will request browser geolocation permission.
            Sharing is voluntary and can be stopped at
            any time.
          </p>

          <button onClick={startSharing}>
            Start Sharing
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Status:</strong> LIVE
          </p>

          <p>
            <strong>GPS Accuracy:</strong>{" "}
            {accuracy.toFixed(1)} meters
          </p>

          <p>
            <strong>Route Points:</strong>{" "}
            {routeHistory.length}
          </p>

          <button onClick={stopSharing}>
            Stop Sharing
          </button>

          <div
            style={{
              height: 400,
              marginTop: 12,
            }}
          >
            <MapContainer
              center={position}
              zoom={15}
              scrollWheelZoom={false}
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              <Marker
                position={position}
                icon={icon}
              >
                <Popup>
                  Current Device Location
                </Popup>
              </Marker>

              {routeHistory.length > 1 && (
                <Polyline
                  positions={routeHistory}
                  pathOptions={{
                    color: "blue",
                    weight: 4,
                  }}
                />
              )}

              <MapUpdater position={position} />
            </MapContainer>
          </div>
        </div>
      )}
    </main>
  );
}