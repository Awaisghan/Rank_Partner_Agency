"use client";

import React, { useState, useMemo } from "react";
import {
  MOCK_PUBLICATIONS,
  GENRE_OPTIONS,
  REGION_OPTIONS,
} from "../../data/publicationsData";
import type { Publication } from "../../data/publicationsData";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Heart,
  Copyright,
  Dices,
  Leaf,
  ChevronUp,
  ChevronDown,
  Check,
  AlertTriangle,
  FileText,
  HelpCircle,
  ExternalLink,
  ImageIcon,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface PubForm {
  name: string;
  url: string;
  exampleUrl: string;
  logoText: string;
  logoBg: string;
  logoTextColor: string;
  isNew: boolean;
  price: string;
  da: string;
  dr: string;
  tat: string;
  region: string;
  genres: string;
  genreCount: string;
  sponsored: "Yes" | "No";
  indexed: "Yes" | "No";
  doFollow: "Yes" | "No";
  hasExample: boolean;
  llmAeo: "Yes" | "No";
  nicheAge18: boolean;
  nicheHeart: boolean;
  nicheCannabis: boolean;
  nicheCopyright: boolean;
  nicheCasino: boolean;
  nicheMultiplier: string;
}

const EMPTY_FORM: PubForm = {
  name: "",
  url: "",
  exampleUrl: "",
  logoText: "",
  logoBg: "#000000",
  logoTextColor: "#ffffff",
  isNew: false,
  price: "",
  da: "",
  dr: "",
  tat: "1 Day",
  region: "",
  genres: "",
  genreCount: "",
  sponsored: "No",
  indexed: "Yes",
  doFollow: "No",
  hasExample: true,
  llmAeo: "Yes",
  nicheAge18: false,
  nicheHeart: false,
  nicheCannabis: false,
  nicheCopyright: false,
  nicheCasino: false,
  nicheMultiplier: "",
};

const TAT_OPTIONS = [
  "1 Day",
  "1-3 Days",
  "3-5 Days",
  "1 Week",
  "2 Weeks",
  "3+ Weeks",
];

