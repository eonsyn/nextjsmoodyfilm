// utils/auth.js (or any other appropriate file)
export function isUserLoggedIn() {
  // Check if the user is logged in
  const loginStatus = localStorage.getItem("moodyfilmUserLogin");

  if (loginStatus === "true") {
    // Fetch the user data
    const user = JSON.parse(localStorage.getItem("MoodyfilmUser"));

    // Check if necessary user details are available
    if (!user || !user.email || !user.name || !user.username || !user.profile) {
      throw new Error("User data is incomplete!");
    }

    return true; // User is logged in and has all required data
  }

  return false; // User is not logged in
}
export const logout = () => {
  // Remove the user data and login status from localStorage
  localStorage.removeItem("MoodyfilmUser");
  localStorage.removeItem("moodyfilmUserLogin");

  // You can also return a message or status, if needed
  console.log("User logged out successfully");
};
