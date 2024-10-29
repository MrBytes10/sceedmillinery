//sceed_frontend/src/components/App.js

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/aboutPage";
import ContactPage from "./pages/contactPage";
import SearchResults from "./components/SearchResults";
import { SearchProvider } from "./components/SearchContext";
import SignUpPage from "./pages/signUpPage"; // Import the SignUpPage component
import LoginPage from "./pages/loginPage";
import RegistrationSuccess from "./pages/RegistrationSuccessPage";
import ProductDetailsPage from "./pages/productDetailsPage";
import ApiErrorBoundary from "./components/apiErrorBoundary";
import AdminProductPanel from "./pages/admin/adminProductPanel";
import FavoritesPage from "./pages/favoritesPage";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import UserProfile from "./pages/userProfilePage";
//import { AuthProvider } from "./contexts/AuthContext";
//AdminTests
import AddProductForm from "./pages/admin/addProductForm";
//test2
import AdminLogin from "./pages/admin/adminLogin";
import {
  AdminLayout,
  DashboardOverview,
  ProductsManagement,
  OrdersManagement,
  UsersManagement,
} from "./pages/admin/adminDashboard";
function App() {
  return (
    <SearchProvider>
      <Router>
        <ApiErrorBoundary>
          <FavoritesProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/sign-up" element={<SignUpPage />} />{" "}
              {/* A route for the SignUpPage component */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route
                path="/registration-success"
                element={<RegistrationSuccess />}
              />
              <Route path="/my-profile" element={<UserProfile />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              {/* // Admin Routes */}
              <Route path="/admin/add-product" element={<AddProductForm />} />
              <Route path="/admin/products1" element={<AdminProductPanel />} />
              <Route path="*" element={<h1>Not Found</h1>} />
              {/* Admin Dashboard Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              {/* Admin routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="products" element={<ProductsManagement />} />
                <Route path="products/add" element={<AddProductForm />} />
                <Route path="orders" element={<OrdersManagement />} />
                <Route path="users" element={<UsersManagement />} />
              </Route>
            </Routes>
          </FavoritesProvider>
        </ApiErrorBoundary>
      </Router>
    </SearchProvider>
  );
}

export default App;
