"use client";

import React, { useState } from "react";
import useSWR from "swr";
import {
  Share2,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ExternalLink,
  HelpCircle,
  AlertTriangle,
  ImageIcon,
} from "lucide-react";

// Inline Social Icon Components
const InstagramIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

interface SocialPostPublication {
  id: string;
  name: string;
  category: string;
  logoText: string;
  logoBg: string;
  logoTextColor: string;
  platforms: ("facebook" | "instagram" | "x" | "linkedin")[];
  price: string;
  tat: string;
  exampleUrl?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SocialPostAdminPage() {
  const { data: apiResponse, error, isLoading, mutate } = useSWR<{items: SocialPostPublication[], pagination: any}>("/api/social-posts", fetcher);
  const items = apiResponse?.items || [];

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [currentItem, setCurrentItem] = useState<SocialPostPublication | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SocialPostPublication | null>(null);

  const [form, setForm] = useState({
    name: "",
    category: "News",
    logoText: "",
    logoBg: "#000000",
    logoTextColor: "#ffffff",
    logoFile: null as File | null,
    logoUrl: "",
    platforms: ["facebook", "instagram"] as ("facebook" | "instagram" | "x" | "linkedin")[],
    price: "$750",
    tat: "3-5 Days",
    exampleUrl: "",
  });

  const categories = ["News", "Entertainment", "Sports", "Business"];

  const filtered = items.filter((i) => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? i.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const openAdd = () => {
    setForm({
      name: "",
      category: "News",
      logoText: "",
      logoBg: "#000000",
      logoTextColor: "#ffffff",
      logoFile: null,
      logoUrl: "",
      platforms: ["facebook"],
      price: "$750",
      tat: "3-5 Days",
      exampleUrl: "",
    });
    setCurrentItem(null);
    setModalMode("add");
  };

  const openEdit = (item: SocialPostPublication) => {
    setCurrentItem(item);
    setForm({
      name: item.name,
      category: item.category,
      logoText: item.logoText,
      logoBg: item.logoBg,
      logoTextColor: item.logoTextColor,
      logoFile: null,
      logoUrl: (item as any).logoUrl ?? "",
      platforms: item.platforms,
      price: item.price,
      tat: item.tat,
      exampleUrl: item.exampleUrl ?? "",
    });
    setModalMode("edit");
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return;

    // Upload logo file first if present
    let finalLogoUrl = form.logoUrl;
    if (form.logoFile) {
      try {
        const fd = new FormData();
        fd.append("file", form.logoFile);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
        if (!uploadRes.ok) throw new Error("Logo upload failed");
        const uploadData = await uploadRes.json();
        finalLogoUrl = uploadData.url;
      } catch { return; }
    }

    const built = {
      id: currentItem?.id ?? "",
      name: form.name,
      category: form.category,
      logoText: (form.logoText || form.name.slice(0, 4)).toUpperCase().slice(0, 4),
      logoBg: form.logoBg,
      logoTextColor: form.logoTextColor,
      logoUrl: finalLogoUrl || undefined,
      platforms: form.platforms,
      price: form.price,
      tat: form.tat,
      exampleUrl: form.exampleUrl.trim() || undefined,
    };

    if (!built.id) delete (built as any).id;

    try {
      const isAdd = modalMode === "add";
      const url = isAdd ? "/api/social-posts" : `/api/social-posts/${built.id}`;
      const method = isAdd ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(built),
      });

      if (!res.ok) throw new Error("Failed to save");
      
      await mutate();
      setModalMode(null);
    } catch (err) {
      alert("Error saving item");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/social-posts/${deleteTarget.id}?hard=true`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await mutate();
      setDeleteTarget(null);
    } catch (err) {
      alert("Error deleting item");
    }
  };

  const togglePlatform = (p: "facebook" | "instagram" | "x" | "linkedin") => {
    if (form.platforms.includes(p)) {
      setForm({ ...form, platforms: form.platforms.filter((x) => x !== p) });
    } else {
      setForm({ ...form, platforms: [...form.platforms, p] });
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold mb-1">
            <Share2 className="w-3.5 h-3.5" />
            <span>Admin</span>
            <span>/</span>
            <span className="text-slate-600">Social Post</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Social Post
          </h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Manage publisher social media posts, platform channels &amp; turnaround times.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 bg-[#e63939] hover:bg-[#d62828] text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Social Post Publication
        </button>
      </div>

      {/* Top Banner with Search & Category Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs px-5 py-3.5 mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search & Category Pills */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search publication name..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(isSelected ? null : cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Info Subtext */}
        <div className="text-[11.5px] font-medium text-slate-400 text-right whitespace-nowrap w-full lg:w-auto">
          Services on this page include a social post only -- no article.
        </div>
      </div>

      {/* Counter Header */}
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-lg font-black text-slate-900 tracking-tight">Social Post</h2>
        <span className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
          SHOWING {filtered.length} OF {items.length} PUBLICATIONS
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center">
             <div className="w-8 h-8 border-4 border-slate-200 border-t-[#e63939] rounded-full animate-spin"></div>
             <p className="text-slate-500 text-sm font-semibold mt-4">Loading from database...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-600 font-medium">Failed to load data.</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-slate-200">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-slate-600 font-bold tracking-wider uppercase text-[11px]">
                <th className="px-4 py-3 text-left">PUBLICATION NAME</th>
                <th className="px-4 py-3 text-center">PLATFORM</th>
                <th className="px-4 py-3 text-center">PRICE</th>
                <th className="px-3.5 py-3 text-center">
                  <span className="inline-flex items-center justify-center gap-0.5">
                    TAT <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                </th>
                <th className="px-4 py-3 text-center">EXAMPLE LINK</th>
                <th className="px-3 py-3 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* PUBLICATION NAME */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      {(item as any).logoUrl ? (
                        <img src={(item as any).logoUrl} alt={item.name} className="w-11 h-11 rounded-full object-cover shrink-0 shadow-xs border border-slate-200/60" />
                      ) : (
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-xs leading-none"
                          style={{
                            backgroundColor: item.logoBg ?? "#000",
                            color: item.logoTextColor ?? "#fff",
                          }}
                        >
                          {item.logoText}
                        </div>
                      )}
                      <span className="font-bold text-slate-900 text-[13px]">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  {/* PLATFORM ICONS */}
                  <td className="px-4 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {item.platforms.includes("instagram") && (
                        <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-2xs" title="Instagram">
                          <InstagramIcon />
                        </div>
                      )}
                      {item.platforms.includes("x") && (
                        <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center font-black text-[10px] shadow-2xs" title="Twitter / X">
                          X
                        </div>
                      )}
                      {item.platforms.includes("facebook") && (
                        <div className="w-6 h-6 rounded-md bg-[#1877f2] text-white flex items-center justify-center shadow-2xs" title="Facebook">
                          <FacebookIcon />
                        </div>
                      )}
                      {item.platforms.includes("linkedin") && (
                        <div className="w-6 h-6 rounded-md bg-[#0a66c2] text-white flex items-center justify-center shadow-2xs" title="LinkedIn">
                          <LinkedinIcon />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="px-4 py-3.5 text-center font-black text-slate-900 text-[13.5px]">
                    {item.price}
                  </td>

                  {/* TAT */}
                  <td className="px-3.5 py-3.5 text-center font-semibold text-slate-800 text-[12.5px] whitespace-nowrap">
                    {item.tat}
                  </td>

                  {/* EXAMPLE LINK */}
                  <td className="px-4 py-3.5 text-center whitespace-nowrap">
                    {item.exampleUrl ? (
                      <a
                        href={item.exampleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[#28a745] hover:underline text-[12px]"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3 stroke-[2.2]" />
                      </a>
                    ) : (
                      <span className="text-slate-400 text-sm">--</span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-3 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1 rounded-lg bg-slate-100 hover:bg-violet-50 hover:text-[#6d28d9] text-slate-500 transition-all cursor-pointer"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="p-1 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 transition-all cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 my-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-slate-900 text-base">
                {modalMode === "add" ? "Add Social Post Publication" : "Edit Social Post"}
              </h3>
              <button
                onClick={() => setModalMode(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              {/* Logo Upload */}
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase">Publication Logo</label>
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    {(form.logoFile || form.logoUrl) ? (
                      <img src={form.logoFile ? URL.createObjectURL(form.logoFile) : form.logoUrl} alt="Logo" className="w-12 h-12 rounded-full object-cover shadow border border-slate-200" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                        <ImageIcon className="w-5 h-5 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <label className="flex-1 flex items-center gap-2 border border-dashed border-slate-300 rounded-lg px-3 py-2 cursor-pointer hover:border-[#e63939] hover:bg-red-50/30 transition-all">
                    <ImageIcon className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500">{form.logoFile ? form.logoFile.name : (form.logoUrl ? "Change logo..." : "Upload logo...")}</span>
                    <input type="file" className="hidden" accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      onChange={(e) => { const file = e.target.files?.[0]; if (file) setForm({ ...form, logoFile: file }); }} />
                  </label>
                  {(form.logoFile || form.logoUrl) && (
                    <button type="button" onClick={() => setForm({ ...form, logoFile: null, logoUrl: "" })} className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP, SVG -- Max 2MB</p>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase">Publication Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-slate-900"
                  placeholder="The Gazette"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Price *</label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="$750"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase">Platforms</label>
                <div className="flex items-center gap-2 mt-1">
                  {(["instagram", "x", "facebook", "linkedin"] as const).map((p) => {
                    const active = form.platforms.includes(p);
                    return (
                      <button
                        type="button"
                        key={p}
                        onClick={() => togglePlatform(p)}
                        className={`px-3 py-1 rounded-md text-xs font-bold capitalize border cursor-pointer ${
                          active
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-slate-50 text-slate-600 border-slate-200"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">TAT</label>
                  <input
                    type="text"
                    value={form.tat}
                    onChange={(e) => setForm({ ...form, tat: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="3-5 Days"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Example URL</label>
                  <input
                    type="text"
                    value={form.exampleUrl}
                    onChange={(e) => setForm({ ...form, exampleUrl: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t pt-3">
              <button
                onClick={() => setModalMode(null)}
                className="px-4 py-2 border rounded-lg font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#e63939] text-white rounded-lg font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-black text-slate-900">Delete Social Post?</h3>
            </div>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete <span className="font-bold text-slate-800">{deleteTarget.name}</span>?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2 border rounded-lg font-bold text-xs text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 bg-[#e63939] text-white rounded-lg font-bold text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
