"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { Plus, Search, Check, X, Shield, User, Edit, Users } from "lucide-react";

interface UserModel {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "CLIENT";
  isActive: boolean;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
  const colorStyles = {
    slate: "bg-slate-50 border-slate-200 text-slate-800",
    green: "bg-green-50 border-green-200 text-green-800",
    red: "bg-red-50 border-red-200 text-red-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
  };
  return (
    <div className={`p-4 rounded-xl border ${colorStyles[color]} flex flex-col justify-center`}>
      <div className="text-[10px] uppercase font-bold tracking-wider opacity-60 mb-1">
        {label}
      </div>
      <div className="text-2xl font-black">{value}</div>
    </div>
  );
}

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

  const activeCount = users.filter((u) => u.isActive).length;
  const adminCount = users.filter((u) => u.role === "ADMIN").length;

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

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
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

      showSuccess(isEdit ? "User updated!" : "User created successfully!");
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
      showSuccess(user.isActive ? "User deactivated." : "User activated.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Admin</span>
            <span>/</span>
            <span className="text-slate-600">Users</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            User Management
          </h1>
          <p className="text-[12px] text-slate-500 mt-0.5 max-w-2xl">
            Manage your agency's clients and admins. Create accounts, reset passwords, and toggle access roles.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-[#e63939] hover:bg-[#d62828] active:scale-[0.98] text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm shadow-red-200 transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add User
        </button>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Users" value={users.length} color="slate" />
        <StatCard label="Active Accounts" value={activeCount} color="green" />
        <StatCard label="Administrators" value={adminCount} color="amber" />
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
          placeholder="Search users by name or email address..."
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

      {/* ── Table ── */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-[10px] uppercase font-bold tracking-widest text-slate-500 whitespace-nowrap">
                  User Details
                </th>
                <th className="px-4 py-3 text-[10px] uppercase font-bold tracking-widest text-slate-500 whitespace-nowrap">
                  Role
                </th>
                <th className="px-4 py-3 text-[10px] uppercase font-bold tracking-widest text-slate-500 whitespace-nowrap text-center">
                  Status
                </th>
                <th className="px-4 py-3 text-[10px] uppercase font-bold tracking-widest text-slate-500 whitespace-nowrap text-center">
                  Created At
                </th>
                <th className="px-4 py-3 text-[10px] uppercase font-bold tracking-widest text-slate-500 whitespace-nowrap text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-4 border-slate-200 border-t-[#e63939] rounded-full animate-spin"></div>
                      <p className="text-slate-500 text-sm font-semibold mt-4">Loading users...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-red-600 font-medium">
                    Failed to load users. Please check your connection.
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${user.role === 'ADMIN' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
                          {user.role === 'ADMIN' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{user.name}</div>
                          <div className="text-[11px] text-slate-500 font-medium mt-0.5">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${
                        user.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleActive(user)}
                        className={`inline-flex items-center justify-center w-7 h-7 rounded transition-colors ${
                          user.isActive ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200" : "bg-slate-100 text-slate-400 hover:bg-slate-200 border border-slate-200"
                        }`}
                        title={user.isActive ? "Deactivate User" : "Activate User"}
                      >
                        {user.isActive ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center text-xs font-semibold text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => openEditModal(user)}
                        className="inline-flex items-center justify-center w-7 h-7 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit User"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal Add/Edit ── */}
      {modalMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">
                {modalMode === "add" ? "Create New User" : "Edit User"}
              </h3>
              <button onClick={() => setModalMode(null)} className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 p-1.5 rounded-full transition-colors cursor-pointer border border-slate-200 shadow-sm">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {formError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={modalMode === "edit"}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:bg-slate-100 disabled:text-slate-500"
                  placeholder="john@example.com"
                />
                {modalMode === "edit" && <p className="text-[10px] text-slate-500 font-semibold mt-1">Email cannot be changed.</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {modalMode === "add" ? "Password" : "Reset Password"}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder={modalMode === "add" ? "Minimum 6 characters" : "Leave blank to keep current password"}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as "ADMIN" | "CLIENT" })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                >
                  <option value="CLIENT">Client</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
              <button
                onClick={() => setModalMode(null)}
                className="px-4 py-2 rounded-lg font-bold text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={saveUser}
                className="px-4 py-2 rounded-lg font-bold text-xs bg-[#e63939] hover:bg-[#d62828] text-white shadow-sm shadow-red-200 transition-all cursor-pointer active:scale-[0.98]"
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
