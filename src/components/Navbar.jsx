"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

  const links = [
    { href: "/page", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Signup" },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-[100] h-[var(--nav-height)] flex items-center justify-between px-4 sm:px-6 md:px-8 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        scrolled
          ? "bg-[rgba(6,6,14,0.95)] border-b border-[rgba(255,255,255,0.08)] shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ backdropFilter: scrolled ? "blur(24px)" : "none" }}
    >
      {/* Logo */}
      <Link href="/" className="no-underline shrink-0 group">
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-accent-indigo to-accent-purple flex items-center justify-center text-[15px] font-extrabold text-white transition-all duration-300 group-hover:scale-[1.07] group-hover:shadow-[0_4px_18px_rgba(99,102,241,0.45)]">
            N
          </div>
          <span className="text-[18px] font-bold tracking-tight text-txt-primary leading-none">
            NexFollio
          </span>
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-0.5">
        {links.map((link) => {
          const isActive = path === link.href;
          return (
            <Link key={link.href} href={link.href} className="no-underline">
              <span
                className={`relative px-3.5 py-2 rounded-[10px] text-[13.5px] font-medium cursor-pointer transition-all duration-200 inline-flex items-center gap-1.5 ${
                  isActive
                    ? "text-white bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.3)]"
                    : "text-txt-secondary border border-transparent hover:text-txt-primary hover:bg-[rgba(255,255,255,0.05)]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="inline-block w-1 h-1 rounded-full bg-accent-indigo mb-px" />
                )}
              </span>
            </Link>
          );
        })}

        <Link href="/signup" className="no-underline ml-2.5">
          <button className="relative px-5 py-2 rounded-[10px] text-[13.5px] font-semibold text-white overflow-hidden transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(99,102,241,0.38)] active:scale-[0.97] bg-gradient-to-r from-accent-indigo to-accent-purple border-none">
            Get Started
          </button>
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden bg-transparent border-none text-txt-primary cursor-pointer p-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-200 flex items-center justify-center"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-200"
        >
          {mobileOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-[var(--nav-height)] left-0 right-0 border-b border-[rgba(255,255,255,0.08)] p-3 px-5 flex flex-col gap-1 animate-slide-down"
          style={{
            background: "rgba(6,6,14,0.97)",
            backdropFilter: "blur(24px)",
          }}
        >
          {links.map((link) => {
            const isActive = path === link.href;
            return (
              <Link key={link.href} href={link.href} className="no-underline">
                <span
                  className={`flex items-center gap-2 px-3.5 py-[11px] rounded-[10px] text-[15px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-white bg-[rgba(99,102,241,0.14)]"
                      : "text-txt-secondary hover:text-txt-primary hover:bg-[rgba(255,255,255,0.04)]"
                  }`}
                >
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-indigo shrink-0" />
                  )}
                  {link.label}
                </span>
              </Link>
            );
          })}

          <div className="pt-2 mt-1 border-t border-[rgba(255,255,255,0.07)]">
            <Link href="/signup" className="no-underline">
              <button
                className="w-full py-3 rounded-[10px] text-sm font-semibold text-white mt-2 transition-opacity duration-200 hover:opacity-90 bg-gradient-to-r from-accent-indigo to-accent-purple border-none"
              >
                Get Started Free
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;