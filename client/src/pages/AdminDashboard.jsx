import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const [newProject, setNewProject] = useState({ title: "", description: "", githubUrl: "", liveUrl: "" });
  const [newPost, setNewPost] = useState({ title: "", summary: "", content: "", cover: "", date: "" });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [projRes, postRes] = await Promise.all([
      axios.get("http://localhost:5000/api/projects"),
      axios.get("http://localhost:5000/api/blog")
    ]);
    setProjects(projRes.data);
    setPosts(postRes.data);
  };

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const createEntry = async (type, data) => {
    try {
      await axios.post(`http://localhost:5000/api/${type}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchAll();
      type === "projects"
        ? setNewProject({ title: "", description: "", githubUrl: "", liveUrl: "" })
        : setNewPost({ title: "", summary: "", content: "", cover: "", date: "" });
    } catch (err) {
      console.error(err);
      alert("Create failed.");
    }
  };

  const deleteEntry = async (type, idOrSlug) => {
    try {
      await axios.delete(`http://localhost:5000/api/${type}/${idOrSlug}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchAll();
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-6 py-12 space-y-20">
      <motion.h1
        className="text-4xl font-extrabold text-center text-purple-400 drop-shadow tracking-wide"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        Admin Dashboard
      </motion.h1>

      {/* PROJECTS SECTION */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="max-w-6xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur shadow-xl space-y-10"
      >
        <h2 className="text-3xl font-bold text-blue-400">Projects</h2>

        {/* Add Project */}
        <form className="grid md:grid-cols-2 gap-4">
          {["title", "description", "githubUrl", "liveUrl"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              value={newProject[field]}
              onChange={handleChange(setNewProject)}
              className="p-3 bg-white/10 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
          <button
            type="button"
            onClick={() => createEntry("projects", newProject)}
            className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg font-semibold shadow-lg col-span-full"
          >
            Add Project
          </button>
        </form>

        {/* Project List */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div key={p._id} className="bg-white/5 p-6 rounded-xl shadow border border-white/10">
              <h3 className="text-xl font-bold text-purple-300">{p.title}</h3>
              <p className="text-sm text-gray-300 mb-2">{p.description}</p>
              <div className="flex gap-3 mt-2">
                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-blue-400 text-sm underline">GitHub</a>
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-green-400 text-sm underline">Live</a>
              </div>
              <button
                onClick={() => deleteEntry("projects", p._id)}
                className="mt-4 bg-red-600 hover:bg-red-500 px-4 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </motion.section>

      {/* BLOG POSTS SECTION */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="max-w-6xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur shadow-xl space-y-10"
      >
        <h2 className="text-3xl font-bold text-pink-400">Blog Posts</h2>

        {/* Add Blog Post */}
        <form className="grid md:grid-cols-2 gap-4">
          {["title", "summary", "cover", "date"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              type={field === "date" ? "date" : "text"}
              value={newPost[field]}
              onChange={handleChange(setNewPost)}
              className="p-3 bg-white/10 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          ))}
          <textarea
            name="content"
            placeholder="Markdown content"
            value={newPost.content}
            onChange={handleChange(setNewPost)}
            rows={6}
            className="md:col-span-2 p-3 bg-white/10 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="button"
            onClick={() => createEntry("blog", newPost)}
            className="bg-pink-600 hover:bg-pink-500 px-5 py-2 rounded-lg font-semibold shadow-lg col-span-full"
          >
            Add Blog Post
          </button>
        </form>

        {/* Blog Post List */}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post.slug} className="bg-white/5 p-6 rounded-xl shadow border border-white/10">
              <h3 className="text-xl font-bold text-pink-300">{post.title}</h3>
              <p className="text-sm text-gray-300">{post.summary}</p>
              <button
                onClick={() => deleteEntry("blog", post.slug)}
                className="mt-4 bg-red-600 hover:bg-red-500 px-4 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default AdminDashboard;
