export const generateMetadata = () => ({
  title: "Privacy Policy - MoodyFilm | Your Data, Our Responsibility",
  description:
    "MoodyFilm values your privacy. Learn how we collect, store, and protect your personal data, including cookies, analytics, and security measures.",
  keywords: [
    "MoodyFilm Privacy Policy",
    "movie website privacy",
    "data protection policy",
    "how we use your data",
    "cookies policy",
    "MoodyFilm security",
    "user data safety",
  ],
  author: "MoodyFilm Team",
  robots: "index, follow",
  openGraph: {
    title: "Privacy Policy - MoodyFilm",
    description:
      "Understand how MoodyFilm handles your data, privacy settings, and security measures to keep your information safe.",
    url: "https://moodyfilm.com/privacy-policy",
    siteName: "MoodyFilm",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://moodyfilm.com/assets/privacy-banner.jpg",
        width: 1200,
        height: 630,
        alt: "MoodyFilm Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - MoodyFilm",
    description:
      "Read MoodyFilm's privacy policy to understand how we handle your personal data securely.",
    site: "@MoodyFilm",
    creator: "@MoodyFilm",
    // images: ["https://moodyfilm.com/assets/privacy-banner.jpg"],
  },
});

export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen flex items-center justify-center   text-white pt-6 md:p-6">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-red-700">
        {/* Title */} 
        <h1 className="text-4xl font-extrabold text-center text-red-500 drop-shadow-lg mb-6">
          Privacy Policy
        </h1>

        {/* Introduction */}
        <p className="text-lg text-gray-300 text-center leading-relaxed">
          Your privacy is important to us at{" "}
          <span className="text-red-500 font-semibold">MoodyFilm</span>. This
          Privacy Policy outlines how we collect, use, and protect your
          information.
        </p>

        {/* Sections */}
        <div className="mt-8 space-y-6">
          <PrivacySection
            title="📌 1. Information We Collect"
            content={[
              "We collect information you provide directly, such as your name and email when you sign up.",
              "Anonymous analytics data may be collected to improve our services.",
            ]}
          />

          <PrivacySection
            title="🔍 2. How We Use Your Information"
            content={[
              "To provide, personalize, and improve our services.",
              "To send updates, recommendations, and movie-related notifications.",
            ]}
          />

          <PrivacySection
            title="🍪 3. Cookies & Tracking"
            content={[
              "We use cookies to enhance user experience and track website performance.",
              "You can disable cookies in your browser settings.",
            ]}
          />

          <PrivacySection
            title="🔒 4. Data Security"
            content={[
              "We take security seriously and use encryption to protect your data.",
              "However, no method is 100% secure, and we cannot guarantee absolute security.",
            ]}
          />

          <PrivacySection
            title="📜 5. Changes to This Policy"
            content={[
              "We may update this policy periodically.",
              "Changes will be posted on this page.",
            ]}
          />

          <PrivacySection
            title="📩 6. Contact Us"
            content={[
              "If you have any questions, please contact us at:",
              <span key="email" className="text-red-400">
                eonsync0@gmail.com
              </span>,
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// Reusable Component for Policy Sections
function PrivacySection({ title, content }) {
  return (
    <div className="p-5  rounded-xl shadow-lg border border-gray-700 hover:border-red-500 transition duration-300">
      <h2 className="text-2xl font-bold text-red-400">{title}</h2>
      <ul className="list-disc list-inside text-gray-300 mt-3 space-y-2">
        {content.map((item, index) => (
          <li key={index} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
