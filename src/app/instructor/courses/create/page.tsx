"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { categories } from "@/lib/dummy-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      router.push("/instructor/courses");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/instructor/courses"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          My Courses
        </Link>

        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          Create New Course
        </h1>
        <p className="text-muted mb-8">
          Fill in the details below to create a new course.
        </p>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/8 border border-primary/20 text-primary text-sm px-4 py-3 rounded-xl mb-6"
          >
            Course created successfully! Redirecting...
          </motion.div>
        )}

        <div
          className="bg-surface rounded-2xl border border-border p-7"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="label">
                Course Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                placeholder="e.g., Mindful Living 101"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field min-h-[120px] resize-y"
                placeholder="Describe what students will learn..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="label">
                  Price (INR)
                </label>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input-field"
                  placeholder="0 for free"
                  min="0"
                  step="1"
                />
              </div>
              <div>
                <label htmlFor="category" className="label">
                  Category
                </label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="imageUrl" className="label">
                Thumbnail URL
              </label>
              <input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="input-field"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary">
                Create Course
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
