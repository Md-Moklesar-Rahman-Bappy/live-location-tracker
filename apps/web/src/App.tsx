import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateSession from "./pages/CreateSession";
import SessionDetails from "./pages/SessionDetails";
import OwnerShare from "./pages/OwnerShare";
import Profile from "./pages/Profile";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import ViewerPage from "./pages/ViewerPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-session" element={<CreateSession />} />
      <Route path="/session/:id" element={<SessionDetails />} />
      <Route path="/share/:publicId" element={<OwnerShare />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/track/:publicId" element={<ViewerPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
