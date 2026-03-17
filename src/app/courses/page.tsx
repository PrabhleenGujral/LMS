"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { courses, categories } from "@/lib/dummy-data";
import { CourseCard } from "@/components/course-card";
import { Search, SlidersHorizontal, X } from "lucide-react";

function CoursesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredCourses = useMemo(() => {
    let result = courses.filter((c) => c.isPublished);

    if (selectedCategory) {
      result = result.filter((c) => c.categoryId === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.instructor.name.toLowerCase().includes(q)
      );
    }

    return result;
  }, [searchQuery, selectedCategory]);

  const activeCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-heading font-bold text-foreground"
        >
          {activeCategory ? activeCategory.name : "All Courses"}
        </motion.h1>
        <p className="text-muted mt-2">
          {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} available
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 mb-10">
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, description, or instructor..."
            className="input-field pl-11 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background flex items-center justify-center hover:bg-border transition-colors"
            >
              <X className="w-3 h-3 text-muted" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 text-muted mr-1" />
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              !selectedCategory
                ? "bg-primary text-white shadow-sm"
                : "bg-surface border border-border text-muted hover:text-foreground hover:border-primary/30"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface border border-border text-muted hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Search className="w-7 h-7 text-primary" />
          </div>
          <p className="text-foreground font-heading font-semibold text-lg">
            No courses found
          </p>
          <p className="text-muted text-sm mt-1 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("");
            }}
            className="btn-outline text-sm px-5 py-2"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted mt-4 text-sm">Loading courses...</p>
        </div>
      }
    >
      <CoursesContent />
    </Suspense>
  );
}
