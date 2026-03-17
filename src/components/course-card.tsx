"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Clock, Star, User } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string | null;
  price: number | null;
  category: string | null;
  instructor: string | null;
  lessonsCount: number;
}

const gradients = [
  "from-emerald-400/20 via-green-300/10 to-teal-200/20",
  "from-orange-300/20 via-amber-200/10 to-yellow-200/20",
  "from-blue-300/20 via-indigo-200/10 to-purple-200/20",
  "from-rose-300/20 via-pink-200/10 to-fuchsia-200/20",
  "from-teal-300/20 via-cyan-200/10 to-sky-200/20",
  "from-violet-300/20 via-purple-200/10 to-indigo-200/20",
];

const icons = ["🧘", "🌿", "🧠", "🌸", "☀️", "🌱", "💚", "🕊️"];

export function CourseCard({
  id,
  title,
  imageUrl,
  price,
  category,
  instructor,
  lessonsCount,
}: CourseCardProps) {
  // Generate consistent gradient/icon from the id
  const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const gradient = gradients[hash % gradients.length];
  const icon = icons[hash % icons.length];

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Link href={`/courses/${id}`} className="block group">
        <div
          className="bg-surface rounded-2xl border border-border overflow-hidden transition-all duration-300 group-hover:border-primary/20"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {/* Image / Placeholder */}
          <div
            className={`relative aspect-[16/10] bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="text-5xl">{icon}</span>
              </div>
            )}
            {category && (
              <span className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm text-[11px] font-semibold text-primary px-3 py-1 rounded-full border border-border/50">
                {category}
              </span>
            )}
            {price != null && price === 0 && (
              <span className="absolute top-3 right-3 bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                FREE
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-heading font-semibold text-foreground text-[15px] leading-snug line-clamp-2 group-hover:text-primary transition-colors min-h-[2.7rem]">
              {title}
            </h3>

            <div className="flex items-center gap-3 mt-3 text-xs text-muted">
              {instructor && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {instructor}
                </span>
              )}
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {lessonsCount} lessons
              </span>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/60">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-medium text-foreground">4.8</span>
                <span className="text-xs text-muted">(120+)</span>
              </div>
              <span className="font-heading font-bold text-lg text-primary">
                {price != null && price > 0 ? `₹${price.toLocaleString()}` : "Free"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
