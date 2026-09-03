// app/admin/loading.tsx
// ─────────────────────────────────────────────────────────────
// Shared loading skeleton for ALL admin pages.
// Next.js automatically shows this component while any admin
// page is loading — prevents black/white flash on navigation.
// ─────────────────────────────────────────────────────────────

export default function AdminLoading() {
  return (
    <div className="p-6 min-h-screen animate-pulse">
      {/* Page Header Skeleton */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div className="space-y-2">
          <div className="h-3 w-32 bg-slate-200 rounded-md" />
          <div className="h-7 w-48 bg-slate-300 rounded-lg" />
          <div className="h-3 w-72 bg-slate-200 rounded-md" />
        </div>
        <div className="h-9 w-32 bg-slate-200 rounded-lg shrink-0" />
      </div>

      {/* Stats Row Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-xs space-y-2">
            <div className="h-7 w-12 bg-slate-200 rounded" />
            <div className="h-2.5 w-24 bg-slate-100 rounded" />
          </div>
        ))}
      </div>

      {/* Search Bar Skeleton */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs px-4 py-3 mb-4 flex items-center gap-3">
        <div className="w-4 h-4 rounded-full bg-slate-200 shrink-0" />
        <div className="flex-1 h-3 bg-slate-100 rounded-md" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center gap-4 px-4 py-3 border-b border-slate-200 bg-slate-50">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-2.5 bg-slate-200 rounded flex-1" />
          ))}
        </div>
        {/* Table Rows */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-3.5 border-b border-slate-100 last:border-0"
          >
            {/* Logo Avatar */}
            <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
            {/* Name block */}
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-28 bg-slate-200 rounded" />
              <div className="h-2 w-20 bg-slate-100 rounded" />
            </div>
            {/* Other cols */}
            {[...Array(5)].map((_, j) => (
              <div key={j} className="h-2.5 w-12 bg-slate-100 rounded flex-shrink-0" />
            ))}
            {/* Actions */}
            <div className="flex gap-1.5">
              <div className="w-7 h-7 rounded-lg bg-slate-100" />
              <div className="w-7 h-7 rounded-lg bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
