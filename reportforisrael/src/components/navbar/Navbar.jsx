import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import './navbar.css'
import Logo from '../../assets/react.svg'
const Navbar = () => {
  // React Hooks and relevant imports
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const from = location.state?.from?.pathname || "/";

  // Toggle the menu's open state
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Helper function to check if the current path matches a given routePath
  const isActiveRoute = (routePath) => {
    return location.pathname === routePath;
  };

  // Add event listener to handle clicks outside the dropdown
  // and close the dropdown if click occurs outside
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {};

    document.addEventListener("click", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

  const NavLink = ({ to, label }) => {
    return (
      <li>
        <Link
          to={to}
          onClick={closeMenu}
          className={`text-black hover:text-black pb-1 nav-effect${
            isActiveRoute(to)
              ? "font-bold border-b-2 pb-[1.9px] border-[#EEB30D]"
              : ""
          }`}
        >
          {label}
        </Link>
      </li>
    );
  };

  return (
    <nav
      className={`top-0 backdrop-blur-sm z-10 w-full fixed ${
        location.pathname === "/" || location.pathname === "/my-submissions"
          ? "md:fixed"
          : "md:sticky"
      }`}
    >
      <Helmet>
        <title>Report for Israel</title>
        <link rel="icon" href={Logo} />
      </Helmet>

      <div className="relative max-w-[1280px] w-full mx-auto bg-inherit py-2 px-3 lg:flex justify-between items-center">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-black text-xl font-semibold">
            <div className="flex items-center gap-1">
              Report for Israel
              <img
                className="w-[8rem] md:w-[2rem] logo"
                src={Logo}
                alt="logo"
              />
            </div>
          </Link>
          <div className="ml-3 lg:hidden">
            <button
              onClick={handleMenuToggle}
              className="text-black p-2 focus:outline-none transition-opacity duration-300 ease-in-out"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              style={{ opacity: isMenuOpen ? 0.5 : 1 }}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:flex lg:w-auto mt-4 lg:mt-0 cleancode-menu-animation  transition-all duration-300 `}
            id="mobile-menu"
          >
            <ul className="flex flex-col gap-3 md:gap-8 md:mt-[1.5px] lg:text-left lg:flex-row lg:items-center">
              {[
                { to: "/home", label: "Home" },
                { to: "/howto", label: "How do I report?" },
              ].map((link) => (
                <NavLink key={link.to} {...link} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
