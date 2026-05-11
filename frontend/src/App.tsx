import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CollectionProvider } from "./context/CollectionContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import CollectionPage from "./pages/CollectionPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <SearchPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/collection"
          element={
            <PrivateRoute>
              <CollectionPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CollectionProvider>
          <AppRoutes />
        </CollectionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}