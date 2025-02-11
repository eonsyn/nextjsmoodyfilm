import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
    >
      Logout
    </button>
  );
}
