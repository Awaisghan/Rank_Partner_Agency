"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { Plus, Search, Check, X, Shield, User, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

interface UserModel {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "CLIENT";
  isActive: boolean;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminUsersPage() {
  const { data: apiResponse, error, isLoading, mutate } = useSWR<{ items: UserModel[]; pagination: any }>("/api/users", fetcher);
  const users = apiResponse?.items || [];

  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editingUser, setEditingUser] = useState<UserModel | null>(null);
  
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "CLIENT", isActive: true });
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const filtered = useMemo(() => {
    let list = [...users];
    if (search) {
      list = list.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    return list;
  }, [users, search]);

  const openAddModal = () => {
    setForm({ name: "", email: "", password: "", role: "CLIENT", isActive: true });
    setFormError("");
    setSuccessMsg("");
    setModalMode("add");
  };

  const openEditModal = (user: UserModel) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, password: "", role: user.role, isActive: user.isActive });
    setFormError("");
    setSuccessMsg("");
    setModalMode("edit");
  };

  const saveUser = async () => {
    setFormError("");
    setSuccessMsg("");

    if (!form.name || !form.email) {
      return setFormError("Name and Email are required.");
    }
    if (modalMode === "add" && (!form.password || form.password.length < 6)) {
      return setFormError("Password must be at least 6 characters.");
    }
    if (modalMode === "edit" && form.password && form.password.length < 6) {
      return setFormError("Password must be at least 6 characters if resetting.");
    }

    try {
      const isEdit = modalMode === "edit" && editingUser;
      const url = isEdit ? `/api/users/${editingUser.id}` : "/api/users";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save user");

      setSuccessMsg(isEdit ? "User updated!" : "User created successfully!");
      mutate();
      setTimeout(() => setModalMode(null), 1500);
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  const toggleActive = async (user: UserModel) => {
    try {
      await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      mutate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">User Management</h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Manage your agency's clients and admins. You can manually create accounts and share credentials.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-4 py-2.5 rounded-xl font-medium shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all"
        >
          <Plus size={18} />
          Create Account
        </button>
      </div>

      {/* Controls */}
      <div className="bg-[#0b1229] border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111832] border border-slate-700 text-white rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
          />
        </div>
        <div className="text-sm text-slate-400">
          Total Users: <span className="text-white font-medium">{users.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0b1229] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 bg-[#111832] uppercase border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Created At</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      Loading users...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-red-400">
                    Failed to load users.
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-[#111832]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${user.role === 'ADMIN' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>
                          {user.role === 'ADMIN' ? <Shield size={18} /> : <User size={18} />}
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-slate-400 text-xs mt-0.5">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider ${
                        user.role === 'ADMIN' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleActive(user)}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                          user.isActive ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        }`}
                        title={user.isActive ? "Deactivate User" : "Activate User"}
                      >
                        {user.isActive ? <Check size={16} /> : <X size={16} />}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openEditModal(user)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0b1229] border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-800 flex justify-between items-center shrink-0">
              <h3 className="text-lg font-semibold text-white">
                {modalMode === "add" ? "Create New Account" : "Edit User"}
              </h3>
              <button onClick={() => setModalMode(null)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {formError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {formError}
                </div>
              )}
              {successMsg && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
                  {successMsg}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#111832] border border-slate-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={modalMode === "edit"}
                  className="w-full bg-[#111832] border border-slate-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                  placeholder="john@example.com"
                />
                {modalMode === "edit" && <p className="text-[10px] text-slate-500 mt-1">Email cannot be changed.</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {modalMode === "add" ? "Password" : "Reset Password"}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-[#111832] border border-slate-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 transition-colors"
                  placeholder={modalMode === "add" ? "Minimum 6 characters" : "Leave blank to keep current"}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as "ADMIN" | "CLIENT" })}
                  className="w-full bg-[#111832] border border-slate-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 transition-colors appearance-none"
                >
                  <option value="CLIENT">Client</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
            </div>

            <div className="p-5 border-t border-slate-800 flex justify-end gap-3 bg-[#0b1229]/50 shrink-0">
              <button
                onClick={() => setModalMode(null)}
                className="px-5 py-2.5 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={saveUser}
                className="px-5 py-2.5 rounded-xl font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
              >
                {modalMode === "add" ? "Create Account" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
