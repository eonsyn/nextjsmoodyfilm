"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    name: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      console.log(formData);
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
        setMessage(data.message); // Success message
        setFormData({ userName: "", password: "", name: "", email: "" }); // Reset form
        await toast.success("signup successfully");
        router.push("/login");
      } else {
        setError(data.message); // Error message
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <ToastContainer />

      {/* Signup Card with Glassmorphism */}
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 shadow-xl border border-white/20 rounded-2xl p-6">
        <h1 className="text-3xl font-extrabold text-center text-white drop-shadow-md mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-3 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            placeholder="Password"
            className="w-full p-3 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full p-3 rounded-lg text-white font-semibold transition duration-300 bg-blue-500 hover:bg-blue-600 shadow-lg"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Login Redirect with Glass Effect */}
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 shadow-md border border-white/20 rounded-2xl p-4 mt-4 text-center">
        <p className="text-sm text-white">
          Have an account?{" "}
          <Link href="/login">
            <strong className="text-blue-400 cursor-pointer hover:underline">
              Log in
            </strong>
          </Link>
        </p>
      </div>
    </div>
  );
}
