"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { courses } from "@/lib/dummy-data";
import { Plus, BookOpen, Eye, EyeOff, Users, ArrowRight } from "lucide-react";

export default function InstructorCoursesPage() {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();

  if (!isLoggedIn || !user) {
    router.push("/auth/login");
    return null;
  }

  if (user.role !== "INSTRUCTOR" && user.role !== "ADMIN") {
    router.push("/");
    return null;
  }

  const instructorCourses = courses.filter(
    (c) => c.instructor.name === user.name
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              My Courses
            </h1>
            <p className="text-muted mt-1">Manage and create your courses</p>
          </div>
          <Link
            href="/instructor/courses/create"
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            New Course
          </Link>
        </div>

        {instructorCourses.length > 0 ? (
          <div className="space-y-4">
            {instructorCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={`/instructor/courses/${course.id}`}
                  className="block bg-surface rounded-2xl border border-border p-5 transition-all duration-300 hover:border-primary/20 group"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted mt-1.5">
                        <span>{course.category.name}</span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {course.lessons.length} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {course.enrollments} enrolled
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {course.isPublished ? (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                          <Eye className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-muted bg-background px-3 py-1.5 rounded-full">
                          <EyeOff className="w-3 h-3" /> Draft
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div
            className="bg-surface rounded-2xl border border-border p-16 text-center"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <p className="text-foreground font-heading font-semibold text-lg">
              No courses yet
            </p>
            <p className="text-sm text-muted mt-1 mb-5">
              Create your first course and start teaching
            </p>
            <Link
              href="/instructor/courses/create"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Create Your First Course
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
