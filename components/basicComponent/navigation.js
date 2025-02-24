"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Movies", href: "/" },
    { name: "About", href: "/about" },
    { name: "Reqeust", href: "/request-movies" },
  ];
  //
  return (
    <aside className="shadow-md w-full bg-black/90 text-white">
      <ul className="flex flex-col fixed top-16 space-y-6 py-8 items-center">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block text-lg font-semibold pl-4 transition-all ${
                pathname === item.href ||
                (item.name === "Movies" && pathname.startsWith("/movie/"))
                  ? "text-red-500 border-l-8 border-red-500"
                  : "text-gray-400 hover:text-red-400 hover:border-l-4 hover:border-red-400"
              }`}
              onClick={toggleMenu} // Close menu on click
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Privacy Policy Link */}
      <div className="fixed bottom-40 left-4">
        <Link href="/privacy-policy">
          <strong className="text-gray-300 hover:text-red-400 transition">
            Privacy Policy
          </strong>
        </Link>
      </div>
    </aside>
  );
};

export default Navbar;
