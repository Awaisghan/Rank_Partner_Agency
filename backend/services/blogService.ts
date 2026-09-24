import { prisma } from "@/backend/db/prisma";
import type {
  BlogPostInput,
  UpdateBlogPostInput,
} from "@/backend/validation/blogSchemas";

export async function getBlogPosts(options?: {
  search?: string;
  category?: string;
  activeOnly?: boolean;
}) {
  const { search, category, activeOnly = true } = options || {};

  const where: any = {};

  if (activeOnly) {
    where.isActive = true;
  }

  if (category) {
    where.category = category;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
    ];
  }

  return prisma.blogPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlogPostBySlugOrId(slugOrId: string) {
  return prisma.blogPost.findFirst({
    where: {
      OR: [{ slug: slugOrId }, { id: slugOrId }],
    },
  });
}

export async function createBlogPost(data: BlogPostInput) {
  return prisma.blogPost.create({
    data: {
      title: data.title,
      slug: data.slug,
      category: data.category,
      excerpt: data.excerpt,
      author: data.author,
      date: data.date,
      readTime: data.readTime,
      isFeatured: data.isFeatured,
      content: data.content,
      sections: data.sections,
      isActive: data.isActive,
    },
  });
}

export async function updateBlogPost(
  id: string,
  data: UpdateBlogPostInput
) {
  return prisma.blogPost.update({
    where: { id },
    data,
  });
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({
    where: { id },
  });

  return true;
}
