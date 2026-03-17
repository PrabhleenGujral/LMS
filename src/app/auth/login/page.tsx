"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { BookOpen, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = login(email, password);

    if (!success) {
      setError(
        "Invalid email or password. Try: priya@learnsphere.com / any password"
      );
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[440px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Welcome Back
            </h1>
            <p className="text-muted mt-2">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Form */}
          <div
            className="bg-surface rounded-2xl border border-border p-7"
            style={{ boxShadow: "var(--shadow-card-hover)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-danger/8 border border-danger/20 text-danger text-sm px-4 py-3 rounded-xl"
                >
                  {error}
                </motion.div>
              )}

              <div>
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-11"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-11"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <span className="flex items-center gap-2 justify-center">
                    Sign In <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </form>

            {/* Hint */}
            <div className="mt-5 p-3 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-xs text-muted">
                <span className="font-semibold text-primary">Demo:</span> Use
                any email & password. Pre-logged in as Priya Patel (Instructor).
              </p>
            </div>
          </div>

          {/* Footer link */}
          <p className="text-center text-sm text-muted mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
