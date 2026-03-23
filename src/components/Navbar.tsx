"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Men", href: "#" },
  { label: "Women", href: "#" },
  { label: "Kids", href: "#" },
  { label: "Collections", href: "#" },
  { label: "Contact", href: "#" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-light-100 border-b border-light-300">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="Home">
          <Image
            src="/logo-dark.svg"
            alt="Nike"
            width={80}
            height={29}
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-body font-medium text-dark-900 hover:text-dark-700 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="#"
            className="text-body font-medium text-dark-900 hover:text-dark-700 transition-colors"
          >
            Search
          </Link>
          <Link
            href="#"
            className="text-body font-medium text-dark-900 hover:text-dark-700 transition-colors"
          >
            My Cart (2)
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="md:hidden flex flex-col items-center justify-center gap-1.5 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-0.5 w-6 bg-dark-900 transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-dark-900 transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-dark-900 transition-transform duration-300 ${
              isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 pb-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-body font-medium text-dark-900 hover:text-dark-700 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="border-t border-light-300 pt-4">
            <Link
              href="#"
              className="text-body font-medium text-dark-900 hover:text-dark-700 transition-colors"
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-body font-medium text-dark-900 hover:text-dark-700 transition-colors"
            >
              My Cart (2)
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
