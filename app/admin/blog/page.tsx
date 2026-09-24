"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Check,
  BookOpen,
  ChevronUp,
  ChevronDown,
  Star,
  ExternalLink,
  Heading,
  Bold,
  Italic,
  List,
  Quote,
} from "lucide-react";


interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  isFeatured: boolean;
  content?: string | null;
  sections?: any;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BlogForm {
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  isFeatured: boolean;
  content: string;
}

const EMPTY_FORM: BlogForm = {
  title: "",
  slug: "",
  category: "SEO",
  excerpt: "",
  author: "RankPartner Team",
  date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  readTime: "5 min read",
  isFeatured: false,
  content: "",
};

const CATEGORY_OPTIONS = ["SEO", "PR", "Strategy", "Broadcast"];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminBlogPage() {
  const { data: apiResponse, error, isLoading, mutate } = useSWR<{ items: BlogPost[] }>("/api/blog", fetcher);
  const posts = apiResponse?.items || [];

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<BlogForm>(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const filteredPosts = useMemo(() => {
    let list = [...posts];
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
    }
    return list;
  }, [posts, selectedCategory, search]);

  const openAdd = () => {
    setForm({
      ...EMPTY_FORM,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    });
    setFormError("");
    setModalMode("add");
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost(post);
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      author: post.author,
      date: post.date,
      readTime: post.readTime,
      isFeatured: post.isFeatured,
      content: post.content || (post.sections ? JSON.stringify(post.sections, null, 2) : ""),
    });
    setFormError("");
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingPost(null);
    setFormError("");
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (newTitle: string) => {
    setForm((prev) => ({
      ...prev,
      title: newTitle,
      slug: prev.slug === "" || prev.slug === generateSlug(prev.title) ? generateSlug(newTitle) : prev.slug,
    }));
  };

  const validateForm = (): boolean => {
    if (!form.title.trim()) { setFormError("Title is required."); return false; }
    if (!form.slug.trim()) { setFormError("Slug is required."); return false; }
    if (!form.excerpt.trim()) { setFormError("Excerpt is required."); return false; }
    return true;
  };

  const handleSubmit = async () => {
    setFormError("");
    if (!validateForm()) return;

    try {
      const isAdd = modalMode === "add";
      const url = isAdd ? "/api/blog" : `/api/blog/${form.id}`;
      const method = isAdd ? "POST" : "PUT";

      let parsedSections = null;
      if (form.content.trim().startsWith("[")) {
        try {
          parsedSections = JSON.parse(form.content);
        } catch (e) {
          // Keep as string if not valid JSON
        }
      }

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        category: form.category,
        excerpt: form.excerpt.trim(),
        author: form.author.trim() || "RankPartner Team",
        date: form.date,
        readTime: form.readTime.trim() || "5 min read",
        isFeatured: form.isFeatured,
        content: parsedSections ? null : form.content,
        sections: parsedSections,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save blog post");
      }

      await mutate();
      showSuccess(isAdd ? "Blog post published successfully!" : "Blog post updated successfully!");
      closeModal();
    } catch (err: any) {
      setFormError(err.message || "An error occurred.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/blog/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await mutate();
      setDeleteTarget(null);
      showSuccess("Blog post deleted.");
    } catch (err) {
      alert("Error deleting blog post");
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="p-6 min-h-screen font-sans">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Admin</span>
            <span>/</span>
            <span className="text-slate-600">Blog Posts</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Blog & Insights Management
          </h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Add, edit, or remove articles shown on the client-facing Blog & Insights page.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 bg-[#e63939] hover:bg-[#d62828] active:scale-[0.98] text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm shadow-red-200 transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Create New Article
        </button>
      </div>

      {/* Success Toast */}
      {successMsg && (
        <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs">
          <Check className="w-3.5 h-3.5 text-green-600" />
          {successMsg}
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs px-4 py-3 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, excerpt or slug..."
            className="w-full sm:w-80 text-sm text-slate-900 bg-white text-black placeholder:text-slate-400 focus:outline-none"

          />
          {search && (
            <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {["All", ...CATEGORY_OPTIONS].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#6d28d9] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-[#6d28d9] rounded-full animate-spin"></div>
            <p className="text-slate-500 text-sm font-semibold mt-4">Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-600 font-medium">
            Failed to load blog posts.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold tracking-wider uppercase text-[11px]">
                  <th className="px-4 py-3">Article Title</th>
                  <th className="px-3 py-3 text-center">Category</th>
                  <th className="px-3 py-3 text-center">Author</th>
                  <th className="px-3 py-3 text-center">Date</th>
                  <th className="px-3 py-3 text-center">Read Time</th>
                  <th className="px-3 py-3 text-center">Featured</th>
                  <th className="px-3 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-400 font-medium">
                      No blog articles found. Click "Create New Article" to add one!
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 text-sm">{post.title}</span>
                          <span className="text-slate-400 text-[11px] truncate max-w-md mt-0.5">{post.excerpt}</span>
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10.5px] text-[#6d28d9] font-semibold hover:underline mt-1"
                          >
                            <span>/blog/{post.slug}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-50 text-[#6d28d9] border border-violet-100">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center font-medium text-slate-700">
                        {post.author}
                      </td>
                      <td className="px-3 py-3 text-center text-slate-500 whitespace-nowrap">
                        {post.date}
                      </td>
                      <td className="px-3 py-3 text-center text-slate-500 whitespace-nowrap">
                        {post.readTime}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {post.isFeatured ? (
                          <span className="inline-flex items-center gap-1 text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-bold">
                            <Star className="w-3 h-3 fill-amber-500" /> Featured
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => openEdit(post)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-violet-50 hover:text-[#6d28d9] text-slate-600 transition-all cursor-pointer"
                            title="Edit Article"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(post)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 transition-all cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Article Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h2 className="text-lg font-extrabold text-slate-900">
                {modalMode === "add" ? "Create New Article" : "Edit Article"}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-3 rounded-lg">
                {formError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. The Truth About Domain Authority and Domain Rating"
                  className="w-full px-3 py-2 text-sm text-slate-900 bg-white text-black border border-slate-300 rounded-lg focus:outline-none focus:border-[#6d28d9]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="e.g. domain-authority-explained"
                    className="w-full px-3 py-2 text-sm text-slate-900 bg-white text-black border border-slate-300 rounded-lg focus:outline-none focus:border-[#6d28d9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 text-sm text-slate-900 bg-white text-black border border-slate-300 rounded-lg focus:outline-none focus:border-[#6d28d9]"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat} className="text-slate-900 bg-white">{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Excerpt *</label>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="A short 1-2 sentence summary shown on the blog cards grid..."
                  className="w-full px-3 py-2 text-sm text-slate-900 bg-white text-black border border-slate-300 rounded-lg focus:outline-none focus:border-[#6d28d9]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2 text-sm text-slate-900 bg-white text-black border border-slate-300 rounded-lg focus:outline-none focus:border-[#6d28d9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                    placeholder="June 12, 2026"
                    className="w-full px-3 py-2 text-sm text-slate-900 bg-white text-black border border-slate-300 rounded-lg focus:outline-none focus:border-[#6d28d9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm((prev) => ({ ...prev, readTime: e.target.value }))}
                    placeholder="5 min read"
                    className="w-full px-3 py-2 text-sm text-slate-900 bg-white text-black border border-slate-300 rounded-lg focus:outline-none focus:border-[#6d28d9]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={form.isFeatured}
                  onChange={(e) => setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                  className="w-4 h-4 text-[#6d28d9] rounded border-slate-300 focus:ring-[#6d28d9]"
                />
                <label htmlFor="isFeatured" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Feature this article at the top of the blog page (Hero banner position)
                </label>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Full Article Body / Content *
                  </label>

                  {/* Formatting Toolbar */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, content: `${prev.content}\n\n## Section Heading Title\n` }))}
                      className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-[11px] font-bold text-slate-800 flex items-center gap-1 cursor-pointer"
                      title="Add Heading (H2)"
                    >
                      <Heading className="w-3 h-3 text-[#6d28d9]" />
                      <span>H2</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, content: `${prev.content}\n\n### Subheading Title\n` }))}
                      className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-[11px] font-bold text-slate-800 flex items-center gap-1 cursor-pointer"
                      title="Add Subheading (H3)"
                    >
                      <Heading className="w-3 h-3 text-slate-600" />
                      <span>H3</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, content: `${prev.content} **bold text** ` }))}
                      className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-[11px] font-bold text-slate-800 flex items-center gap-1 cursor-pointer"
                      title="Add Bold Text (**bold**)"
                    >
                      <Bold className="w-3 h-3 text-slate-800" />
                      <span>Bold</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, content: `${prev.content} *italic text* ` }))}
                      className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-[11px] font-bold text-slate-800 flex items-center gap-1 cursor-pointer"
                      title="Add Italic Text (*italic*)"
                    >
                      <Italic className="w-3 h-3 text-slate-800" />
                      <span>Italic</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, content: `${prev.content}\n- Bullet item 1\n- Bullet item 2\n` }))}
                      className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-[11px] font-bold text-slate-800 flex items-center gap-1 cursor-pointer"
                      title="Add Bulleted List (- item)"
                    >
                      <List className="w-3 h-3 text-slate-800" />
                      <span>List</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, content: `${prev.content}\n> Important quote text here\n` }))}
                      className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-[11px] font-bold text-slate-800 flex items-center gap-1 cursor-pointer"
                      title="Add Quote Block (> quote)"
                    >
                      <Quote className="w-3 h-3 text-slate-800" />
                      <span>Quote</span>
                    </button>
                  </div>
                </div>

                <textarea
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter main article body. Click buttons above to insert Headings (## H2), Bold (**text**), Lists (- item), etc."
                  className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white text-black border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-[#6d28d9] shadow-xs"
                />
              </div>

            </div>


            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-[#6d28d9] hover:bg-[#5b21b6] text-white shadow-sm transition-all cursor-pointer"
              >
                {modalMode === "add" ? "Publish Article" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">Delete Blog Article?</h3>
            <p className="text-xs text-slate-500 mb-6">
              Are you sure you want to delete <span className="font-bold text-slate-800">"{deleteTarget.title}"</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm cursor-pointer"
              >
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
