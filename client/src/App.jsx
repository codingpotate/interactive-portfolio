import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import useDarkMode from "./hooks/useDarkMode";
import Contact from "./pages/Contact.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import AdminBlog from "./pages/AdminBlog";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <nav className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold tracking-wide">My Portfolio</div>
          <div className="flex gap-6 text-lg items-center">
            <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
              Home
            </Link>
            <Link to="/projects" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
              Projects
            </Link>
            <Link to="/blog" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
              Contact
            </Link>
            <Link to="/login" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
              Admin
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 px-3 py-1 text-sm bg-gray-300 dark:bg-gray-700 rounded hover:opacity-80 transition"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/blog" element={<AdminBlog />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