// ─────────────────────────────────────────────────────────────
// Helper: pub → form
// ─────────────────────────────────────────────────────────────
function pubToForm(pub: Publication): PubForm {
  return {
    name: pub.name,
    url: pub.url ?? "",
    exampleUrl: pub.exampleUrl ?? "",
    logoText: pub.logoText,
    logoBg: pub.logoBg ?? "#000000",
    logoTextColor: pub.logoTextColor ?? "#ffffff",
    isNew: pub.isNew ?? false,
    price: String(pub.price),
    da: String(pub.da),
    dr: String(pub.dr),
    tat: pub.tat,
    region: pub.region.join(", "),
    genres: pub.genres.join(", "),
    genreCount: pub.genreCount ? String(pub.genreCount) : "",
    sponsored: pub.sponsored,
    indexed: pub.indexed,
    doFollow: pub.doFollow,
    hasExample: pub.hasExample,
    llmAeo: pub.llmAeo,
    nicheAge18: pub.niches.age18 ?? false,
    nicheHeart: pub.niches.heart ?? false,
    nicheCannabis: pub.niches.cannabis ?? false,
    nicheCopyright: pub.niches.copyright ?? false,
    nicheCasino: pub.niches.casino ?? false,
    nicheMultiplier: pub.niches.multiplier ?? "",
  };
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  color = "slate",
}: {
  label: string;
  value: number;
  color?: "slate" | "green" | "red" | "amber";
}) {
  const colorMap = {
    slate: "bg-white border-slate-200 text-slate-900",
    green: "bg-white border-green-200 text-green-700",
    red: "bg-white border-red-200 text-red-600",
    amber: "bg-white border-amber-200 text-amber-700",
  };
  return (
    <div
      className={`rounded-xl border px-5 py-4 shadow-xs flex flex-col gap-0.5 ${colorMap[color]}`}
    >
      <span className="text-2xl font-black leading-none">{value}</span>
      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

function YesNoToggle({
  value,
  onChange,
  label,
}: {
  value: "Yes" | "No";
  onChange: (v: "Yes" | "No") => void;
  label: string;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">
        {label}
      </label>
      <div className="flex rounded-lg overflow-hidden border border-slate-200 w-fit shadow-xs">
        {(["Yes", "No"] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              value === opt
                ? "bg-[#e63939] text-white"
                : "bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function FormCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div
        onClick={() => onChange(!checked)}
        className={`w-4.5 h-4.5 rounded flex items-center justify-center border-2 transition-all shrink-0 ${
          checked
            ? "bg-[#e63939] border-[#e63939]"
            : "bg-white border-slate-300 group-hover:border-slate-400"
        }`}
      >
        {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
      </div>
      <span className="text-[12px] font-semibold text-slate-700">{label}</span>
    </label>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────
export default function AdminPublicationsPage() {
  // ── State ──────────────────────────────────────────────────
  const [publications, setPublications] = useState<Publication[]>(
    MOCK_PUBLICATIONS as Publication[]
  );
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"price" | "da" | "dr" | "name">(
    "price"
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // Modal state
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Publication | null>(null);
  const [form, setForm] = useState<PubForm>(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ── Derived ────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...publications];
    if (search)
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.url && p.url.toLowerCase().includes(search.toLowerCase()))
      );
    list.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortField === "name") return a.name.localeCompare(b.name) * dir;
      return ((a as any)[sortField] - (b as any)[sortField]) * dir;
    });
    return list;
  }, [publications, search, sortField, sortDir]);

  const activeCount = publications.length;
  const newCount = publications.filter((p) => p.isNew).length;
  const avgPrice = Math.round(
    publications.reduce((s, p) => s + p.price, 0) / (publications.length || 1)
  );

  // ── Handlers ───────────────────────────────────────────────
  const openAdd = () => {
    setForm(EMPTY_FORM);
    setFormError("");
    setModalMode("add");
  };

  const openEdit = (pub: Publication) => {
    setEditingPub(pub);
    setForm(pubToForm(pub));
    setFormError("");
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingPub(null);
    setFormError("");
  };

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const validateForm = (): boolean => {
    if (!form.name.trim()) { setFormError("Publication name is required."); return false; }
    if (!form.logoText.trim()) { setFormError("Logo text is required."); return false; }
    if (!form.price || isNaN(Number(form.price))) { setFormError("Valid price is required."); return false; }
    if (!form.da || isNaN(Number(form.da))) { setFormError("Valid DA is required."); return false; }
    if (!form.dr || isNaN(Number(form.dr))) { setFormError("Valid DR is required."); return false; }
    if (!form.region.trim()) { setFormError("At least one region is required."); return false; }
    if (!form.genres.trim()) { setFormError("At least one genre is required."); return false; }
    return true;
  };

  const handleSubmit = () => {
    setFormError("");
    if (!validateForm()) return;

    const built: Publication = {
      id: editingPub?.id ?? `pub-${Date.now()}`,
      name: form.name.trim(),
      url: form.url.trim() || undefined,
      exampleUrl: form.exampleUrl.trim() || undefined,
      logoText: form.logoText.trim().slice(0, 8).toUpperCase(),
      logoBg: form.logoBg,
      logoTextColor: form.logoTextColor,
      isNew: form.isNew,
      price: Number(form.price),
      da: Number(form.da),
      dr: Number(form.dr),
      tat: form.tat,
      region: form.region.split(",").map((r) => r.trim()).filter(Boolean),
      genres: form.genres.split(",").map((g) => g.trim()).filter(Boolean),
      genreCount: form.genreCount ? Number(form.genreCount) : undefined,
      sponsored: form.sponsored,
      indexed: form.indexed,
      doFollow: form.doFollow,
      hasExample: form.hasExample,
      llmAeo: form.llmAeo,
      niches: {
        age18: form.nicheAge18 || undefined,
        heart: form.nicheHeart || undefined,
        cannabis: form.nicheCannabis || undefined,
        copyright: form.nicheCopyright || undefined,
        casino: form.nicheCasino || undefined,
        multiplier: form.nicheMultiplier.trim() || undefined,
      },
    };

    if (modalMode === "add") {
      setPublications((prev) => [built, ...prev]);
      showSuccess("Publication added successfully!");
    } else {
      setPublications((prev) =>
        prev.map((p) => (p.id === built.id ? built : p))
      );
      showSuccess("Publication updated successfully!");
    }
    closeModal();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setPublications((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    showSuccess("Publication deleted.");
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const f = (key: keyof PubForm, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const SortIcon = ({ field }: { field: typeof sortField }) =>
    sortField === field ? (
      sortDir === "asc" ? (
        <ChevronUp className="w-3 h-3" />
      ) : (
        <ChevronDown className="w-3 h-3" />
      )
    ) : (
      <ChevronDown className="w-3 h-3 opacity-30" />
    );

  // ─────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────
  return (
    <div className="p-6 min-h-screen">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Admin</span>
            <span>/</span>
            <span className="text-slate-600">Publications</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Publications
          </h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Manage all publication entries and column data for the live pricing page.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 bg-[#e63939] hover:bg-[#d62828] active:scale-[0.98] text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm shadow-red-200 transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Publication
        </button>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Publications" value={publications.length} color="slate" />
        <StatCard label="Marked as New" value={newCount} color="green" />
        <StatCard label="Avg. Price ($)" value={avgPrice} color="amber" />
        <StatCard label="Showing in Table" value={filtered.length} color="slate" />
      </div>

      {/* ── Success Toast ── */}
      {successMsg && (
        <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs">
          <Check className="w-3.5 h-3.5 text-green-600" />
          {successMsg}
        </div>
      )}

      {/* ── Search Bar ── */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs px-4 py-3 mb-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search publications by name or domain URL..."
          className="flex-1 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
        {search && (
          <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        )}
        <span className="text-[11px] font-semibold text-slate-400 shrink-0">
          {filtered.length} results
        </span>
      </div>

      {/* ── Table (Matching Screenshot Columns exactly) ── */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-slate-200">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-slate-600 font-bold tracking-wider uppercase text-[11px]">
                <th
                  className="px-3.5 py-3 cursor-pointer hover:text-slate-900 transition-colors select-none text-left"
                  onClick={() => handleSort("name")}
                >
                  <span className="flex items-center gap-1">
                    PUBLICATION <SortIcon field="name" />
                  </span>
                </th>
                <th className="px-3 py-3 text-center whitespace-nowrap">GENRES</th>
                <th
                  className="px-3 py-3 text-center cursor-pointer hover:text-slate-900 transition-colors select-none whitespace-nowrap"
                  onClick={() => handleSort("price")}
                >
                  <span className="flex items-center justify-center gap-1">
                    PRICE <SortIcon field="price" />
                  </span>
                </th>
                <th
                  className="px-2.5 py-3 text-center cursor-pointer hover:text-slate-900 transition-colors select-none"
                  onClick={() => handleSort("da")}
                >
                  <span className="inline-flex items-center justify-center gap-0.5">
                    DA <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                </th>
                <th
                  className="px-2.5 py-3 text-center cursor-pointer hover:text-slate-900 transition-colors select-none"
                  onClick={() => handleSort("dr")}
                >
                  <span className="inline-flex items-center justify-center gap-0.5">
                    DR <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                </th>
                <th className="px-3 py-3 text-center whitespace-nowrap">
                  <span className="inline-flex items-center justify-center gap-0.5">
                    TAT <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                </th>
                <th className="px-3 py-3 text-center">REGION</th>
                <th className="px-2.5 py-3 text-center whitespace-nowrap">SPONSORED</th>
                <th className="px-2.5 py-3 text-center whitespace-nowrap">INDEXED</th>
                <th className="px-3 py-3 text-center whitespace-nowrap">
                  <span className="inline-flex items-center justify-center gap-0.5">
                    DO FOLLOW <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                </th>
                <th className="px-3 py-3 text-center whitespace-nowrap">EXAMPLE LINK</th>
                <th className="px-3 py-3 text-center whitespace-nowrap">
                  <span className="inline-flex items-center justify-center gap-0.5">
                    LLM/AEO <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                </th>
                <th className="px-3 py-3 text-center whitespace-nowrap">NICHES</th>
                <th className="px-3 py-3 text-center whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((pub) => (
                <tr
                  key={pub.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  {/* 1. PUBLICATION */}
                  <td className="px-3.5 py-3">
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
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-900 text-[12.5px] leading-tight">
                            {pub.name}
                          </span>
                          {pub.isNew && (
                            <span className="bg-[#28a745] text-white text-[8px] font-bold px-1.5 py-0.2 rounded">
                              New
                            </span>
                          )}
                        </div>
                        <span className="text-[10.5px] text-slate-400 font-normal truncate mt-0.5">
                          {pub.url || `${pub.name.toLowerCase().replace(/\s+/g, "")}.com`}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* 2. GENRES */}
                  <td className="px-3 py-3 text-center">
                    {pub.genreCount ? (
                      <span className="inline-flex items-center justify-center gap-1 text-slate-700 text-[11px] font-medium bg-[#eef2f6] px-2 py-0.5 rounded">
                        <span>{pub.genreCount} genres</span>
                        <HelpCircle className="w-3 h-3 text-slate-400" />
                      </span>
                    ) : (
                      <span className="bg-[#eef2f6] text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                        {pub.genres.join(" / ")}
                      </span>
                    )}
                  </td>

                  {/* 3. PRICE */}
                  <td className="px-3 py-3 text-center font-black text-slate-900 text-[13px]">
                    ${pub.price}
                  </td>

                  {/* 4. DA */}
                  <td className="px-2.5 py-3 text-center font-semibold text-slate-800 text-[12px]">
                    {pub.da}
                  </td>

                  {/* 5. DR */}
                  <td className="px-2.5 py-3 text-center font-semibold text-slate-800 text-[12px]">
                    {pub.dr}
                  </td>

                  {/* 6. TAT */}
                  <td className="px-3 py-3 text-center text-[12px] font-medium text-slate-700 whitespace-nowrap">
                    {pub.tat}
                  </td>

                  {/* 7. REGION */}
                  <td className="px-3 py-3 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
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

                  {/* 8. SPONSORED */}
                  <td className="px-2.5 py-3 text-center font-medium text-slate-700 text-[12px]">
                    {pub.sponsored}
                  </td>

                  {/* 9. INDEXED */}
                  <td className="px-2.5 py-3 text-center font-medium text-slate-700 text-[12px]">
                    {pub.indexed}
                  </td>

                  {/* 10. DO FOLLOW */}
                  <td className="px-3 py-3 text-center font-medium text-slate-700 text-[12px]">
                    {pub.doFollow}
                  </td>

                  {/* 11. EXAMPLE LINK */}
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    {pub.hasExample ? (
                      <a
                        href={pub.exampleUrl || "#"}
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

                  {/* 12. LLM/AEO */}
                  <td className="px-3 py-3 text-center font-medium text-slate-700 text-[12px]">
                    {pub.llmAeo}
                  </td>

                  {/* 13. NICHES */}
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {pub.niches.age18 && (
                        <span className="w-4.5 h-4.5 rounded-full border border-slate-400 flex items-center justify-center text-[7.5px] font-bold text-slate-600 relative shrink-0" title="18+">
                          18+
                        </span>
                      )}
                      {pub.niches.heart && (
                        <span title="Dating"><Heart className="w-3.5 h-3.5 text-slate-600 stroke-[1.8]" /></span>
                      )}
                      {pub.niches.cannabis && (
                        <span title="Cannabis"><Leaf className="w-3.5 h-3.5 text-slate-600 stroke-[1.8]" /></span>
                      )}
                      {pub.niches.copyright && (
                        <span title="Copyright"><Copyright className="w-3.5 h-3.5 text-slate-600 stroke-[1.8]" /></span>
                      )}
                      {pub.niches.casino && (
                        <span title="Casino"><Dices className="w-3.5 h-3.5 text-slate-600 stroke-[1.8]" /></span>
                      )}
                    </div>
                  </td>

                  {/* 14. ACTIONS */}
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

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <FileText className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-400">
                No publications found
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Try changing your search query or add a new publication.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          ADD / EDIT MODAL
      ───────────────────────────────────────────────────── */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-6 overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  {modalMode === "add" ? "Add New Publication" : "Edit Publication"}
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {modalMode === "add"
                    ? "Fill in the details to add a new publication to live database."
                    : `Editing: ${editingPub?.name}`}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
              {/* Error */}
              {formError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-4 py-2.5 rounded-lg">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  {formError}
                </div>
              )}

              {/* Section 1: Identity */}
              <div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-3 pb-1 border-b border-slate-100">
                  1 — Publication Identity & URLs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Publication Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => f("name", e.target.value)}
                      placeholder="e.g. Hood Critic"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#e63939] focus:ring-1 focus:ring-[#e63939] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Website Domain URL
                    </label>
                    <input
                      type="text"
                      value={form.url}
                      onChange={(e) => f("url", e.target.value)}
                      placeholder="e.g. hoodcriticmagazine.com"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#e63939] focus:ring-1 focus:ring-[#e63939] transition-all"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Example Article Link URL (For "View ↗" Column)
                    </label>
                    <input
                      type="text"
                      value={form.exampleUrl}
                      onChange={(e) => f("exampleUrl", e.target.value)}
                      placeholder="e.g. https://hoodcriticmagazine.com/sample-article"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#e63939] focus:ring-1 focus:ring-[#e63939] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Logo Avatar Text *
                    </label>
                    <input
                      type="text"
                      value={form.logoText}
                      onChange={(e) => f("logoText", e.target.value)}
                      placeholder="e.g. HC"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#e63939] focus:ring-1 focus:ring-[#e63939] transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Logo BG Color
                      </label>
                      <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5">
                        <input
                          type="color"
                          value={form.logoBg}
                          onChange={(e) => f("logoBg", e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                        />
                        <span className="text-xs font-mono text-slate-600">
                          {form.logoBg}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                        Text Color
                      </label>
                      <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5">
                        <input
                          type="color"
                          value={form.logoTextColor}
                          onChange={(e) => f("logoTextColor", e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                        />
                        <span className="text-xs font-mono text-slate-600">
                          {form.logoTextColor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="sm:col-span-2 flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 shadow"
                      style={{ backgroundColor: form.logoBg, color: form.logoTextColor }}
                    >
                      {form.logoText || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 leading-tight">
                        {form.name || "Publication Name"}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {form.url || "domain.com"}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <FormCheckbox
                        checked={form.isNew}
                        onChange={(v) => f("isNew", v)}
                        label="Mark as New"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Pricing & Metrics */}
              <div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-3 pb-1 border-b border-slate-100">
                  2 — Pricing & Metrics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: "price", label: "Price ($) *", placeholder: "75" },
                    { key: "da", label: "DA *", placeholder: "11" },
                    { key: "dr", label: "DR *", placeholder: "26" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                        {label}
                      </label>
                      <input
                        type="number"
                        value={(form as any)[key]}
                        onChange={(e) => f(key as keyof PubForm, e.target.value)}
                        placeholder={placeholder}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#e63939] focus:ring-1 focus:ring-[#e63939] transition-all"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      TAT *
                    </label>
                    <select
                      value={form.tat}
                      onChange={(e) => f("tat", e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#e63939] focus:ring-1 focus:ring-[#e63939] bg-white transition-all"
                    >
                      {TAT_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Coverage */}
              <div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-3 pb-1 border-b border-slate-100">
                  3 — Coverage
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Regions * (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={form.region}
                      onChange={(e) => f("region", e.target.value)}
                      placeholder="United States, Utah"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#e63939] focus:ring-1 focus:ring-[#e63939] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Genres * (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={form.genres}
                      onChange={(e) => f("genres", e.target.value)}
                      placeholder="News, Music"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#e63939] focus:ring-1 focus:ring-[#e63939] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Genre Count Override (optional)
                    </label>
                    <input
                      type="number"
                      value={form.genreCount}
                      onChange={(e) => f("genreCount", e.target.value)}
                      placeholder="e.g. 5"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#e63939] focus:ring-1 focus:ring-[#e63939] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Attributes */}
              <div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-3 pb-1 border-b border-slate-100">
                  4 — Publication Attributes
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <YesNoToggle value={form.sponsored} onChange={(v) => f("sponsored", v)} label="Sponsored" />
                  <YesNoToggle value={form.indexed} onChange={(v) => f("indexed", v)} label="Indexed" />
                  <YesNoToggle value={form.doFollow} onChange={(v) => f("doFollow", v)} label="Do Follow" />
                  <YesNoToggle value={form.llmAeo} onChange={(v) => f("llmAeo", v)} label="LLM / AEO" />
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">Has Example Link</label>
                    <div className="pt-1">
                      <FormCheckbox checked={form.hasExample} onChange={(v) => f("hasExample", v)} label="Yes, shows View ↗" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Niches */}
              <div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-3 pb-1 border-b border-slate-100">
                  5 — Niches
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                  <FormCheckbox checked={form.nicheAge18} onChange={(v) => f("nicheAge18", v)} label="18+ Content" />
                  <FormCheckbox checked={form.nicheHeart} onChange={(v) => f("nicheHeart", v)} label="Dating / Romance" />
                  <FormCheckbox checked={form.nicheCannabis} onChange={(v) => f("nicheCannabis", v)} label="Cannabis / CBD" />
                  <FormCheckbox checked={form.nicheCopyright} onChange={(v) => f("nicheCopyright", v)} label="Copyright / Brand" />
                  <FormCheckbox checked={form.nicheCasino} onChange={(v) => f("nicheCasino", v)} label="Gambling / Casino" />
                </div>
                <div className="max-w-xs">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Niche Multiplier (optional, e.g. x2)
                  </label>
                  <input
                    type="text"
                    value={form.nicheMultiplier}
                    onChange={(e) => f("nicheMultiplier", e.target.value)}
                    placeholder="x2"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#e63939] focus:ring-1 focus:ring-[#e63939] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 shrink-0">
              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg bg-[#e63939] hover:bg-[#d62828] active:scale-[0.98] text-white text-sm font-bold shadow-sm shadow-red-200 transition-all cursor-pointer"
              >
                {modalMode === "add" ? "Add Publication" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────
          DELETE CONFIRM MODAL
      ───────────────────────────────────────────────────── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="px-6 py-5">
              <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5 text-[#e63939]" />
              </div>
              <h2 className="text-base font-black text-slate-900 mb-1">
                Delete Publication?
              </h2>
              <p className="text-sm text-slate-500">
                Are you sure you want to delete{" "}
                <span className="font-bold text-slate-800">
                  {deleteTarget.name}
                </span>
                ? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 px-6 pb-5">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-lg bg-[#e63939] hover:bg-[#d62828] text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
