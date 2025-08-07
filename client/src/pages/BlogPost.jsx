import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blog/${slug}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(() => setPost(null));
  }, [slug]);

  if (!post) return <div className="text-white p-10">Loading...</div>;

  const readTime = Math.ceil(post.content.split(" ").length / 200);

  return (
    <section className="min-h-screen px-6 py-20 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          {post.title}
        </h1>

        <div className="flex justify-center items-center gap-4 text-sm text-gray-400 mb-10">
          <span className="bg-gray-700 px-3 py-1 rounded-full">📅 {new Date(post.date).toLocaleDateString()}</span>
          <span className="bg-gray-700 px-3 py-1 rounded-full">⏱ {readTime} min read</span>
        </div>

        <article className="prose prose-invert prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-block px-6 py-2 border border-blue-400 rounded hover:bg-blue-600 transition"
          >
            ← Back to Blog
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default BlogPost;
