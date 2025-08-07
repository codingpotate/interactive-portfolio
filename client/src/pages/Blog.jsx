import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/blog") 
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Failed to load posts:", err));
  }, []);

  return (
    <section className="min-h-screen px-6 py-20 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
        >
          Blog Posts
        </motion.h1>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 border border-blue-400/20 rounded-2xl overflow-hidden backdrop-blur-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              <Link to={`/blog/${post.slug}`} className="block h-full">
                <div className="h-48 bg-gray-900 overflow-hidden">
                  <img
                    src={post.cover || "/images/default.jpg"}
                    alt={post.title}
                    className="w-full h-full object-cover object-center transition duration-200 hover:scale-105"
                  />
                </div>

                <div className="p-6 pb-7 leading-relaxed">
                  <p className="text-sm text-blue-400 font-mono mb-1">📅 {new Date(post.date).toLocaleDateString()}</p>
                  <h2 className="text-xl font-bold mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-300">{post.summary}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
