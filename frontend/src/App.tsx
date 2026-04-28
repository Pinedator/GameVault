import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CollectionProvider } from "./context/CollectionContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import CollectionPage from "./pages/CollectionPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <CollectionProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CollectionProvider>
    </BrowserRouter>
  );
}