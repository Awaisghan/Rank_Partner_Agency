"use client";

import React, { useState } from "react";
import useSWR from "swr";
import {
  List,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ExternalLink,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";

interface ListiclePublication {
  id: string;
  name: string;
  url: string;
  tag?: string;
  logoText: string;
  logoBg: string;
  logoTextColor: string;
  genres: string[];
  top5Price: string;
  top10Price: string;
  da: number;
  dr: number;
  tat: string;
  region: string[];
  sponsored: "Yes" | "No";
  indexed: "Yes" | "No";
  doFollow: "Yes" | "No";
  exampleUrl?: string;
  llmAeo: "Yes" | "No";
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListiclesAdminPage() {
  const { data: apiResponse, error, isLoading, mutate } = useSWR<{items: ListiclePublication[], pagination: any}>("/api/listicles", fetcher);
  const items = apiResponse?.items || [];

  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [currentItem, setCurrentItem] = useState<ListiclePublication | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ListiclePublication | null>(null);

  const [form, setForm] = useState({
    name: "",
    url: "",
    tag: "",
    logoText: "",
    logoBg: "#000000",
    logoTextColor: "#ffffff",
    genres: "News",
    top5Price: "$2,000",
    top10Price: "$3,000",
    da: "88",
    dr: "82",
    tat: "1-2 Weeks",
    region: "United States",
    sponsored: "No" as "Yes" | "No",
    indexed: "Yes" as "Yes" | "No",
    doFollow: "Yes" as "Yes" | "No",
    exampleUrl: "",
    llmAeo: "Yes" as "Yes" | "No",
  });

  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      (i as any).domain?.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({
      name: "",
      url: "",
      tag: "",
      logoText: "",
      logoBg: "#000000",
      logoTextColor: "#ffffff",
      genres: "News",
      top5Price: "$2,000",
      top10Price: "$3,000",
      da: "88",
      dr: "82",
      tat: "1-2 Weeks",
      region: "United States",
      sponsored: "No",
      indexed: "Yes",
      doFollow: "Yes",
      exampleUrl: "",
      llmAeo: "Yes",
    });
    setCurrentItem(null);
    setModalMode("add");
  };

  const openEdit = (item: ListiclePublication) => {
    setCurrentItem(item);
    setForm({
      name: item.name,
      url: (item as any).domain || "",
      tag: item.tag ?? "",
      logoText: item.logoText,
      logoBg: item.logoBg,
      logoTextColor: item.logoTextColor,
      genres: item.genres.join(", "),
      top5Price: item.top5Price,
      top10Price: item.top10Price,
      da: String(item.da),
      dr: String(item.dr),
      tat: item.tat,
      region: item.region.join(", "),
      sponsored: item.sponsored,
      indexed: item.indexed,
      doFollow: item.doFollow,
      exampleUrl: item.exampleUrl ?? "",
      llmAeo: item.llmAeo,
    });
    setModalMode("edit");
  };

  const handleSave = async () => {
    if (!form.name || !form.url) return;
    
    const built = {
      id: currentItem?.id ?? "",
      name: form.name,
      domain: form.url, // Map url → domain per schema
      logoText: (form.logoText || form.name.slice(0, 4)).toUpperCase().slice(0, 4),
      logoBg: form.logoBg,
      logoTextColor: form.logoTextColor,
      genres: form.genres.split(",").map((g) => g.trim()).filter(Boolean),
      top5Price: form.top5Price,
      top10Price: form.top10Price,
      da: Number(form.da) || 0,
      dr: Number(form.dr) || 0,
      tat: form.tat,
      region: form.region.split(",").map((r) => r.trim()).filter(Boolean),
      sponsored: form.sponsored === "Yes",
      indexed: form.indexed === "Yes",
      doFollow: form.doFollow === "Yes",
      exampleUrl: form.exampleUrl.trim() || undefined,
      llmAeo: form.llmAeo === "Yes",
    };

    if (!built.id) delete (built as any).id;

    try {
      const isAdd = modalMode === "add";
      const url = isAdd ? "/api/listicles" : `/api/listicles/${built.id}`;
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
      const res = await fetch(`/api/listicles/${deleteTarget.id}?hard=true`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await mutate();
      setDeleteTarget(null);
    } catch (err) {
      alert("Error deleting item");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold mb-1">
            <List className="w-3.5 h-3.5" />
            <span>Admin</span>
            <span>/</span>
            <span className="text-slate-600">Listicles</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Listicles
          </h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Manage multi-tier listicle roundups (Top 5 / Top 10 pricing, tags &amp; inclusions).
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 bg-[#e63939] hover:bg-[#d62828] text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Listicle Publication
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs px-4 py-3 mb-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search listicle publication or domain..."
          className="flex-1 text-sm text-slate-800 focus:outline-none placeholder:text-slate-400"
        />
        <span className="text-[11px] font-semibold text-slate-400 shrink-0">
          {filtered.length} results
        </span>
      </div>

      {/* Counter Bar */}
      <div className="mb-3 text-[11px] font-black tracking-widest text-slate-500 uppercase">
        SHOWING {filtered.length} OF {items.length} PUBLICATIONS
      </div>

      {/* Table (Exact Screenshot Match) */}
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
                <th className="px-4 py-3 text-left">PUBLICATION</th>
                <th className="px-3.5 py-3 text-center">GENRES</th>
                <th className="px-4 py-3 text-center">PRICE</th>
                <th className="px-2.5 py-3 text-center">
                  <span className="inline-flex items-center justify-center gap-0.5">
                    DA <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                </th>
                <th className="px-2.5 py-3 text-center">
                  <span className="inline-flex items-center justify-center gap-0.5">
                    DR <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                </th>
                <th className="px-3 py-3 text-center">
                  <span className="inline-flex items-center justify-center gap-0.5">
                    TAT <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                </th>
                <th className="px-3.5 py-3 text-center">REGION</th>
                <th className="px-3 py-3 text-center">SPONSORED</th>
                <th className="px-3 py-3 text-center">INDEXED</th>
                <th className="px-3.5 py-3 text-center">
                  <span className="inline-flex items-center justify-center gap-0.5">
                    DO FOLLOW <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                </th>
                <th className="px-3.5 py-3 text-center">EXAMPLE LINK</th>
                <th className="px-3.5 py-3 text-center">
                  <span className="inline-flex items-center justify-center gap-0.5">
                    LLM/AEO <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                </th>
                <th className="px-3 py-3 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((pub) => (
                <tr key={pub.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* PUBLICATION */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 shadow-xs leading-none"
                        style={{
                          backgroundColor: pub.logoBg ?? "#000",
                          color: pub.logoTextColor ?? "#fff",
                        }}
                      >
                        {pub.logoText}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-slate-900 text-[12.5px] leading-tight">
                          {pub.name}
                        </span>
                        <span className="text-[10.5px] text-slate-400 font-normal truncate mt-0.5">
                          {(pub as any).domain}
                        </span>
                        {pub.tag && (
                          <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-md w-fit mt-1">
                            {pub.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* GENRES */}
                  <td className="px-3.5 py-3 text-center">
                    <div className="flex flex-col gap-1 items-center">
                      {pub.genres.map((g) => (
                        <span
                          key={g}
                          className="bg-[#eef2f6] text-slate-700 px-2.5 py-0.5 rounded text-[10.5px] font-medium whitespace-nowrap"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* PRICE (Top 5 & Top 10 Tiers) */}
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <div className="flex flex-col gap-0.5 items-center">
                      <span className="text-slate-700 text-[11.5px]">
                        Top 5: <strong className="text-slate-900 font-black">{pub.top5Price}</strong>
                      </span>
                      <span className="text-slate-700 text-[11.5px]">
                        Top 10: <strong className="text-slate-900 font-black">{pub.top10Price}</strong>
                      </span>
                    </div>
                  </td>

                  {/* DA */}
                  <td className="px-2.5 py-3 text-center font-semibold text-slate-800 text-[12px]">
                    {pub.da}
                  </td>

                  {/* DR */}
                  <td className="px-2.5 py-3 text-center font-semibold text-slate-800 text-[12px]">
                    {pub.dr}
                  </td>

                  {/* TAT */}
                  <td className="px-3 py-3 text-center font-semibold text-slate-800 text-[12px] whitespace-nowrap">
                    {pub.tat}
                  </td>

                  {/* REGION */}
                  <td className="px-3.5 py-3 text-center">
                    <div className="flex flex-col gap-1 items-center">
                      {pub.region.map((r) => (
                        <span
                          key={r}
                          className="bg-[#eef2f6] text-slate-700 px-2 py-0.5 rounded text-[10.5px] font-medium whitespace-nowrap"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* SPONSORED */}
                  <td className="px-3 py-3 text-center font-medium text-slate-700 text-[12px]">
                    {pub.sponsored ? "Yes" : "No"}
                  </td>

                  {/* INDEXED */}
                  <td className="px-3 py-3 text-center font-medium text-slate-700 text-[12px]">
                    {pub.indexed ? "Yes" : "No"}
                  </td>

                  {/* DO FOLLOW */}
                  <td className="px-3.5 py-3 text-center font-medium text-slate-700 text-[12px]">
                    {pub.doFollow ? "Yes" : "No"}
                  </td>

                  {/* EXAMPLE LINK */}
                  <td className="px-3.5 py-3 text-center whitespace-nowrap">
                    {pub.exampleUrl ? (
                      <a
                        href={pub.exampleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[#28a745] hover:underline text-[12px]"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3 stroke-[2.2]" />
                      </a>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  {/* LLM/AEO */}
                  <td className="px-3.5 py-3 text-center font-medium text-slate-700 text-[12px]">
                    {pub.llmAeo ? "Yes" : "No"}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEdit(pub)}
                        className="p-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-500 transition-all cursor-pointer"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(pub)}
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
                {modalMode === "add" ? "Add Listicle Publication" : "Edit Listicle"}
              </h3>
              <button
                onClick={() => setModalMode(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase">Publication Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-slate-900"
                  placeholder="Elite Daily"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Domain URL *</label>
                  <input
                    type="text"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="elitedaily.com"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Sub-Tag (optional)</label>
                  <input
                    type="text"
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="Includes Social Posts / Staff"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Top 5 Price</label>
                  <input
                    type="text"
                    value={form.top5Price}
                    onChange={(e) => setForm({ ...form, top5Price: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="$2,000"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Top 10 Price</label>
                  <input
                    type="text"
                    value={form.top10Price}
                    onChange={(e) => setForm({ ...form, top10Price: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="$3,000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">DA</label>
                  <input
                    type="number"
                    value={form.da}
                    onChange={(e) => setForm({ ...form, da: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="88"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">DR</label>
                  <input
                    type="number"
                    value={form.dr}
                    onChange={(e) => setForm({ ...form, dr: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="82"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">TAT</label>
                  <input
                    type="text"
                    value={form.tat}
                    onChange={(e) => setForm({ ...form, tat: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="1-2 Weeks"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase">Genres (comma separated)</label>
                <input
                  type="text"
                  value={form.genres}
                  onChange={(e) => setForm({ ...form, genres: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-slate-900"
                  placeholder="Luxury, News"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase">Region (comma separated)</label>
                <input
                  type="text"
                  value={form.region}
                  onChange={(e) => setForm({ ...form, region: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-slate-900"
                  placeholder="United States, Global"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase">Example URL</label>
                <input
                  type="text"
                  value={form.exampleUrl}
                  onChange={(e) => setForm({ ...form, exampleUrl: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-slate-900"
                  placeholder="https://elitedaily.com"
                />
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
              <h3 className="font-black text-slate-900">Delete Listicle?</h3>
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
