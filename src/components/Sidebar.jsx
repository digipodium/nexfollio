"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      label: "Upload Resume",
      href: "/resumeupload",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
    },
    {
      label: "Skills",
      href: "/skills",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      label: "Portfolio",
      href: "/portfolio",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className="fixed top-[var(--nav-height)] left-0 w-[230px] lg:w-[260px] hidden md:flex flex-col
        bg-[rgba(6,6,14,0.95)] border-r border-gray-800
        h-[calc(100vh-var(--nav-height))] overflow-y-auto z-40 backdrop-blur-xl"
      >
        {/* Navigation */}
        <div className="py-6 px-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 mb-3">
            Navigation
          </h2>

          <ul className="flex flex-col gap-1">
            {menuItems.map((item, i) => {
              const isActive = pathname === item.href;

              return (
                <li key={i} className="p-4">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                    ${
                      isActive
                        ? "text-white bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.3)]"
                        : "text-gray-400 border border-transparent hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {/* Icon */}
                    <span
                      className={`shrink-0 transition-opacity ${
                        isActive
                          ? "text-accent-indigo"
                          : "opacity-60 group-hover:opacity-100"
                      }`}
                    >
                      {item.icon}
                    </span>

                    {/* Label */}
                    <span className="truncate">{item.label}</span>

                    {/* Active dot */}
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-indigo shadow-md shrink-0" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom Card */}
        <div className="mt-auto p-4 pt-2">
          <div className="p-3.5 rounded-xl bg-[rgba(99,102,241,0.05)] border border-[rgba(99,102,241,0.1)]">
            <p className="text-xs font-semibold text-accent-indigo mb-1">
              Pro Tip
            </p>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Upload your latest resume for the most accurate portfolio.
            </p>
          </div>
        </div>
      </aside>

      {/* Spacer */}
      <div className="hidden md:block w-[230px] lg:w-[260px] shrink-0" />
    </>
  );
};

export default Sidebar;
