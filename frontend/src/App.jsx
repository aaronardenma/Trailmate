import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticated, setUnauthenticated } from "./store/authSlice";
import { setUser, clearUser, updateUser } from "./store/userSlice";
import Home from "./pages/Home";
import Map from "./pages/Map.jsx";
import Nav from "./components/Nav";
import Filters from "./pages/Filters";
import Landing from "./pages/Landing.jsx";
import Favourites from "./pages/Favourites";
import UserProfile from "./pages/UserProfile";
import TripFeedback from "@/pages/TripFeedback.jsx";
import CommunityPage from "@/pages/CommunityPage.jsx";
import UserPostPage from "@/pages/UserPostPage.jsx";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import PastTrips from "./pages/PastTrips";
import HazardReporting from "./components/HazardReporting";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const nav = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const profileCompleted = useSelector(state => state.user.profileCompleted)
  // console.log(profileCompleted)
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
        dispatch(setUser(userData));
        dispatch(setAuthenticated());
        return userData;
      } else {
        console.log('User not authenticated');
        dispatch(clearUser());
        dispatch(setUnauthenticated());
        
        nav("/");
        return null;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      dispatch(setUnauthenticated());
      nav("/");
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
      dispatch(setUnauthenticated());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLoginSuccess = () => {
    dispatch(setAuthenticated());
  };

  const noNavRoutes = ['/setup', '/register'];
  const hideNav = noNavRoutes.includes(location.pathname);

  useEffect(() => {
    if (isAuthenticated && !profileCompleted && location.pathname !== '/setup') {
      nav('/setup');
      setTimeout(() => {
        alert("Please setup your profile before proceeding")
      }, 200)
      
    }
  }, [isAuthenticated, profileCompleted, location.pathname]);

  return (
    <div className="font-display">
      {isAuthenticated && !hideNav && profileCompleted && <Nav className="p-2" onLogout={handleLogout} />}
      
      <Routes>
        {!isAuthenticated && !profileCompleted && (
          <>
            <Route path="/" element={<Landing />} />
            <Route 
            path="/auth/:type" 
            element={<Auth handleLogInSuccess={handleLoginSuccess} />} 
          />
          <Route path="/setup" element={<Register handleLogInSuccess={handleLoginSuccess} />} />
          </>
        )}

        {isAuthenticated && !profileCompleted && <Route path="/setup" element={<Register handleLogInSuccess={handleLoginSuccess} />} />}
        
        {isAuthenticated && profileCompleted && (
          <>
          <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/filters" element={<Filters />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/yourPosts" element={<UserPostPage />} />
            <Route path="/trip/:tripId" element={<TripFeedback />} />
            <Route path="/profile/trips" element={<PastTrips />} />
            <Route path="hazard" element={<HazardReporting />}></Route>
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