export interface Category {
  id: string;
  name: string;
  coursesCount: number;
}

export interface Instructor {
  id: string;
  name: string;
  image: string | null;
  bio: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  duration: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  price: number;
  isPublished: boolean;
  categoryId: string;
  category: Category;
  instructor: Instructor;
  lessons: Lesson[];
  enrollments: number;
  rating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: "USER" | "INSTRUCTOR" | "ADMIN";
  enrolledCourseIds: string[];
  completedLessonIds: string[];
}

// ─── Categories ──────────────────────────────────────────

export const categories: Category[] = [
  { id: "cat-1", name: "Web Development", coursesCount: 4 },
  { id: "cat-2", name: "Data Science & AI", coursesCount: 3 },
  { id: "cat-3", name: "Business & Management", coursesCount: 2 },
  { id: "cat-4", name: "Design & Creativity", coursesCount: 2 },
  { id: "cat-5", name: "Productivity & Tools", coursesCount: 1 },
  { id: "cat-6", name: "Career Growth", coursesCount: 1 },
];

// ─── Instructors ─────────────────────────────────────────

export const instructors: Instructor[] = [
  {
    id: "inst-1",
    name: "Subah Jain",
    image: null,
    bio: "Co-founder of LearnSphere. Passionate about spreading wellness through natural living and yoga.",
  },
  {
    id: "inst-2",
    name: "Dr. Priya Sharma",
    image: null,
    bio: "Ayurvedic practitioner with 15+ years of experience in holistic health and nutrition.",
  },
  {
    id: "inst-3",
    name: "Arjun Mehta",
    image: null,
    bio: "Certified yoga instructor and meditation coach, helping people find inner peace.",
  },
];

// ─── Courses ──────────────────────────────────────────────

