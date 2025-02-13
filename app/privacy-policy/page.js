export const metadata = {
  title: "Privacy Policy - MoodyFilm",
  description:
    "Read the privacy policy of MoodyFilm to understand how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen px-2 py-12  text-gray-200 ">
      <h1 className="text-3xl font-bold text-center text-blue-300 mb-6">
        Privacy Policy
      </h1>

      <p className="text-gray-300 mb-4">
        Welcome to MoodyFilm! Your privacy is important to us. This Privacy
        Policy explains how we collect, use, and protect your personal
        information when you use our website.
      </p>

      <h2 className="text-2xl font-semibold text-white mt-6">
        1. Information We Collect
      </h2>
      <p className="text-gray-300 mb-4">
        - We collect information you provide directly, such as your name and
        email when you sign up. - We may collect anonymous analytics data to
        improve our services.
      </p>

      <h2 className="text-2xl font-semibold text-white mt-6">
        2. How We Use Your Information
      </h2>
      <p className="text-gray-300 mb-4">
        - To provide and improve our services. - To send updates or
        notifications related to movies, polls, and recommendations.
      </p>

      <h2 className="text-2xl font-semibold text-white mt-6">
        3. Cookies & Tracking
      </h2>
      <p className="text-gray-300 mb-4">
        - We use cookies to enhance user experience and track website
        performance. - You can disable cookies in your browser settings.
      </p>

      <h2 className="text-2xl font-semibold text-white mt-6">
        4. Data Security
      </h2>
      <p className="text-gray-300 mb-4">
        - We take security seriously and use encryption to protect your data. -
        However, no method is 100% secure, and we cannot guarantee absolute
        security.
      </p>

      <h2 className="text-2xl font-semibold text-white mt-6">
        5. Changes to This Policy
      </h2>
      <p className="text-gray-300 mb-4">
        - We may update this policy. Changes will be posted on this page.
      </p>

      <h2 className="text-2xl font-semibold text-white mt-6">6. Contact Us</h2>
      <p className="text-gray-300">
        If you have any questions, please contact us at{" "}
        <span className="text-blue-400">eonsync0@gmail.com</span>.
      </p>
    </div>
  );
}
