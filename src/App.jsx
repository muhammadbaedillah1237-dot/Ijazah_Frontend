import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";

import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Verifikasi from "./pages/Verifikasi";
import Template from "./pages/Template";
import DataMahasiswa from "./pages/DataMahasiswa"; // ✅ TAMBAHAN

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/verifikasi"
            element={
              <ProtectedRoute>
                <Verifikasi />
              </ProtectedRoute>
            }
          />

          <Route
            path="/template"
            element={
              <ProtectedRoute>
                <Template />
              </ProtectedRoute>
            }
          />

          {/* ✅ DATA MAHASISWA */}
          <Route
            path="/data-mahasiswa"
            element={
              <ProtectedRoute>
                <DataMahasiswa />
              </ProtectedRoute>
            }
          />

          {/* DEFAULT */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;