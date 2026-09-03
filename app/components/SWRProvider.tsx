"use client";

import { SWRConfig } from "swr";

export default function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        // Define global fetcher if desired, but we keep it optional as most components define their own
        // Optimize revalidation to prevent excessive requests:
        revalidateOnFocus: false, // Don't refetch on window focus
        revalidateOnReconnect: true, // Do refetch when network comes back
        dedupingInterval: 10000, // Dedupe identical requests within 10 seconds
        errorRetryCount: 3, // Only retry 3 times on error
      }}
    >
      {children}
    </SWRConfig>
  );
}
