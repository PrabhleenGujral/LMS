"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { BookOpen, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = register(name, email, password);

    if (!success) {
      setError("Registration failed. Please try again.");
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
              Start Learning
            </h1>
            <p className="text-muted mt-2">
              Create your account and begin your wellness journey
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
                <label htmlFor="name" className="label">
                  Full Name
                </label>
                <div className="relative">
                  <UserPlus className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field pl-11"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Minimum 6 characters"
                    minLength={6}
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
                    Creating account...
                  </div>
                ) : (
                  <span className="flex items-center gap-2 justify-center">
                    Create Account <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Footer link */}
          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
