

'use client';

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (!session) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-500"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand/Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              <span>CRM Platform</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:space-x-1 items-center">
            <LayoutGroup>
              <NavDropdown 
                title="Campaigns" 
                items={[
                  { label: "Create Campaign", href: "/home" },
                  { label: "View All Campaigns", href: "/campaigns" }
                ]}
                active={pathname === "/home" || pathname === "/campaigns" || pathname.startsWith("/campaigns/")}
              />
              
              <NavDropdown 
                title="Customers" 
                items={[
                  { label: "Add Customer", href: "/customers/add-customer" },
                  { label: "View All Customers", href: "/customers/view-customers" }
                ]}
                active={pathname.startsWith("/customers/")}
              />
              
              <NavDropdown 
                title="Orders" 
                items={[
                  { label: "Add Order", href: "/orders/add-order" },
                  { label: "View All Orders", href: "/orders/view-orders" }
                ]}
                active={pathname.startsWith("/orders/")}
              />
            </LayoutGroup>
          </div>
          
          {/* User Profile & Sign Out - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {session.user?.name && (
              <span className="text-sm text-gray-600">
                Hi, {session.user.name.split(' ')[0]}
              </span>
            )}
            {session.user?.image && (
              <img 
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-9 h-9 rounded-full border-2 border-gray-200 object-cover"
              />
            )}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 246, 255, 1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md transition-all duration-150 ease-in-out"
            >
              Sign Out
            </motion.button>
          </div>
          
          {/* Mobile Menu and User Button */}
          <div className="flex md:hidden items-center space-x-3">
            {session.user?.image && (
              <img 
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-8 h-8 rounded-full border-2 border-gray-200 object-cover"
              />
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavAccordion 
                title="Campaigns"
                items={[
                  { label: "Create Campaign", href: "/home" },
                  { label: "View All Campaigns", href: "/campaigns" }
                ]}
                active={pathname === "/home" || pathname === "/campaigns" || pathname.startsWith("/campaigns/")}
                pathname={pathname}
              />
              
              <MobileNavAccordion 
                title="Customers"
                items={[
                  { label: "Add Customer", href: "/customers/add-customer" },
                  { label: "View All Customers", href: "/customers/view-customers" }
                ]}
                active={pathname.startsWith("/customers/")}
                pathname={pathname}
              />
              
              <MobileNavAccordion 
                title="Orders"
                items={[
                  { label: "Add Order", href: "/orders/add-order" },
                  { label: "View All Orders", href: "/orders/view-orders" }
                ]}
                active={pathname.startsWith("/orders/")}
                pathname={pathname}
              />
            </div>
            
            {/* Mobile Sign Out */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  {session.user?.image && (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={session.user.image}
                      alt={session.user.name || "User"}
                    />
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {session.user?.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {session.user?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2">
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full flex justify-center items-center px-4 py-2 text-base font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-blue-600"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavDropdown({ title, items, active }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  
  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsOpen(true);
  };
  
  const handleMouseLeave = () => {
    // Add a delay before closing the dropdown to give user time to move to it
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 300); // 300ms delay
    
    setHoverTimeout(timeout);
  };
  
  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out space-x-1 ${
          active ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
        }`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown on click as well
      >
        <span>{title}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {active && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          onMouseEnter={handleMouseEnter} // Keep menu open when hovering
          onMouseLeave={handleMouseLeave} // Start delay when leaving
        >
          <div className="py-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function MobileNavAccordion({ title, items, active, pathname }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="rounded-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-left text-base font-medium ${
          active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
        }`}
        aria-expanded={isExpanded}
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "transform rotate-180" : ""}`}
        />
      </button>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-gray-50"
          >
            <div className="py-1 px-2">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`block px-4 py-2 rounded-md text-sm ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
