import { getCourseById, courses } from "@/lib/dummy-data";

export async function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }));
}

interface CourseDetailPageProps {
  params: { courseId: string };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { courseId } = params;
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
  // You can move client logic to a child component if needed
  // For now, render basic course info for static export
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-heading font-bold mb-4 text-foreground">
        {course.title}
      </h1>
      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: course.description }}
      />
      <h2 className="text-xl font-semibold mb-2">Lessons</h2>
      <ul className="space-y-2">
        {course.lessons.map((lesson) => (
          <li key={lesson.id} className="flex items-center gap-2 text-muted">
            <span>{lesson.title}</span>
            <span className="ml-auto text-xs">{lesson.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
