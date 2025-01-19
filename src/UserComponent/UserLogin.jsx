import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      const user = {
        email: email,
        name: data.name,
        username: data.username,
        profile: data.profile,
        id: data.userId,
      };
      localStorage.setItem("MoodyfilmUser", JSON.stringify(user));
      localStorage.setItem("moodyfilmUserLogin", "true");

      // Trigger Navbar update after login
      window.dispatchEvent(new Event("storage")); // Trigger storage event to notify Navbar of change

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center min-h-[100vh] -mt-10 bg-gray-100">
      {/* Login Card */}
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
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
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
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
          {/* <div className="text-sm text-center text-gray-500 mt-4">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div> */}
        </form>
      </div>
      {/* Signup Redirect */}
      <div className="w-full max-w-sm p-4 mt-6 text-center bg-white rounded-lg shadow-md">
        <p className="text-sm">
          Don’t have an account?{" "}
          <strong
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </strong>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
