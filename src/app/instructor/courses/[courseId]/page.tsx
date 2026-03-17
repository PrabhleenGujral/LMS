import { getCourseById, courses } from "@/lib/dummy-data";
import InstructorCourseClient from "./InstructorCourseClient";

export async function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }));
}

interface InstructorCoursePageProps {
  params: { courseId: string };
}

export default function InstructorCoursePage({
  params,
}: InstructorCoursePageProps) {
  const { courseId } = params;
  const course = getCourseById(courseId);
  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-muted text-lg">Course not found</p>
        <a
          href="/instructor/courses"
          className="text-primary font-semibold hover:underline mt-2 inline-block"
        >
          Back to courses
        </a>
      </div>
    );
  }
  return <InstructorCourseClient course={course} />;
}
