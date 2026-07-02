import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    // Remove JWT token
    localStorage.removeItem("token");

    alert("Logged out successfully!");

    // Redirect to Login Page
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-2xl font-bold"
        >
          IITK Lost & Found
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="hover:text-gray-200 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/lost"
            className="hover:text-gray-200 transition"
          >
            Lost
          </Link>

          <Link
            to="/found"
            className="hover:text-gray-200 transition"
          >
            Found
          </Link>

          <Link
            to="/profile"
            className="hover:text-gray-200 transition"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;