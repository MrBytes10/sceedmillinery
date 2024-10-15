//sceed_frontend/src/components/App.js

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import AboutPage from "./pages/aboutPage";
import ContactPage from "./pages/ContactPage.js";
import SearchResults from "./components/SearchResults";
import { SearchProvider } from "./components/SearchContext";

function App() {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
