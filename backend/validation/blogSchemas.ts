import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(2, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  excerpt: z.string().min(5, "Excerpt must be at least 5 characters"),
  author: z.string().default("RankPartner Team"),
  date: z.string().default(() => new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })),
  readTime: z.string().default("5 min read"),
  isFeatured: z.boolean().default(false),
  content: z.string().optional(),
  sections: z.any().optional(),
  isActive: z.boolean().default(true),
});

export const updateBlogPostSchema = blogPostSchema.partial();

export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
