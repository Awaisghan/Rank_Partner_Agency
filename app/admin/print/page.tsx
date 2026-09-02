"use client";

import React, { useState } from "react";
import {
  Printer,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";

interface PrintMagazine {
  id: string;
  title: string;
  domain: string;
  websiteUrl?: string;
  fullPagePrice?: string;
  spreadPrice?: string;
  turnaround: string;
  circulation?: string;
}

const INITIAL_MAGAZINES: PrintMagazine[] = [
  {
    id: "mag-1",
    title: "Billboard USA",
    domain: "billboard.com",
    websiteUrl: "https://billboard.com",
    fullPagePrice: "$7,500",
    spreadPrice: "$15,000",
    turnaround: "Turnaround 1-2 Months",
  },
  {
    id: "mag-2",
    title: "Billboard Argentina",
    domain: "billboard.ar",
    websiteUrl: "https://billboard.ar",
    fullPagePrice: "$1,000",
    turnaround: "Turnaround 1-2 Months",
  },
  {
    id: "mag-3",
    title: "Hamptons Magazine",
    domain: "mlhamptons.com",
    websiteUrl: "https://mlhamptons.com",
    fullPagePrice: "$5,000",
    spreadPrice: "$10,000",
    turnaround: "Turnaround 1-2 Months",
    circulation: "50,000+ circulation",
  },
  {
    id: "mag-4",
    title: "Riveria Magazine",
    domain: "mlriviera.com",
    websiteUrl: "https://mlriviera.com",
    fullPagePrice: "$5,000",
    spreadPrice: "$10,000",
    turnaround: "Turnaround 1-2 Months",
    circulation: "40,000+ circulation",
  },
  {
    id: "mag-5",
    title: "San Diego Magazine",
    domain: "mlsandiegomag.com",
    websiteUrl: "https://mlsandiegomag.com",
    fullPagePrice: "$4,375",
    spreadPrice: "$8,750",
    turnaround: "Turnaround 1-2 Months",
    circulation: "35,000+ circulation",
  },
  {
    id: "mag-6",
    title: "Angeleno Magazine",
    domain: "mlangeleno.com",
    websiteUrl: "https://mlangeleno.com",
    fullPagePrice: "$6,000",
    spreadPrice: "$12,000",
    turnaround: "Turnaround 1-2 Months",
    circulation: "50,000+ circulation",
  },
];

export default function PrintAdminPage() {
  const [magazines, setMagazines] = useState<PrintMagazine[]>(INITIAL_MAGAZINES);
  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [currentMag, setCurrentMag] = useState<PrintMagazine | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PrintMagazine | null>(null);

  const [form, setForm] = useState({
    title: "",
    domain: "",
    websiteUrl: "",
    fullPagePrice: "$5,000",
    spreadPrice: "$10,000",
    turnaround: "Turnaround 1-2 Months",
    circulation: "",
  });

  const filtered = magazines.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.domain.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({
      title: "",
      domain: "",
      websiteUrl: "",
      fullPagePrice: "$5,000",
      spreadPrice: "$10,000",
      turnaround: "Turnaround 1-2 Months",
      circulation: "",
    });
    setCurrentMag(null);
    setModalMode("add");
  };

  const openEdit = (mag: PrintMagazine) => {
    setCurrentMag(mag);
    setForm({
      title: mag.title,
      domain: mag.domain,
      websiteUrl: mag.websiteUrl ?? "",
      fullPagePrice: mag.fullPagePrice ?? "",
      spreadPrice: mag.spreadPrice ?? "",
      turnaround: mag.turnaround,
      circulation: mag.circulation ?? "",
    });
    setModalMode("edit");
  };

  const handleSave = () => {
    if (!form.title || !form.domain) return;
    const newMag: PrintMagazine = {
      id: currentMag ? currentMag.id : `mag-${Date.now()}`,
      title: form.title,
      domain: form.domain,
      websiteUrl: form.websiteUrl.trim() || undefined,
      fullPagePrice: form.fullPagePrice.trim() || undefined,
      spreadPrice: form.spreadPrice.trim() || undefined,
      turnaround: form.turnaround,
      circulation: form.circulation.trim() || undefined,
    };

    if (modalMode === "add") setMagazines([newMag, ...magazines]);
    else setMagazines(magazines.map((m) => (m.id === newMag.id ? newMag : m)));
    setModalMode(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setMagazines(magazines.filter((m) => m.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Top Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold mb-1">
            <Printer className="w-3.5 h-3.5" />
            <span>Admin</span>
            <span>/</span>
            <span className="text-slate-600">Print</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Magazine Print
          </h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Manage magazine print titles, full-page rates &amp; spreads.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 bg-[#e63939] hover:bg-[#d62828] text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Print Title
        </button>
      </div>

      {/* Search & Counter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs px-4 py-3 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search magazine title or domain..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
          />
        </div>
        <div className="flex items-center gap-2 text-slate-700 text-xs">
          <span className="font-black text-slate-900 uppercase tracking-widest text-[11px]">
            MAGAZINE PRINT
          </span>
          <span className="bg-slate-100 text-slate-500 text-[11px] font-semibold px-2 py-0.5 rounded-md">
            {filtered.length} titles
          </span>
        </div>
      </div>

      {/* Magazine Cards Grid (Exact Screenshot Replica) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((mag) => (
          <div
            key={mag.id}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group relative"
          >
            {/* Admin Action Buttons (hover top right) */}
            <div className="absolute top-4 right-4 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => openEdit(mag)}
                className="p-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-400 transition-all cursor-pointer"
                title="Edit"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeleteTarget(mag)}
                className="p-1 rounded-md bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-400 transition-all cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Top Card Info */}
            <div>
              <div className="pr-16">
                <a
                  href={mag.websiteUrl || `https://${mag.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-slate-900 hover:text-[#e63939] text-base group/link"
                >
                  <span>{mag.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-[#e63939] transition-colors" />
                </a>
                <p className="text-[11.5px] text-slate-400 mt-0.5 font-normal">
                  {mag.domain}
                </p>
              </div>

              {/* Pricing Section */}
              <div className="my-5 space-y-2 border-t border-b border-slate-100 py-3.5">
                {mag.fullPagePrice && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Full Page</span>
                    <span className="font-black text-slate-900 text-sm">
                      {mag.fullPagePrice}
                    </span>
                  </div>
                )}
                {mag.spreadPrice && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">2-Page Spread</span>
                    <span className="font-black text-slate-900 text-sm">
                      {mag.spreadPrice}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#eef2f6] text-slate-600 text-[10.5px] font-semibold px-2.5 py-1 rounded-md">
                {mag.turnaround}
              </span>
              {mag.circulation && (
                <span className="bg-[#eef2f6] text-slate-600 text-[10.5px] font-semibold px-2.5 py-1 rounded-md">
                  {mag.circulation}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 my-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-slate-900 text-base">
                {modalMode === "add" ? "Add Print Magazine" : "Edit Magazine"}
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
                <label className="block font-bold text-slate-700 mb-1 uppercase">Magazine Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-slate-900"
                  placeholder="Billboard USA"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Domain *</label>
                  <input
                    type="text"
                    value={form.domain}
                    onChange={(e) => setForm({ ...form, domain: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="billboard.com"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Website Link</label>
                  <input
                    type="text"
                    value={form.websiteUrl}
                    onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="https://billboard.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Full Page Price</label>
                  <input
                    type="text"
                    value={form.fullPagePrice}
                    onChange={(e) => setForm({ ...form, fullPagePrice: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="$7,500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">2-Page Spread Price</label>
                  <input
                    type="text"
                    value={form.spreadPrice}
                    onChange={(e) => setForm({ ...form, spreadPrice: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="$15,000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Turnaround</label>
                  <input
                    type="text"
                    value={form.turnaround}
                    onChange={(e) => setForm({ ...form, turnaround: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="Turnaround 1-2 Months"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Circulation (optional)</label>
                  <input
                    type="text"
                    value={form.circulation}
                    onChange={(e) => setForm({ ...form, circulation: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="50,000+ circulation"
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
              <h3 className="font-black text-slate-900">Delete Magazine?</h3>
            </div>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete <span className="font-bold text-slate-800">{deleteTarget.title}</span>?
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
