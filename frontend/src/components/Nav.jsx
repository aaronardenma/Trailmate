import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { TbBuildingCommunity } from "react-icons/tb";
import { IoChevronDown } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { GiWalkingBoot } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { setUnauthenticated } from '@/store/authSlice';
import { clearUser } from '@/store/userSlice';

export default function Nav({ onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const nav = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
      dispatch(setUnauthenticated())
      dispatch(clearUser())
      nav('/');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#DAD7CD]">
      <div className="flex justify-between items-center px-4 sm:px-8">
        <Link to="/" className="text-2xl sm:text-3xl text-[#588157] font-bold py-4">
          TrailMate
        </Link>
        
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <Link to="/community" className="flex items-center hover:text-[#588157] transition-colors">
              <TbBuildingCommunity className="text-[#588157] mr-1.5 text-xl" />
              <span className="font-semibold">Community</span>
            </Link>
          </li>
          
          <li>
            <Link to="/favourites" className="flex items-center hover:text-[#588157] transition-colors">
              <FaRegStar className="text-[#588157] mr-1.5 text-xl" />
              <span className="font-semibold">Favourites</span>
            </Link>
          </li>
          
          <li className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleDropdown}
              className="flex items-center hover:text-[#588157] transition-colors focus:outline-none cursor-pointer"
            >
              <FaRegUserCircle className="text-[#588157] mr-1.5 text-xl" />
              <span className="font-semibold">User</span>
              <IoChevronDown 
                className={`ml-1 text-[#588157] transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {/* desktop */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-fit bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-right font-semibold hover:bg-gray-100 hover:text-[#588157] transition-colors"
                    onClick={closeDropdown}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/profile/trips"
                    className="block px-4 py-2 text-sm text-right font-semibold hover:bg-gray-100 hover:text-[#588157] transition-colors"
                    onClick={closeDropdown}
                  >
                    Trips
                  </Link>
                </div>
              </div>
            )}
          </li>
          
          <li>
            <Link 
              to="/" 
              className="flex items-center hover:text-[#588157] transition-colors" 
              onClick={handleLogout}
            >
              <TbLogout className="text-[#588157] mr-1.5 text-xl" />
              <span className="font-semibold">Log Out</span>
            </Link>
          </li>
        </ul>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md hover:bg-[#A3B18A] transition-colors"
        >
          {isMobileMenuOpen ? (
            <HiX className="text-[#588157] text-2xl" />
          ) : (
            <HiMenu className="text-[#588157] text-2xl" />
          )}
        </button>
      </div>

      {/* mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#DAD7CD] border-t border-[#A3B18A]" ref={mobileMenuRef}>
          <div className="px-4 py-2 space-y-2">
            <Link
              to="/community"
              className="flex items-center py-2 hover:text-[#588157] transition-colors"
              onClick={closeMobileMenu}
            >
              <TbBuildingCommunity className="text-[#588157] mr-1.5 text-xl" />
              <span className="font-semibold">Community</span>
            </Link>
            
            <Link
              to="/favourites"
              className="flex items-center py-2 hover:text-[#588157] transition-colors"
              onClick={closeMobileMenu}
            >
              <FaRegStar className="text-[#588157] mr-1.5 text-xl" />
              <span className="font-semibold">Favourites</span>
            </Link>

            {/* Mobile User Section */}
            <div className="border-t border-[#A3B18A] pt-2">
              <Link
                to="/profile"
                className="flex items-center py-2 hover:text-[#588157] transition-colors"
                onClick={closeMobileMenu}
              >
                <FaRegUserCircle className="text-[#588157] mr-1.5 text-xl" />
                <span className="font-semibold">Profile</span>
              </Link>
              
              <Link
                to="/profile/trips"
                className="flex items-center py-2 pl-8 hover:text-[#588157] transition-colors"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center font-semibold"><GiWalkingBoot className='text-[#588157] text-lg mr-1' />Trips</div>
              </Link>
            </div>
            
            <Link
              to="/"
              className="flex items-center py-2 hover:text-[#588157] transition-colors border-t border-[#A3B18A] pt-2"
              onClick={(e) => {
                closeMobileMenu();
                handleLogout();
              }}
            >
              <TbLogout className="text-[#588157] mr-1.5 text-xl" />
              <span className="font-semibold">Log Out</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}