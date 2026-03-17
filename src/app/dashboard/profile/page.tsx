"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { courses, isLessonCompleted } from "@/lib/dummy-data";
import {
  User,
  Mail,
  BookOpen,
  CheckCircle2,
  Shield,
  Save,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);

  if (!isLoggedIn || !user) {
    router.push("/auth/login");
    return null;
  }

  const enrolledCourses = courses.filter((c) =>
    user.enrolledCourseIds.includes(c.id)
  );
  const totalCompleted = enrolledCourses.reduce(
    (sum, c) =>
      sum + c.lessons.filter((l) => l.isPublished && isLessonCompleted(l.id)).length,
    0
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>

        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          Profile
        </h1>
        <p className="text-muted mb-8">Manage your account settings</p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div
            className="bg-surface rounded-2xl border border-border p-5 flex items-center gap-3"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-heading font-bold text-foreground">
                {enrolledCourses.length}
              </p>
              <p className="text-xs text-muted">Courses</p>
            </div>
          </div>
          <div
            className="bg-surface rounded-2xl border border-border p-5 flex items-center gap-3"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-heading font-bold text-foreground">
                {totalCompleted}
              </p>
              <p className="text-xs text-muted">Completed</p>
            </div>
          </div>
          <div
            className="bg-surface rounded-2xl border border-border p-5 flex items-center gap-3"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-heading font-bold text-foreground capitalize">
                {user.role.toLowerCase()}
              </p>
              <p className="text-xs text-muted">Role</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div
          className="bg-surface rounded-2xl border border-border p-7"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <h2 className="text-lg font-heading font-bold text-foreground mb-5">
            Account Details
          </h2>

          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/8 border border-primary/20 text-primary text-sm px-4 py-3 rounded-xl mb-5"
            >
              Profile updated successfully!
            </motion.div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            {/* Avatar */}
            <div className="flex items-center gap-4 pb-5 border-b border-border">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user.name[0]?.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{user.name}</p>
                <p className="text-sm text-muted">{user.email}</p>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="label">
                <User className="w-3.5 h-3.5 inline mr-1.5" />
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="email" className="label">
                <Mail className="w-3.5 h-3.5 inline mr-1.5" />
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>

            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
