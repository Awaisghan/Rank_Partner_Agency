"use client";

import React, { useState } from "react";
import useSWR from "swr";
import {
  Monitor,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";

interface DigitalTVItem {
  id: string;
  callSign: string;
  station: string;
  rate: string;
  tat: string;
  sponsored: "Yes" | "No";
  indexed: "Yes" | "No";
  segmentLength: string;
  location: string;
  programName: string;
  interviewType: string;
  exampleUrl?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DigitalTelevisionAdminPage() {
  const { data: apiResponse, error, isLoading, mutate } = useSWR<{items: DigitalTVItem[], pagination: any}>("/api/digital-television", fetcher);
  const items = apiResponse?.items || [];

  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [currentItem, setCurrentItem] = useState<DigitalTVItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DigitalTVItem | null>(null);

  const [form, setForm] = useState({
    callSign: "",
    station: "",
    rate: "$750",
    tat: "1 Week",
    sponsored: "Yes" as "Yes" | "No",
    indexed: "Yes" as "Yes" | "No",
    segmentLength: "5-10 Minutes",
    location: "Texas,",
    programName: "Innovator's Journey",
    interviewType: "Video Call",
    exampleUrl: "",
  });

  const filtered = items.filter(
    (i) =>
      i.callSign.toLowerCase().includes(search.toLowerCase()) ||
      i.station.toLowerCase().includes(search.toLowerCase()) ||
      i.programName.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({
      callSign: "",
      station: "",
      rate: "$750",
      tat: "1 Week",
      sponsored: "Yes",
      indexed: "Yes",
      segmentLength: "5-10 Minutes",
      location: "Texas,",
      programName: "Innovator's Journey",
      interviewType: "Video Call",
      exampleUrl: "",
    });
    setCurrentItem(null);
    setModalMode("add");
  };

  const openEdit = (item: DigitalTVItem) => {
    setCurrentItem(item);
    setForm({
      callSign: item.callSign,
      station: item.station,
      rate: item.rate,
      tat: item.tat,
      sponsored: item.sponsored,
      indexed: item.indexed,
      segmentLength: item.segmentLength,
      location: item.location,
      programName: item.programName,
      interviewType: item.interviewType,
      exampleUrl: item.exampleUrl ?? "",
    });
    setModalMode("edit");
  };

  const handleSave = async () => {
    if (!form.callSign || !form.station) return;
    
    const built = {
      id: currentItem?.id ?? "",
      callSign: form.callSign,
      station: form.station,
      rate: form.rate,
      tat: form.tat,
      sponsored: String(form.sponsored) === "true",
      indexed: String(form.indexed) === "true",
      segmentLength: form.segmentLength,
      location: form.location,
      programName: form.programName,
      interviewType: form.interviewType,
      exampleUrl: form.exampleUrl.trim() || undefined,
    };

    if (!built.id) delete (built as any).id;

    try {
      const isAdd = modalMode === "add";
      const url = isAdd ? "/api/digital-television" : `/api/digital-television/${built.id}`;
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
      const res = await fetch(`/api/digital-television/${deleteTarget.id}?hard=true`, { method: "DELETE" });
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
            <Monitor className="w-3.5 h-3.5" />
            <span>Admin</span>
            <span>/</span>
            <span className="text-slate-600">Digital Television</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Digital Television
          </h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Manage OTT &amp; Digital television call signs, stations, programs and interview placements.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 bg-[#e63939] hover:bg-[#d62828] text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Digital TV Station
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs px-4 py-3 mb-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search call sign, station or program..."
          className="flex-1 text-sm text-slate-800 focus:outline-none placeholder:text-slate-400"
        />
        <span className="text-[11px] font-semibold text-slate-400 shrink-0">
          {filtered.length} results
        </span>
      </div>

      {/* Counter Bar */}
      <div className="mb-3 text-[11px] font-black tracking-widest text-slate-500 uppercase">
        SHOWING {filtered.length} OF {items.length} TVS
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
                <th className="px-4 py-3 text-center">CALL SIGN</th>
                <th className="px-4 py-3 text-left">STATION</th>
                <th className="px-3.5 py-3 text-center">RATE</th>
                <th className="px-3.5 py-3 text-center">TAT</th>
                <th className="px-3 py-3 text-center">SPONSORED</th>
                <th className="px-3 py-3 text-center">INDEXED</th>
                <th className="px-3.5 py-3 text-center">SEGMENT LENGTH</th>
                <th className="px-3.5 py-3 text-center">LOCATION</th>
                <th className="px-4 py-3 text-center">PROGRAM NAME</th>
                <th className="px-3.5 py-3 text-center">INTERVIEW TYPE</th>
                <th className="px-3.5 py-3 text-center">EXAMPLE LINK</th>
                <th className="px-3 py-3 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* CALL SIGN */}
                  <td className="px-4 py-3 text-center font-bold text-slate-900 text-[12.5px]">
                    {item.callSign}
                  </td>

                  {/* STATION */}
                  <td className="px-4 py-3 font-semibold text-slate-800 text-[12.5px]">
                    {item.station}
                  </td>

                  {/* RATE */}
                  <td className="px-3.5 py-3 text-center font-black text-slate-900 text-[13px]">
                    {item.rate}
                  </td>

                  {/* TAT */}
                  <td className="px-3.5 py-3 text-center text-slate-700 font-medium text-[12px] whitespace-nowrap">
                    {item.tat}
                  </td>

                  {/* SPONSORED */}
                  <td className="px-3 py-3 text-center font-medium text-slate-700 text-[12px]">
                    {item.sponsored ? "Yes" : "No"}
                  </td>

                  {/* INDEXED */}
                  <td className="px-3 py-3 text-center font-medium text-slate-700 text-[12px]">
                    {item.indexed ? "Yes" : "No"}
                  </td>

                  {/* SEGMENT LENGTH */}
                  <td className="px-3.5 py-3 text-center font-medium text-slate-700 text-[12px] whitespace-nowrap">
                    {item.segmentLength}
                  </td>

                  {/* LOCATION */}
                  <td className="px-3.5 py-3 text-center font-bold text-slate-900 text-[12px]">
                    {item.location}
                  </td>

                  {/* PROGRAM NAME */}
                  <td className="px-4 py-3 text-center">
                    <span className="bg-[#eef2f6] text-slate-700 px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap">
                      {item.programName}
                    </span>
                  </td>

                  {/* INTERVIEW TYPE */}
                  <td className="px-3.5 py-3 text-center font-medium text-slate-800 text-[12px]">
                    {item.interviewType}
                  </td>

                  {/* EXAMPLE LINK */}
                  <td className="px-3.5 py-3 text-center whitespace-nowrap">
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
                      <span className="text-slate-300">—</span>
                    )}
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
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 my-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-slate-900 text-base">
                {modalMode === "add" ? "Add Digital TV Station" : "Edit Station"}
              </h3>
              <button
                onClick={() => setModalMode(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Call Sign *</label>
                  <input
                    type="text"
                    value={form.callSign}
                    onChange={(e) => setForm({ ...form, callSign: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="KDAF"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Rate *</label>
                  <input
                    type="text"
                    value={form.rate}
                    onChange={(e) => setForm({ ...form, rate: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="$750"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase">Station Name *</label>
                <input
                  type="text"
                  value={form.station}
                  onChange={(e) => setForm({ ...form, station: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-slate-900"
                  placeholder="Dallas Area Fox"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">TAT</label>
                  <input
                    type="text"
                    value={form.tat}
                    onChange={(e) => setForm({ ...form, tat: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="1 Week"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Segment Length</label>
                  <input
                    type="text"
                    value={form.segmentLength}
                    onChange={(e) => setForm({ ...form, segmentLength: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="5-10 Minutes"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="Texas,"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase">Interview Type</label>
                  <input
                    type="text"
                    value={form.interviewType}
                    onChange={(e) => setForm({ ...form, interviewType: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-slate-900"
                    placeholder="Video Call"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase">Program Name</label>
                <input
                  type="text"
                  value={form.programName}
                  onChange={(e) => setForm({ ...form, programName: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-slate-900"
                  placeholder="Innovator's Journey"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase">Example URL</label>
                <input
                  type="text"
                  value={form.exampleUrl}
                  onChange={(e) => setForm({ ...form, exampleUrl: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-slate-900"
                  placeholder="https://kdaf.com"
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
              <h3 className="font-black text-slate-900">Delete Station?</h3>
            </div>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete <span className="font-bold text-slate-800">{deleteTarget.callSign} - {deleteTarget.station}</span>?
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
