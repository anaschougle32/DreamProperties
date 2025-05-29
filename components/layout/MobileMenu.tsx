"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from "lucide-react";
import Logo from "./Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Track if the header is scrolled to match its styling
  const [isScrolled, setIsScrolled] = useState(false);

  // Update scrolled state to match header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Fixed Navbar */}
      <div 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl shadow-sm md:hidden",
          isScrolled ? "bg-white/60 py-2" : "bg-white/40 py-3"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-primary">
            <Logo className="h-8 w-8" />
            <span className="font-heading font-bold text-xl">
              Dream House <span className="text-blue-600">Properties</span>
            </span>
          </Link>
          
          <button
            className="text-gray-900 p-2 rounded-lg bg-white/30 hover:bg-white/50 backdrop-blur-sm transition-all duration-300 mobile-menu-button shadow-sm"
            onClick={onClose}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      
      {/* Dropdown Menu */}
      <div
        className={cn(
          "fixed top-[60px] left-0 right-0 z-40 transition-all duration-300 ease-in-out md:hidden overflow-hidden",
          isOpen ? "max-h-[calc(100vh-60px)] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div 
          className={cn(
            "w-full backdrop-blur-xl rounded-b-xl shadow-lg transition-all duration-300",
            isScrolled ? "bg-white/60" : "bg-white/40"
          )}
        >
          <nav className="container mx-auto px-4 py-2">
            <div className="space-y-1">
              {[
                { name: "Home", href: "/" },
                { name: "Properties", href: "/properties" },
                { name: "Locations", href: "/locations" },
                { name: "Blog", href: "/blogs" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between w-full p-3 rounded-lg text-gray-900 font-medium hover:bg-white/40 hover:text-blue-600 transition-all duration-200"
                >
                  <span>{item.name}</span>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <Link 
                  href="tel:+919082888912"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 shadow-md"
                  onClick={onClose}
                >
                  Call Us Now: +91 90828 88912
                </Link>
                <Link 
                  href="https://wa.me/917977288350?text=Hi,%20I'm%20interested%20in%20property%20inquiry."
                  className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors duration-200 shadow-md"
                  onClick={onClose}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: +91 79-77288350
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[3px] md:hidden" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default MobileMenu;