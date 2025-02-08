"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Movies", href: "/movies" }, // Main Movies Page
    { name: "Contact", href: "/contact" },
  ];
  //
  return (
    <aside className=" shadow-md w-full   ">
      <ul className="flex flex-col fixed top-10 space-y-4 py-8  items-center">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block text-lg  text-white font-semibold pl-4 ${
                pathname === item.href ||
                (item.name === "Movies" && pathname.startsWith("/movie/"))
                  ? "text-blue-600   border-l-8 border-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              }`}
              onClick={toggleMenu} // Close menu on click
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="fixed bottom-16 ">
        <Link href="/request-movies">
          <strong className="text-white">Request Movie</strong>
        </Link>
      </div>
    </aside>
  );
};

export default Navbar;
