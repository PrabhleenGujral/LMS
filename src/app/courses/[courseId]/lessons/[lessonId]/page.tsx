import { getCourseById } from "@/lib/dummy-data";
import LessonClient from "./LessonClient";
import { courses } from "@/lib/dummy-data";

export async function generateStaticParams() {
  const params = [];
  for (const course of courses) {
    for (const lesson of course.lessons) {
      params.push({ courseId: course.id, lessonId: lesson.id });
    }
  }
  return params;
}

interface LessonPageProps {
  params: { courseId: string; lessonId: string };
}

export default function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = params;
  const course = getCourseById(courseId);
  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-muted text-lg">Course not found</p>
        <a
          href="/courses"
          className="text-primary font-semibold hover:underline mt-2 inline-block"
        >
          Browse courses
        </a>
      </div>
    );
  }
  const publishedLessons = course.lessons.filter((l) => l.isPublished);
  const currentLesson = publishedLessons.find((l) => l.id === lessonId);
  if (!currentLesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-muted text-lg">Lesson not found</p>
        <a
          href={`/courses/${courseId}`}
          className="text-primary font-semibold hover:underline mt-2 inline-block"
        >
          Back to course
        </a>
      </div>
    );
  }
  return (
    <LessonClient
      course={course}
      lessonId={lessonId}
      publishedLessons={publishedLessons}
      currentLesson={currentLesson}
      courseId={courseId}
    />
  );
}
