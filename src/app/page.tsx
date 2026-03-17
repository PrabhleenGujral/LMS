"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { courses, categories } from "@/lib/dummy-data";
import { CourseCard } from "@/components/course-card";
import {
  BookOpen,
  Users,
  Play,
  ArrowRight,
  Sparkles,
  Leaf,
  Heart,
  Star,
  GraduationCap,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const categoryIcons: Record<string, React.ReactNode> = {
  "cat-1": <Leaf className="w-6 h-6" />,
  "cat-2": <Heart className="w-6 h-6" />,
  "cat-3": <Sparkles className="w-6 h-6" />,
  "cat-4": <Leaf className="w-6 h-6" />,
  "cat-5": <Leaf className="w-6 h-6" />,
  "cat-6": <Star className="w-6 h-6" />,
};

export default function HomePage() {
  const publishedCourses = courses.filter((c) => c.isPublished);
  const featuredCourses = publishedCourses.slice(0, 6);

  return (
    <div>
      {/* ─── Hero Section ────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/8 via-background to-accent/5">
        {/* Decorative blobs */}
        <div className="absolute top-[-120px] right-[-80px] w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute bottom-[-60px] left-[-40px] w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.12 } },
              }}
            >
              <motion.div variants={fadeUp} custom={0}>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-6">
                  <Sparkles className="w-4 h-4" />
                  Accelerate Your Career Growth
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight"
              >
                Upskill for the Future,{" "}
                <span className="text-primary relative">
                  Unlock Opportunities
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-3 text-primary/30"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 8 Q50 0 100 6 T200 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg md:text-xl text-muted mt-6 max-w-lg leading-relaxed"
              >
                Discover courses designed by industry experts. Learn in-demand
                tech, business, and creative skills—at your own pace. Build your
                portfolio, earn certifications, and get job-ready with
                LearnSphere.
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={3}
                className="flex flex-wrap gap-4 mt-8"
              >
                <Link
                  href="/courses"
                  className="btn-primary flex items-center gap-2 text-base px-8 py-3.5"
                >
                  Explore Courses <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-outline flex items-center gap-2 text-base px-8 py-3.5"
                >
                  Start Free
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={4}
                className="flex items-center gap-6 mt-10"
              >
                <div className="flex -space-x-2">
                  {["S", "P", "A", "M"].map((letter, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-surface flex items-center justify-center text-xs font-semibold text-white"
                      style={{
                        backgroundColor: [
                          "#6BA368",
                          "#F4A261",
                          "#5B8DB8",
                          "#9B7EC8",
                        ][i],
                      }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    500+ Happy Learners
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                    <span className="text-xs text-muted ml-1">4.9/5</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full aspect-square max-w-[480px] mx-auto">
                {/* Main card */}
                <div className="absolute inset-6 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-8">
                  <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center">
                    <GraduationCap className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground text-center">
                    Learn from the Best
                  </h3>
                  <p className="text-sm text-muted text-center max-w-[240px]">
                    Expert-led courses in technology, business, design & more
                  </p>
                  <div className="flex gap-3 mt-2">
                    <div className="px-3 py-1.5 bg-surface rounded-lg text-center">
                      <p className="text-lg font-bold text-primary">
                        {publishedCourses.length}
                      </p>
                      <p className="text-[10px] text-muted font-medium uppercase tracking-wider">
                        Courses
                      </p>
                    </div>
                    <div className="px-3 py-1.5 bg-surface rounded-lg text-center">
                      <p className="text-lg font-bold text-accent">3</p>
                      <p className="text-[10px] text-muted font-medium uppercase tracking-wider">
                        Experts
                      </p>
                    </div>
                    <div className="px-3 py-1.5 bg-surface rounded-lg text-center">
                      <p className="text-lg font-bold text-primary">500+</p>
                      <p className="text-[10px] text-muted font-medium uppercase tracking-wider">
                        Learners
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute top-3 right-3 bg-surface rounded-xl px-3 py-2 shadow-lg border border-border flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    Holistic
                  </span>
                </div>
                <div className="absolute bottom-8 left-0 bg-surface rounded-xl px-3 py-2 shadow-lg border border-border flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
                    <Play className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    100+ Lessons
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ────────────────────────────── */}
      <section className="relative z-10 -mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-surface rounded-2xl border border-border p-6 sm:p-8"
          style={{ boxShadow: "var(--shadow-card-hover)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl font-heading font-bold text-foreground">
                {publishedCourses.length}+
              </span>
              <span className="text-sm text-muted font-medium">
                Expert Courses
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <span className="text-3xl font-heading font-bold text-foreground">
                500+
              </span>
              <span className="text-sm text-muted font-medium">
                Happy Learners
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl font-heading font-bold text-foreground">
                100+
              </span>
              <span className="text-sm text-muted font-medium">
                Video Lessons
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Categories ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="text-center"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="text-sm font-semibold text-primary uppercase tracking-wider"
          >
            Browse by Topic
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2"
          >
            Explore Categories
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-10"
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={fadeUp} custom={0}>
              <Link
                href={`/courses?category=${cat.id}`}
                className="group flex flex-col items-center gap-3 p-6 bg-surface rounded-2xl border border-border transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.03]"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  {categoryIcons[cat.id] || <BookOpen className="w-6 h-6" />}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-sm text-foreground">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted mt-0.5">
                    {cat.coursesCount} courses
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Featured Courses ─────────────────────── */}
      <section className="bg-gradient-to-b from-background via-primary/[0.03] to-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.07 } },
            }}
          >
            <div className="flex items-end justify-between mb-10">
              <div>
                <motion.span
                  variants={fadeUp}
                  custom={0}
                  className="text-sm font-semibold text-primary uppercase tracking-wider"
                >
                  Learn & Grow
                </motion.span>
                <motion.h2
                  variants={fadeUp}
                  custom={1}
                  className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2"
                >
                  Featured Courses
                </motion.h2>
              </div>
              <motion.div variants={fadeUp} custom={2}>
                <Link
                  href="/courses"
                  className="hidden sm:flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all"
                >
                  View all courses <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <CourseCard
                  id={course.id}
                  title={course.title}
                  imageUrl={course.imageUrl}
                  price={course.price}
                  category={course.category.name}
                  instructor={course.instructor.name}
                  lessonsCount={course.lessons.length}
                />
              </motion.div>
            ))}
          </div>

          <div className="sm:hidden text-center mt-8">
            <Link
              href="/courses"
              className="text-primary text-sm font-semibold inline-flex items-center gap-1"
            >
              View all courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonial / Trust ──────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-surface rounded-3xl border border-border p-10 md:p-14 text-center relative overflow-hidden"
          style={{ boxShadow: "var(--shadow-card-hover)" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-yellow-500 fill-yellow-500"
              />
            ))}
          </div>
          <blockquote className="text-lg md:text-xl text-foreground leading-relaxed italic font-heading max-w-2xl mx-auto">
            &ldquo;LearnSphere has truly transformed my daily routine. The yoga
            and meditation courses are so well-structured that I feel the
            difference within weeks. Highly recommend to anyone seeking a
            balanced, healthy lifestyle.&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold text-foreground">Ananya Gupta</p>
            <p className="text-sm text-muted">Yoga Enthusiast, Mumbai</p>
          </div>
        </motion.div>
      </section>

      {/* ─── CTA Section ──────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern
              id="dots"
              x="0"
              y="0"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-primary-light/90 text-lg mt-4 max-w-xl mx-auto">
              Join 500+ learners who are already transforming their lives
              through mindful education and holistic wellness.
            </p>
            <Link
              href="/auth/register"
              className="btn-accent inline-flex items-center gap-2 mt-8 text-base px-8 py-4"
            >
              Get Started for Free <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────── */}
      <footer className="bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-heading font-bold text-foreground">
                  LearnSphere
                </span>
              </div>
              <p className="text-sm text-muted max-w-sm leading-relaxed">
                A modern learning platform dedicated to upskilling and career
                growth. Learn technology, business, design, and more from
                industry experts.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  { href: "/courses", label: "All Courses" },
                  { href: "/dashboard", label: "Dashboard" },
                  { href: "/auth/register", label: "Get Started" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-4">
                Categories
              </h4>
              <ul className="space-y-2.5">
                {categories.slice(0, 4).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/courses?category=${cat.id}`}
                      className="text-sm text-muted hover:text-primary transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted">
              &copy; 2026 LearnSphere. All rights reserved.
            </p>
            <p className="text-xs text-muted">
              Made with <span className="text-primary">♥</span> for mindful
              learners
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
