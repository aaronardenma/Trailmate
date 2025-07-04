import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map.jsx";
import Nav from "./components/Nav";
import Filters from "./pages/Filters";
import Landing from "./pages/Landing.jsx";
import Favourites from "./pages/Favourites";
import UserProfile from "./pages/UserProfile";
import PlanTripPage from "@/pages/PlanTrip.jsx";
import TripFeedback from "@/pages/TripFeedback.jsx";
import CommunityPage from "@/pages/CommunityPage.jsx";
import UserPostPage from "@/pages/UserPostPage.jsx";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import PastTrips from "./pages/PastTrips";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const nav = useNavigate();

  const checkAuthStatus = async () => {
    try {
      console.log('Checking auth status...');
      const response = await fetch('http://localhost:5001/api/users/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Auth response status:', response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log('User authenticated:', userData);
        setIsAuthenticated(true);
        return userData;
      } else {
        console.log('User not authenticated');
        setIsAuthenticated(false);
        nav("/")
        return null;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      nav("/")
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      await checkAuthStatus();
    };

    initAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5001/api/users/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      setIsAuthenticated(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const noNavRoutes = ['/setup', '/register'];
  const hideNav = noNavRoutes.includes(location.pathname);

  return (
    <div className="font-display">
      {isAuthenticated && !hideNav && <Nav className="p-2" onLogout={handleLogout} />}
      
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Home />} />
        ) : (
          <>
          <Route path="/" element={<Landing />} />
          <Route 
          path="/auth/:type" 
          element={<Auth handleLogInSuccess={handleLoginSuccess} />} 
        />
        <Route path="/setup" element={<Register handleLogInSuccess={handleLoginSuccess} />} />
          </>
        )}
        
        {isAuthenticated && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/planTrip/:_id" element={<PlanTripPage />} />
            <Route path="/filters" element={<Filters />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/yourPosts" element={<UserPostPage />} />
            <Route path="/trip/:tripId" element={<TripFeedback />} />
            <Route path="/profile/trips" element={<PastTrips />} />
          </>
        )}
        
        {!isAuthenticated && (
          <Route path="*" element={<Landing />} />
        )}
      </Routes>
    </div>
  );
}

export default App;