"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { VideoPlayer } from "@/components/video-player";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  Clock,
} from "lucide-react";
import { isLessonCompleted } from "@/lib/dummy-data";

export default function LessonClient({
  course,
  lessonId,
  publishedLessons,
  currentLesson,
  courseId,
}: any) {
  const router = useRouter();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
    const set = new Set<string>();
    if (course) {
      course.lessons.forEach((l: any) => {
        if (isLessonCompleted(l.id)) set.add(l.id);
      });
    }
    return set;
  });

  const currentIndex = publishedLessons.findIndex(
    (l: any) => l.id === lessonId
  );
  const prevLesson =
    currentIndex > 0 ? publishedLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < publishedLessons.length - 1
      ? publishedLessons[currentIndex + 1]
      : null;
  const completedCount = publishedLessons.filter((l: any) =>
    completedLessons.has(l.id)
  ).length;
  const progressPct =
    publishedLessons.length > 0
      ? Math.round((completedCount / publishedLessons.length) * 100)
      : 0;

  const handleMarkComplete = () => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ─── Main area ─────────────────────── */}
        <div className="lg:col-span-3 space-y-5">
          {/* Back link */}
          <Link
            href={`/courses/${courseId}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="line-clamp-1">{course.title}</span>
          </Link>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {currentLesson.videoUrl ? (
              <VideoPlayer
                url={currentLesson.videoUrl}
                title={currentLesson.title}
              />
            ) : (
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border border-border">
                <div className="text-center">
                  <PlayCircle className="w-12 h-12 text-primary/30 mx-auto mb-2" />
                  <p className="text-sm text-muted">
                    No video available for this lesson
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Lesson Info */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface rounded-2xl border border-border p-6"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  {currentLesson.title}
                </h1>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {currentLesson.duration}
                  </span>
                  <span>
                    Lesson {currentIndex + 1} of {publishedLessons.length}
                  </span>
                </div>
              </div>
              <button
                onClick={handleMarkComplete}
                className={`flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl transition-all flex-shrink-0 ${
                  completedLessons.has(lessonId)
                    ? "bg-primary/10 text-primary font-semibold"
                    : "btn-primary"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {completedLessons.has(lessonId) ? "Completed" : "Mark Complete"}
              </button>
            </div>

            {currentLesson.description && (
              <p className="text-muted mt-4 leading-relaxed border-t border-border pt-4">
                {currentLesson.description}
              </p>
            )}
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            {prevLesson ? (
              <button
                onClick={() =>
                  router.push(`/courses/${courseId}/lessons/${prevLesson.id}`)
                }
                className="btn-outline text-sm py-2.5 px-5 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <button
                onClick={() =>
                  router.push(`/courses/${courseId}/lessons/${nextLesson.id}`)
                }
                className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"
              >
                Next Lesson <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href={`/courses/${courseId}`}
                className="btn-primary text-sm py-2.5 px-5"
              >
                Finish Course
              </Link>
            )}
          </div>
        </div>

        {/* ─── Sidebar ───────────────────────── */}
        <div className="lg:col-span-1">
          <div
            className="bg-surface rounded-2xl border border-border p-5 sticky top-20"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {/* Progress */}
            <div className="mb-4 pb-4 border-b border-border">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-foreground">Progress</span>
                <span className="font-semibold text-primary">
                  {progressPct}%
                </span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-[11px] text-muted mt-1.5">
                {completedCount}/{publishedLessons.length} completed
              </p>
            </div>

            {/* Lesson list */}
            <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Lessons
            </h3>
            <div className="space-y-0.5 max-h-[60vh] overflow-y-auto pr-1">
              {publishedLessons.map((lesson: any, index: number) => {
                const isActive = lesson.id === lessonId;
                const isCompleted = completedLessons.has(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() =>
                      router.push(`/courses/${courseId}/lessons/${lesson.id}`)
                    }
                    className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : isCompleted
                        ? "text-primary/70 hover:bg-background"
                        : "text-muted hover:text-foreground hover:bg-background"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : isActive ? (
                      <PlayCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : (
                      <span className="w-4 h-4 flex items-center justify-center text-[10px] font-semibold text-muted flex-shrink-0">
                        {index + 1}
                      </span>
                    )}
                    <span className="truncate text-[13px]">{lesson.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
