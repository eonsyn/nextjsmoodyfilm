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

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/movie");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4   text-gray-300">
      <div className="w-full max-w-sm bg-gray-800 shadow-xl border border-gray-700 rounded-2xl p-6">
        <h1 className="text-3xl font-extrabold text-center text-red-500 drop-shadow-md mb-6">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-5">
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
              className="w-full p-3 border border-gray-600 rounded-lg bg-black text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
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
              className="w-full p-3 border border-gray-600 rounded-lg bg-black text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 rounded-lg text-white font-semibold transition duration-300 bg-red-600 hover:bg-red-700 shadow-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>

      {/* Signup Redirect */}
      <div className="w-full max-w-sm bg-gray-800 shadow-md border border-gray-700 rounded-2xl p-4 mt-6 text-center">
        <p className="text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link href="/signup">
            <strong className="text-red-500 cursor-pointer hover:underline">
              Sign up
            </strong>
          </Link>
        </p>
      </div>
    </div>
  );
}