export const courses: Course[] = [
  {
    id: "course-1",
    title: "Full Stack Web Development Bootcamp",
    description: `<p>Master modern web development with hands-on projects in HTML, CSS, JavaScript, React, Node.js, and more. Build real-world apps and launch your tech career!</p>
    <h3>What you'll learn:</h3>
    <ul>
      <li>Responsive website design</li>
      <li>JavaScript ES6+ and React fundamentals</li>
      <li>Backend APIs with Node.js & Express</li>
      <li>Database integration (MongoDB)</li>
      <li>Deploying apps to the cloud</li>
    </ul>`,
    imageUrl: null,
    price: 1499,
    isPublished: true,
    categoryId: "cat-1",
    category: { id: "cat-1", name: "Web Development", coursesCount: 4 },
    instructor: instructors[0],
    enrollments: 2100,
    rating: 4.9,
    lessons: [
      {
        id: "l-1-1",
        title: "Introduction to Web Development",
        description: "Overview of the web ecosystem and career paths.",
        videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
        position: 1,
        isPublished: true,
        isFree: true,
        duration: "8:30",
      },
      {
        id: "l-1-2",
        title: "HTML & CSS Basics",
        description: "Learn to structure and style web pages.",
        videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
        position: 2,
        isPublished: true,
        isFree: true,
        duration: "12:00",
      },
      {
        id: "l-1-3",
        title: "JavaScript Essentials",
        description: "Core programming concepts for the web.",
        videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
        position: 3,
        isPublished: true,
        isFree: false,
        duration: "18:00",
      },
      {
        id: "l-1-4",
        title: "React Fundamentals",
        description: "Build interactive UIs with React.",
        videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
        position: 4,
        isPublished: true,
        isFree: false,
        duration: "20:00",
      },
      {
        id: "l-1-5",
        title: "Node.js & Express",
        description: "Create backend APIs and connect to databases.",
        videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
        position: 5,
        isPublished: true,
        isFree: false,
        duration: "22:00",
      },
    ],
  },
  {
    id: "course-2",
    title: "Data Science & Machine Learning with Python",
    description: `<p>Analyze data, build predictive models, and unlock insights using Python, Pandas, scikit-learn, and more. No prior experience required!</p>
    <h3>What you'll learn:</h3>
    <ul>
      <li>Python for data analysis</li>
      <li>Data visualization with Matplotlib & Seaborn</li>
      <li>Machine learning algorithms</li>
      <li>Real-world projects and datasets</li>
      <li>Deploying ML models</li>
    </ul>`,
    imageUrl: null,
    price: 1799,
    isPublished: true,
    categoryId: "cat-2",
    category: { id: "cat-2", name: "Data Science & AI", coursesCount: 3 },
    instructor: instructors[1],
    enrollments: 1800,
    rating: 4.8,
    lessons: [
      {
        id: "l-2-1",
        title: "Getting Started with Python",
        description: "Python basics for data science.",
        videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        position: 1,
        isPublished: true,
        isFree: true,
        duration: "10:00",
      },
      {
        id: "l-2-2",
        title: "Data Analysis with Pandas",
        description: "Manipulate and analyze data efficiently.",
        videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        position: 2,
        isPublished: true,
        isFree: false,
        duration: "15:00",
      },
      {
        id: "l-2-3",
        title: "Machine Learning Basics",
        description: "Build your first ML model.",
        videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        position: 3,
        isPublished: true,
        isFree: false,
        duration: "20:00",
      },
    ],
  },
  {
    id: "course-3",
    title: "Business Strategy & Leadership Essentials",
    description: `<p>Develop critical business skills, strategic thinking, and leadership qualities to excel in any organization.</p>
    <h3>What you'll learn:</h3>
    <ul>
      <li>Business models and frameworks</li>
      <li>Effective communication & leadership</li>
      <li>Project management basics</li>
      <li>Case studies and real-world scenarios</li>
    </ul>`,
    imageUrl: null,
    price: 1299,
    isPublished: true,
    categoryId: "cat-3",
    category: { id: "cat-3", name: "Business & Management", coursesCount: 2 },
    instructor: instructors[2],
    enrollments: 950,
    rating: 4.7,
    lessons: [
      {
        id: "l-3-1",
        title: "Introduction to Business Strategy",
        description: "Key concepts and frameworks.",
        videoUrl: "https://www.youtube.com/watch?v=2vj37yeQQHg",
        position: 1,
        isPublished: true,
        isFree: true,
        duration: "9:00",
      },
      {
        id: "l-3-2",
        title: "Leadership in Practice",
        description: "Developing your leadership style.",
        videoUrl: "https://www.youtube.com/watch?v=2vj37yeQQHg",
        position: 2,
        isPublished: true,
        isFree: false,
        duration: "14:00",
      },
    ],
  },
  {
    id: "course-4",
    title: "UI/UX Design Fundamentals",
    description: `<p>Learn the principles of user interface and user experience design. Create beautiful, user-friendly digital products.</p>
    <h3>What you'll learn:</h3>
    <ul>
      <li>Design thinking process</li>
      <li>Wireframing and prototyping</li>
      <li>Visual design basics</li>
      <li>Usability testing</li>
    </ul>`,
    imageUrl: null,
    price: 1199,
    isPublished: true,
    categoryId: "cat-4",
    category: { id: "cat-4", name: "Design & Creativity", coursesCount: 2 },
    instructor: instructors[0],
    enrollments: 1200,
    rating: 4.8,
    lessons: [
      {
        id: "l-4-1",
        title: "What is UI/UX Design?",
        description: "Introduction to the field.",
        videoUrl: "https://www.youtube.com/watch?v=3Yy7b2b1H9Q",
        position: 1,
        isPublished: true,
        isFree: true,
        duration: "7:30",
      },
      {
        id: "l-4-2",
        title: "Wireframing Basics",
        description: "Sketching your first app.",
        videoUrl: "https://www.youtube.com/watch?v=3Yy7b2b1H9Q",
        position: 2,
        isPublished: true,
        isFree: false,
        duration: "12:00",
      },
    ],
  },
  {
    id: "course-5",
    title: "Advanced Vinyasa Flow: Strength & Grace",
    description: `<p>Ready to take your yoga practice to the next level? This advanced vinyasa course builds strength, flexibility, and body awareness through dynamic flowing sequences.</p>`,
    imageUrl: null,
    price: 1199,
    isPublished: true,
    categoryId: "cat-1",
    category: { id: "cat-1", name: "Web Development", coursesCount: 4 },
    instructor: instructors[2],
    enrollments: 423,
    rating: 4.9,
    lessons: [
      {
        id: "l-5-1",
        title: "Warm-Up Flow",
        description: "Prepare your body for advanced practice.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 1,
        isPublished: true,
        isFree: true,
        duration: "10:00",
      },
      {
        id: "l-5-2",
        title: "Sun Salutation Variations",
        description: "Creative variations of Surya Namaskar.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 2,
        isPublished: true,
        isFree: false,
        duration: "22:00",
      },
      {
        id: "l-5-3",
        title: "Arm Balances Masterclass",
        description: "Learn crow pose, side crow, and flying pigeon.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 3,
        isPublished: true,
        isFree: false,
        duration: "28:30",
      },
      {
        id: "l-5-4",
        title: "Inversions & Headstands",
        description: "Safely build up to headstand and shoulderstand.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 4,
        isPublished: true,
        isFree: false,
        duration: "25:00",
      },
      {
        id: "l-5-5",
        title: "Full 60-Minute Flow",
        description: "A complete advanced vinyasa class.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 5,
        isPublished: true,
        isFree: false,
        duration: "60:00",
      },
    ],
  },
  {
    id: "course-6",
    title: "Natural Home Remedies: Kitchen Pharmacy",
    description: `<p>Your kitchen holds powerful healing ingredients. Learn how to use common spices, herbs, and foods as natural remedies for everyday health concerns.</p>`,
    imageUrl: null,
    price: 0,
    isPublished: true,
    categoryId: "cat-5",
    category: { id: "cat-5", name: "Productivity & Tools", coursesCount: 1 },
    instructor: instructors[0],
    enrollments: 3456,
    rating: 4.8,
    lessons: [
      {
        id: "l-6-1",
        title: "Your Kitchen as a Pharmacy",
        description: "Introduction to natural remedies from your kitchen.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 1,
        isPublished: true,
        isFree: true,
        duration: "8:00",
      },
      {
        id: "l-6-2",
        title: "Turmeric: The Golden Healer",
        description: "10 ways to use turmeric for health.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 2,
        isPublished: true,
        isFree: true,
        duration: "12:00",
      },
      {
        id: "l-6-3",
        title: "Ginger & Honey Remedies",
        description: "Powerful combinations for immunity.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 3,
        isPublished: true,
        isFree: true,
        duration: "10:30",
      },
    ],
  },
  {
    id: "course-7",
    title: "Mindful Living: A 21-Day Transformation",
    description: `<p>Transform your daily life with mindfulness. This 21-day guided program helps you cultivate awareness, reduce stress, and find joy in everyday moments.</p>`,
    imageUrl: null,
    price: 699,
    isPublished: true,
    categoryId: "cat-6",
    category: { id: "cat-6", name: "Career Growth", coursesCount: 1 },
    instructor: instructors[2],
    enrollments: 789,
    rating: 4.7,
    lessons: [
      {
        id: "l-7-1",
        title: "Day 1: Waking Up Mindfully",
        description: "Start your journey with morning awareness.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 1,
        isPublished: true,
        isFree: true,
        duration: "6:00",
      },
      {
        id: "l-7-2",
        title: "Day 2: Mindful Eating",
        description: "Transform your relationship with food.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 2,
        isPublished: true,
        isFree: false,
        duration: "8:00",
      },
      {
        id: "l-7-3",
        title: "Day 3: Walking Meditation",
        description: "Find peace in every step.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 3,
        isPublished: true,
        isFree: false,
        duration: "10:00",
      },
      {
        id: "l-7-4",
        title: "Day 4: Digital Detox",
        description: "Reclaim your attention from screens.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 4,
        isPublished: true,
        isFree: false,
        duration: "7:30",
      },
      {
        id: "l-7-5",
        title: "Day 5: Gratitude Practice",
        description: "Cultivate thankfulness as a daily habit.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 5,
        isPublished: true,
        isFree: false,
        duration: "9:00",
      },
    ],
  },
  {
    id: "course-8",
    title: "Immunity Boosting with Ayurvedic Foods",
    description: `<p>Strengthen your body's natural defenses with time-tested Ayurvedic nutrition strategies. Learn to prepare immunity-boosting kadhas, meals, and supplements.</p>`,
    imageUrl: null,
    price: 899,
    isPublished: true,
    categoryId: "cat-2",
    category: { id: "cat-2", name: "Data Science & AI", coursesCount: 3 },
    instructor: instructors[1],
    enrollments: 1102,
    rating: 4.8,
    lessons: [
      {
        id: "l-8-1",
        title: "Understanding Immunity in Ayurveda",
        description: "The Ayurvedic perspective on immune health.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 1,
        isPublished: true,
        isFree: true,
        duration: "11:00",
      },
      {
        id: "l-8-2",
        title: "The Immunity Kadha Recipe",
        description: "Prepare the famous healing drink at home.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 2,
        isPublished: true,
        isFree: false,
        duration: "9:30",
      },
      {
        id: "l-8-3",
        title: "Immunity-Boosting Meals",
        description: "Complete meal plans for stronger immunity.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 3,
        isPublished: true,
        isFree: false,
        duration: "18:00",
      },
      {
        id: "l-8-4",
        title: "Seasonal Immunity Guide",
        description: "Adapt your diet for every season.",
        videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        position: 4,
        isPublished: true,
        isFree: false,
        duration: "13:00",
      },
    ],
  },
];

// ─── Current User (simulated logged-in user) ─────────────

export const currentUser: User = {
  id: "user-1",
  name: "Priya Patel",
  email: "priya@example.com",
  image: null,
  role: "INSTRUCTOR",
  enrolledCourseIds: ["course-1", "course-3", "course-6"],
  completedLessonIds: [
    "l-1-1",
    "l-1-2",
    "l-1-3",
    "l-3-1",
    "l-3-2",
    "l-6-1",
    "l-6-2",
    "l-6-3",
  ],
};

// ─── Helpers ──────────────────────────────────────────────

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getCoursesByCategory(categoryId: string): Course[] {
  return courses.filter((c) => c.categoryId === categoryId);
}

export function searchCourses(query: string): Course[] {
  const q = query.toLowerCase();
  return courses.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.instructor.name.toLowerCase().includes(q)
  );
}

export function isEnrolled(courseId: string): boolean {
  return currentUser.enrolledCourseIds.includes(courseId);
}

export function isLessonCompleted(lessonId: string): boolean {
  return currentUser.completedLessonIds.includes(lessonId);
}
