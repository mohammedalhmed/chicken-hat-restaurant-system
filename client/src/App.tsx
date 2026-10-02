import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { Route, Switch } from "wouter";
import { queryClient } from "@/lib/queryClient";

// Pages
import HomePage from "@/pages/home";
import MenuPage from "@/pages/menu";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import ReservationsPage from "@/pages/reservations";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import UserDashboardPage from "@/pages/user-dashboard";
import FavoritesPage from "@/pages/favorites";
import DeliveryPage from "@/pages/delivery";
import OffersPage from "@/pages/offers";
import EventsPage from "@/pages/events";
import ReviewsPage from "@/pages/reviews";
import NotificationsPage from "@/pages/notifications";
import NotFoundPage from "@/pages/not-found";

// Admin Pages
import AdminDashboard from "@/pages/admin/dashboard";
import MenuManagement from "@/pages/admin/menu-management";
import OrdersManagement from "@/pages/admin/orders";
import ReservationsManagement from "@/pages/admin/reservations";
import WebsiteSettings from "@/pages/admin/website-settings";

// Layout Components
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/menu" component={MenuPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/reservations" component={ReservationsPage} />
            <Route path="/offers" component={OffersPage} />
            <Route path="/favorites" component={FavoritesPage} />
            <Route path="/reviews" component={ReviewsPage} />
            <Route path="/user-dashboard" component={UserDashboardPage} />
            <Route path="/notifications" component={NotificationsPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />

            {/* Admin Routes */}
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/admin/menu" component={MenuManagement} />
            <Route path="/admin/orders" component={OrdersManagement} />
            <Route path="/admin/reservations" component={ReservationsManagement} />
            <Route path="/admin/settings" component={WebsiteSettings} />

            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <Footer />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;