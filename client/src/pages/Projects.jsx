import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  const allTags = ["All", ...new Set(projects.flatMap(p => p.tags || []))];
  const filteredProjects = selectedTag === "All" ? projects : projects.filter(p => p.tags?.includes(selectedTag));

  const featured = projects.find(p => p.isFeatured);
  const nonFeatured = filteredProjects.filter(p => !p.isFeatured);

  const openModal = (project) => setModalProject(project);
  const closeModal = () => setModalProject(null);

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white transition-colors duration-300">
      <motion.h1
        className="text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Featured Projects
      </motion.h1>

      {/* Tag Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {allTags.map((tag, i) => (
          <button
            key={i}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 border border-white/10 hover:bg-white/10 ${selectedTag === tag ? "bg-white/10 text-cyan-300" : "text-white/70"}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Featured Project */}
      {featured && selectedTag === "All" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          onClick={() => openModal(featured)}
          className="cursor-pointer group relative mb-20 mx-auto max-w-5xl bg-white/5 border border-cyan-500 rounded-2xl p-8 shadow-2xl backdrop-blur"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-3 text-white group-hover:text-cyan-400 transition">
              {featured.title} <span className="ml-2 px-2 py-0.5 text-xs bg-cyan-600 text-white rounded-full">Featured</span>
            </h2>
            <p className="text-gray-300 mb-4 text-base leading-relaxed">
              {featured.description}
            </p>
            {featured.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {featured.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-700 text-xs text-white px-2 py-0.5 rounded-full shadow-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Remaining Projects */}
      <div className="container mx-auto grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {nonFeatured.map((project, index) => (
          <motion.div
            key={project._id}
            onClick={() => openModal(project)}
            initial={{ opacity: 0, rotateY: -90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="cursor-pointer group relative bg-white/5 border border-white/10 rounded-xl p-6 overflow-hidden shadow-xl backdrop-blur hover:shadow-2xl hover:scale-[1.02] transform transition duration-300"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition">
                {project.title}
              </h2>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>
              {project.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-700 text-xs text-white px-2 py-0.5 rounded-full shadow-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 text-white p-8 rounded-xl w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-3xl font-bold mb-4">{modalProject.title}</h2>
              <p className="mb-4 text-gray-300">{modalProject.description}</p>

              {modalProject.techStack && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-1">Tech Stack:</h3>
                  <ul className="flex flex-wrap gap-2">
                    {modalProject.techStack.map((tech, i) => (
                      <li key={i} className="bg-gray-700 text-xs px-2 py-0.5 rounded-full">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {modalProject.images?.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Gallery:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {modalProject.images.map((img, i) => (
                      <img key={i} src={img} alt="project screenshot" className="rounded shadow border border-gray-700" />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-4">
                {modalProject.githubUrl && (
                  <a
                    href={modalProject.githubUrl}
                    target="_blank"
                    className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-blue-400 hover:text-white"
                  >
                    GitHub
                  </a>
                )}
                {modalProject.liveUrl && (
                  <a
                    href={modalProject.liveUrl}
                    target="_blank"
                    className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-green-400 hover:text-white"
                  >
                    Live Site
                  </a>
                )}
                <button
                  onClick={closeModal}
                  className="ml-auto px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-500 text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
