//sceed_frontend/src/components/App.js

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/shopPage";
import AboutPage from "./pages/aboutPage";
import ContactPage from "./pages/contactPage";
import SearchResults from "./components/SearchResults";
import { SearchProvider } from "./components/SearchContext";
import SignUpPage from "./pages/signUpPage"; // Import the SignUpPage component
import LoginPage from "./pages/loginPage";
import RegistrationSuccess from "./pages/RegistrationSuccessPage";
import ProductDetailsPage from "./pages/productDetailsPage";
import ApiErrorBoundary from "./components/apiErrorBoundary";
import FavoritesPage from "./pages/favoritesPage";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import UserProfile from "./pages/userProfilePage";
import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/paymentPage";
import OrderConfirmation from "./pages/paymentSuccessPage";
import PaymentVerifyPage from "./pages/paymentVerifyPage";
import PaymentCancelPage from "./pages/paymentCancelPage";

import { CartProvider } from "./contexts/CartContext";
//import { AuthProvider } from "./contexts/AuthContext";
//AdminTests
//test2
import AdminLogin from "./pages/admin/adminLogin";
import {
  AdminLayout,
  DashboardOverview,
  ProductsManagement,
  OrdersManagement,
  UsersManagement,
  MessagesManagement,
} from "./pages/admin/adminDashboard";

import setupAxiosInterceptors from "./config/axiosConfig";
setupAxiosInterceptors();
function App() {
  return (
    <SearchProvider>
      <Router>
        <ApiErrorBoundary>
          <FavoritesProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
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
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route
                  path="/payment/success"
                  element={<OrderConfirmation />}
                />
                <Route path="/payment/verify" element={<PaymentVerifyPage />} />
                <Route path="/payment/cancel" element={<PaymentCancelPage />} />
                {/* // Admin Routes */}
                <Route path="*" element={<h1>Not Found</h1>} />
                {/* Admin Dashboard Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                {/* Admin routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<DashboardOverview />} />
                  <Route path="products" element={<ProductsManagement />} />
                  <Route path="orders" element={<OrdersManagement />} />
                  <Route path="users" element={<UsersManagement />} />
                  <Route path="messages" element={<MessagesManagement />} />
                </Route>
              </Routes>
            </CartProvider>
          </FavoritesProvider>
        </ApiErrorBoundary>
      </Router>
    </SearchProvider>
  );
}

export default App;
