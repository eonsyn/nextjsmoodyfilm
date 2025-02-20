"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="h-[90vh] flex flex-col items-center justify-center  px-6 py-12 text-gray-300">
      <ToastContainer />

      <div className="w-full max-w-md  shadow-xl border border-gray-700 rounded-2xl p-6">
        <h1 className="text-3xl font-extrabold text-center text-red-500 mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            placeholder="Password"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
            required
          />
          <button
            type="submit"
            className={`w-full p-3 rounded-lg text-white font-semibold transition duration-300 ${
              loading
                ? "bg-red-700 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>

      <div className="w-full max-w-md mt-4 text-center text-sm text-gray-400">
        Have an account?{" "}
        <Link href="/login">
          <strong className="text-red-500 hover:underline">Log in</strong>
        </Link>
      </div>
    </div>
  );
}
