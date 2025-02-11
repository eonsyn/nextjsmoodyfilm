"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] -mt-10 ">
      <div className="w-full max-w-sm p-6 bg-white/30 backdrop-blur-md rounded-lg shadow-md">
        <h1 className="text-3xl text-background font-bold text-center   mb-6">
          MoodyFilms Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-2 text-sm text-red-600 bg-red-100 rounded">
              {error}
            </div>
          )}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              autoComplete="current-password"
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
      <div className="w-full max-w-sm p-4 mt-6 text-center bg-white rounded-lg shadow-md">
        <p className="text-sm">
          Don’t have an account?{" "}
          <Link href="/signup">
            <strong className="text-blue-500 cursor-pointer hover:underline">
              Sign up
            </strong>
          </Link>
        </p>
      </div>
    </div>
  );
}
