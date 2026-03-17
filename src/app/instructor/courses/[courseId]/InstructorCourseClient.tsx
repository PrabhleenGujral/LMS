"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Clock, Users, Star } from "lucide-react";

export default function InstructorCourseClient({ course }: any) {
  // Example: you can add client-side logic here if needed
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-heading font-bold mb-4 text-foreground">
        {course.title}
      </h1>
      <div className="flex items-center gap-4 mb-6 text-muted">
        <span className="flex items-center gap-1">
          <BookOpen className="w-4 h-4" /> {course.lessons.length} Lessons
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4" /> {course.enrollments} Enrolled
        </span>
        <span className="flex items-center gap-1">
          <Star className="w-4 h-4" /> {course.rating}
        </span>
      </div>
      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: course.description }}
      />
      <h2 className="text-xl font-semibold mb-2">Lessons</h2>
      <ul className="space-y-2">
        {course.lessons.map((lesson: any) => (
          <li key={lesson.id} className="flex items-center gap-2 text-muted">
            <Clock className="w-4 h-4" />
            <span>{lesson.title}</span>
            <span className="ml-auto text-xs">{lesson.duration}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/courses/${course.id}`}
        className="btn-primary mt-8 inline-block"
      >
        View as Student
      </Link>
    </div>
  );
}
