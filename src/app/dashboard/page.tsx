"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { courses, isLessonCompleted } from "@/lib/dummy-data";
import {
  BookOpen,
  Play,
  CheckCircle2,
  ArrowRight,
  Trophy,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();

  if (!isLoggedIn || !user) {
    router.push("/auth/login");
    return null;
  }

  const enrolledCourses = courses.filter((c) =>
    user.enrolledCourseIds.includes(c.id)
  );

  const totalLessons = enrolledCourses.reduce(
    (sum, c) => sum + c.lessons.filter((l) => l.isPublished).length,
    0
  );
  const totalCompleted = enrolledCourses.reduce(
    (sum, c) =>
      sum + c.lessons.filter((l) => l.isPublished && isLessonCompleted(l.id)).length,
    0
  );
  const overallProgress =
    totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Welcome back, {user.name?.split(" ")[0]}!
        </h1>
        <p className="text-muted mt-2">
          Continue your learning journey where you left off.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
      >
        <div
          className="bg-surface rounded-2xl border border-border p-5 flex items-center gap-4"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-foreground">
              {enrolledCourses.length}
            </p>
            <p className="text-sm text-muted">Enrolled Courses</p>
          </div>
        </div>

        <div
          className="bg-surface rounded-2xl border border-border p-5 flex items-center gap-4"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-foreground">
              {totalCompleted}
            </p>
            <p className="text-sm text-muted">Lessons Completed</p>
          </div>
        </div>

        <div
          className="bg-surface rounded-2xl border border-border p-5 flex items-center gap-4"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-heading font-bold text-foreground">
              {overallProgress}%
            </p>
            <p className="text-sm text-muted">Overall Progress</p>
          </div>
        </div>
      </motion.div>

      {/* Enrolled Courses */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-heading font-bold text-foreground">
            My Courses
          </h2>
          <Link
            href="/courses"
            className="text-sm text-primary font-semibold hover:underline flex items-center gap-1"
          >
            Browse more <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="space-y-4">
            {enrolledCourses.map((course, i) => {
              const publishedLessons = course.lessons.filter(
                (l) => l.isPublished
              );
              const completedCount = publishedLessons.filter((l) =>
                isLessonCompleted(l.id)
              ).length;
              const progress =
                publishedLessons.length > 0
                  ? Math.round(
                      (completedCount / publishedLessons.length) * 100
                    )
                  : 0;
              const nextLesson = publishedLessons.find(
                (l) => !isLessonCompleted(l.id)
              );

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <div
                    className="bg-surface rounded-2xl border border-border p-5 sm:p-6 transition-all duration-300 hover:border-primary/20"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Course icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-7 h-7 text-primary" />
                      </div>

                      {/* Course info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/courses/${course.id}`}
                          className="font-heading font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                        >
                          {course.title}
                        </Link>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted mt-1.5">
                          <span className="flex items-center gap-1">
                            <Play className="w-3 h-3" />
                            {completedCount}/{publishedLessons.length} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {progress}% complete
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {course.category.name}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                            />
                          </div>
                          <span className="text-xs font-semibold text-primary min-w-[36px] text-right">
                            {progress}%
                          </span>
                        </div>
                      </div>

                      {/* Continue button */}
                      <Link
                        href={`/courses/${course.id}/lessons/${
                          nextLesson?.id || publishedLessons[0]?.id || ""
                        }`}
                        className="btn-primary text-sm px-5 py-2.5 flex-shrink-0"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div
            className="bg-surface rounded-2xl border border-border p-12 text-center"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <p className="text-foreground font-heading font-semibold text-lg">
              No courses enrolled yet
            </p>
            <p className="text-sm text-muted mt-1 mb-5">
              Explore our courses and start your wellness journey
            </p>
            <Link href="/courses" className="btn-primary text-sm px-6 py-2.5">
              Browse Courses
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
