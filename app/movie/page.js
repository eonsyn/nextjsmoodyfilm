"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000); // Redirect after 2 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[90vh]   text-gray-300">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-red-500">
          Redirecting to Movie Page...
        </h1>
        <p className="text-gray-400 mt-2">Please wait a moment 🎬</p>
        {/* Loading Spinner */}
        <div className="mt-4 animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
      </div>
    </div>
  );
}
