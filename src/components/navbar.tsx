"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import {
  Search,
  Menu,
  X,
  BookOpen,
  LogOut,
  User,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

export function Navbar() {
  const { user, isLoggedIn, logout } = useAuthStore();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isInstructor = user?.role === "INSTRUCTOR" || user?.role === "ADMIN";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close profile dropdown on route change
  useEffect(() => {
    setProfileOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  //links
  const navLinks = [
    { href: "/courses", label: "Courses" },
    { href: "/dashboard", label: "Dashboard", auth: true },
    { href: "/instructor/courses", label: "My Courses", instructor: true },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/95 backdrop-blur-lg border-b border-border"
          : "bg-surface/80 backdrop-blur-md border-b border-transparent"
      }`}
      style={{ boxShadow: scrolled ? "var(--shadow-nav)" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold font-heading text-foreground">
              LearnSphere
            </span>
          </Link>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-background border border-border/60 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks
              .filter((l) => {
                if (l.auth && !isLoggedIn) return false;
                if (l.instructor && !isInstructor) return false;
                return true;
              })
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-primary bg-primary/8"
                      : "text-muted hover:text-foreground hover:bg-background"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            {!isLoggedIn ? (
              <div className="flex items-center gap-2 ml-3">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-primary text-sm px-5 py-2"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="relative ml-3">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-background transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-muted transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setProfileOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-60 bg-surface rounded-xl border border-border p-1.5 z-20"
                        style={{ boxShadow: "var(--shadow-dropdown)" }}
                      >
                        <div className="px-3 py-3 mb-1">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-muted truncate mt-0.5">
                            {user?.email}
                          </p>
                        </div>
                        <div className="h-px bg-border mb-1" />

                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link
                          // href="/dashboard/profile"
                          href=""
                          className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </Link>
                        {isInstructor && (
                          <Link
                            href="/instructor/courses"
                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors"
                          >
                            <BookOpen className="w-4 h-4" />
                            My Courses
                          </Link>
                        )}

                        <div className="h-px bg-border my-1" />
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-danger hover:bg-danger/5 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-background transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden border-t border-border bg-surface overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border/60 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {navLinks
                .filter((l) => {
                  if (l.auth && !isLoggedIn) return false;
                  if (l.instructor && !isInstructor) return false;
                  return true;
                })
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "text-primary bg-primary/8"
                        : "text-muted hover:text-foreground hover:bg-background"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

              <div className="h-px bg-border my-2" />

              {!isLoggedIn ? (
                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    href="/auth/login"
                    className="btn-outline text-center text-sm py-2.5"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="btn-primary text-center text-sm py-2.5"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2.5 text-sm font-medium text-danger hover:bg-danger/5 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
