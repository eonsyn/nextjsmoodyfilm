export const generateMetadata = () => ({
  title: "Contact Us - Moodyfilm",
  description:
    "Get in touch with Moodyfilm for support, feedback, or partnership inquiries. We’d love to hear from you!",
  keywords:
    "Moodyfilm contact, support, movie inquiries, feedback, partnership",
  author: "Moodyfilm Team",
  robots: "index, follow",
});

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Simulate API call (Replace with actual API request)
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-400 drop-shadow-lg mb-6">
          Contact Us 📩
        </h1>

        <p className="text-lg text-gray-300 text-center mb-6">
          Have questions, feedback, or partnership inquiries? Fill out the form
          below or reach us through our support channels.
        </p>

        {success && (
          <div className="p-3 text-sm text-green-600 bg-green-100 rounded text-center mb-4">
            Message sent successfully! We’ll get back to you soon.
          </div>
        )}

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-100 rounded text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 border rounded-md bg-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 border rounded-md bg-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-md bg-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none hover:bg-blue-700 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold text-blue-300">
            📧 Other Ways to Reach Us
          </h2>
          <p className="text-gray-300 mt-2">
            Email:{" "}
            <a
              href="mailto:support@Moodyfilm.com"
              className="text-blue-400 hover:underline"
            >
              support@Moodyfilm.com
            </a>
          </p>
          <p className="text-gray-300 mt-1">
            Twitter:{" "}
            <a
              href="https://twitter.com/Moodyfilm"
              className="text-blue-400 hover:underline"
            >
              @Moodyfilm
            </a>
          </p>
          <p className="text-gray-300 mt-1">
            Instagram:{" "}
            <a
              href="https://instagram.com/Moodyfilm"
              className="text-blue-400 hover:underline"
            >
              @Moodyfilm
            </a>
          </p>
        </div>

        {/* Optional: Embed Google Maps for location-based contact */}
        <div className="mt-8">
          <iframe
            className="w-full h-56 rounded-lg border border-white/20 shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345086167!2d144.95373631531586!3d-37.817209979751584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5779f0f1d3a3e0!2sMelbourne!5e0!3m2!1sen!2sau!4v1634567890123!5m2!1sen!2sau"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
