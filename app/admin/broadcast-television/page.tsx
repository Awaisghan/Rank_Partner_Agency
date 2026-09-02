"use client";

import React, { useState } from "react";
import {
  Tv,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ExternalLink,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";

interface TVBroadcastItem {
  id: string;
  affiliate: string;
  exampleUrl?: string;
  calls: string;
  state: string;
  market: string;
  dma: number | string;
  segmentType: string;
  recordingType: string;
  time: string;
  rate: string;
}

const INITIAL_TV_DATA: TVBroadcastItem[] = [
  {
    id: "tv-1",
    affiliate: "Bloomberg",
    exampleUrl: "https://bloomberg.com",
    calls: "Bloomberg (In-Person Interview)",
    state: "Global",
    market: "News",
    dma: 1,
    segmentType: "Business Minute",
    recordingType: "Satellite,",
    time: "2-4 min",
    rate: "Inquire",
  },
  {
    id: "tv-2",
    affiliate: "ABC News National",
    exampleUrl: "https://abcnews.com",
    calls: "ABC Morning Spotlight (In-Studio)",
    state: "United States",
    market: "Entertainment",
    dma: 2,
    segmentType: "Feature Story",
    recordingType: "In-Person",
    time: "3 min",
    rate: "$3,500",
  },
  {
    id: "tv-3",
    affiliate: "FOX Business Network",
    exampleUrl: "https://foxbusiness.com",
    calls: "FOX Tech & Markets Interview",
    state: "United States",
    market: "Business",
    dma: 5,
    segmentType: "Market Update",
    recordingType: "Zoom & In-Person",
    time: "2 min",
    rate: "$4,800",
  },
];

export default function BroadcastTelevisionAdminPage() {
  const [items, setItems] = useState<TVBroadcastItem[]>(INITIAL_TV_DATA);
  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [currentItem, setCurrentItem] = useState<TVBroadcastItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TVBroadcastItem | null>(null);

  const [form, setForm] = useState({
    affiliate: "",
    exampleUrl: "",
    calls: "",
    state: "Global",
    market: "News",
    dma: "1",
    segmentType: "Business Minute",
    recordingType: "Satellite,",
    time: "2-4 min",
    rate: "Inquire",
  });

  const filtered = items.filter(
    (i) =>
      i.affiliate.toLowerCase().includes(search.toLowerCase()) ||
      i.calls.toLowerCase().includes(search.toLowerCase()) ||
      i.market.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({
      affiliate: "",
      exampleUrl: "",
      calls: "",
      state: "Global",
      market: "News",
      dma: "1",
      segmentType: "Business Minute",
      recordingType: "Satellite,",
      time: "2-4 min",
      rate: "Inquire",
    });
    setCurrentItem(null);
    setModalMode("add");
  };

  const openEdit = (item: TVBroadcastItem) => {
    setCurrentItem(item);
    setForm({
      affiliate: item.affiliate,
      exampleUrl: item.exampleUrl ?? "",
      calls: item.calls,
      state: item.state,
      market: item.market,
      dma: String(item.dma),
      segmentType: item.segmentType,
      recordingType: item.recordingType,
      time: item.time,
      rate: item.rate,
    });
    setModalMode("edit");
  };

  const handleSave = () => {
    if (!form.affiliate || !form.calls) return;
    const newItem: TVBroadcastItem = {
      id: currentItem ? currentItem.id : `tv-${Date.now()}`,
      affiliate: form.affiliate,
      exampleUrl: form.exampleUrl.trim() || undefined,
      calls: form.calls,
      state: form.state,
      market: form.market,
      dma: form.dma,
      segmentType: form.segmentType,
      recordingType: form.recordingType,
      time: form.time,
      rate: form.rate,
    };

    if (modalMode === "add") {
      setItems([newItem, ...items]);
    } else {
      setItems(items.map((i) => (i.id === newItem.id ? newItem : i)));
    }
    setModalMode(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setItems(items.filter((i) => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold mb-1">
            <Tv className="w-3.5 h-3.5" />
            <span>Admin</span>
            <span>/</span>
            <span className="text-slate-600">Broadcast Television</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Broadcast Television
          </h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Manage television broadcast affiliates, calls, segment types and rates.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 bg-[#e63939] hover:bg-[#d62828] text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add TV Broadcast
        </button>
      </div>

      {/* Top Banner & Search Box */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs px-4 py-3 mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search affiliate or calls..."
            className="w-full bg-slate-50/60 border border-slate-200 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
          />
        </div>

        {/* Right Info Subtext */}
        <div className="text-[11px] font-semibold text-slate-500 text-right whitespace-nowrap">
          Turn around 2–4 weeks · Segments 2–4 min · Zoom &amp; in-person available
        </div>
      </div>

      {/* Counter Bar */}
      <div className="mb-3 text-[11px] font-black tracking-widest text-slate-500 uppercase">
        SHOWING {filtered.length} OF {items.length} TVS
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-slate-200">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-slate-600 font-bold tracking-wider uppercase text-[11px]">
                <th className="px-4 py-3 text-left">AFFILIATE</th>
                <th className="px-4 py-3 text-left">CALLS</th>
                <th className="px-3.5 py-3 text-left">STATE</th>
                <th className="px-3.5 py-3 text-left">MARKET</th>
                <th className="px-3 py-3 text-center">DMA</th>
                <th className="px-3.5 py-3 text-center">SEGMENT TYPE</th>
                <th className="px-3.5 py-3 text-center">RECORDING TYPE</th>
                <th className="px-3 py-3 text-center">TIME</th>
                <th className="px-3.5 py-3 text-right">RATE</th>
                <th className="px-3 py-3 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* AFFILIATE */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 text-[13px] leading-tight">
                        {item.affiliate}
                      </span>
                      {item.exampleUrl ? (
                        <a
                          href={item.exampleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-slate-700 hover:text-[#e63939] underline text-[11px] mt-0.5"
                        >
                          <span>Example</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-400 mt-0.5">Example ↗</span>
                      )}
                    </div>
                  </td>

                  {/* CALLS */}
                  <td className="px-4 py-3 font-semibold text-slate-800 text-[12px]">
                    {item.calls}
                  </td>

                  {/* STATE */}
                  <td className="px-3.5 py-3 text-slate-700 font-medium text-[12px]">
                    {item.state}
                  </td>

                  {/* MARKET */}
                  <td className="px-3.5 py-3 text-slate-800 font-semibold text-[12px]">
                    {item.market}
                  </td>

                  {/* DMA */}
                  <td className="px-3 py-3 text-center font-semibold text-slate-800 text-[12px]">
                    {item.dma}
                  </td>

                  {/* SEGMENT TYPE */}
                  <td className="px-3.5 py-3 text-center">
                    <span className="bg-[#eef2f6] text-slate-700 px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap">
                      {item.segmentType}
                    </span>
                  </td>

                  {/* RECORDING TYPE */}
                  <td className="px-3.5 py-3 text-center font-bold text-slate-900 text-[12px]">
                    {item.recordingType}
                  </td>

                  {/* TIME */}
                  <td className="px-3 py-3 text-center">
                    <span className="inline-flex items-center justify-center gap-1 text-slate-500 text-[11px]">
                      <span>{item.time}</span>
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    </span>
                  </td>

                  {/* RATE */}
                  <td className="px-3.5 py-3 text-right font-black text-slate-900 text-[13px]">
                    {item.rate}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-500 transition-all cursor-pointer"
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
      </div>

      {/* Add/Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-slate-900 text-base">
                {modalMode === "add" ? "Add TV Broadcast" : "Edit TV Broadcast"}
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
                <label className="block font-bold text-slate-700 mb-1 uppercase">Affiliate *</label>
                <input
                  type="text"
                  value={form.affiliate}
                  onChange={(e) => setForm({ ...form, affiliate: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-slate-900"
                  placeholder="Bloomberg"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase">Example URL</label>
                <input
                  type="text"
                  value={form.exampleUrl}
                  onChange={(e) => setForm({ ...form, exampleUrl: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-slate-900"
                  placeholder="https://bloomberg.com"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase">Calls *</label>
                <input
                  type="text"
                  value={form.calls}
                  onChange={(e) => setForm({ ...form, calls: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-slate-900"
                  placeholder="Bloomberg (In-Person Interview)"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">State</label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="Global"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Market</label>
                  <input
                    type="text"
                    value={form.market}
                    onChange={(e) => setForm({ ...form, market: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="News"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">DMA</label>
                  <input
                    type="text"
                    value={form.dma}
                    onChange={(e) => setForm({ ...form, dma: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Segment Type</label>
                  <input
                    type="text"
                    value={form.segmentType}
                    onChange={(e) => setForm({ ...form, segmentType: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="Business Minute"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Recording Type</label>
                  <input
                    type="text"
                    value={form.recordingType}
                    onChange={(e) => setForm({ ...form, recordingType: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="Satellite,"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Rate</label>
                  <input
                    type="text"
                    value={form.rate}
                    onChange={(e) => setForm({ ...form, rate: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="Inquire"
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
              <h3 className="font-black text-slate-900">Delete TV Broadcast?</h3>
            </div>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete <span className="font-bold text-slate-800">{deleteTarget.affiliate}</span>?
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
