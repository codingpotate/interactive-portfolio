import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  const skillsGrouped = [
    {
      label: "Frontend",
      items: ["React", "Next.js", "Angular", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"]
    },
    {
      label: "Backend",
      items: ["Node.js", "Express.js", "Django", "Flask", "Spring Boot", "Python", "Java", "C++", "C", "PHP", "GDScript", "Bash"]
    },
    {
      label: "Databases",
      items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"]
    },
    {
      label: "Testing Tools",
      items: ["Selenium", "Cypress", "JUnit", "PyTest", "Postman", "JMeter"]
    },
    {
      label: "DevOps & Tools",
      items: ["Git", "GitHub", "Docker", "Kubernetes", "Jenkins", "Linux", "Bash Scripting", "VS Code", "IntelliJ IDEA"]
    },
    {
      label: "Game Development",
      items: ["Godot (GDScript)", "Unity (C#)", "Unreal Engine (Blueprints & C++)"]
    },
    {
      label: "Data & Cloud",
      items: ["PySpark", "Databricks", "AWS (RDS, S3)", "Azure (Basic Services)"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-10">
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to My Interactive Portfolio
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl max-w-2xl text-gray-300 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        I’m a Full Stack Developer passionate about building clean, scalable applications with modern web technologies and cloud platforms.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/projects"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          View My Projects
        </Link>
      </motion.div>
      <motion.section
        className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between py-20 px-6 text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Text Left Side */}
        <div className="flex-1 mb-10 md:mb-0">
          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Hi, I'm Yavuzberk! <br /> I love turning my creativity into
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Full Stack Developer with a passion for sleek interfaces, scalable backends, and game-inspired creativity. Currently looking for exciting opportunities.
          </motion.p>
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/projects"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full font-semibold text-lg hover:scale-105 transition transform shadow-lg"
            >
              View My Work
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <img
            src="FILLTHISLATER"
            alt="developer illustration"
            className="w-72 md:w-96 drop-shadow-xl select-none pointer-events-none"
          />
        </motion.div>
      </motion.section>

      {/* Skills Section */}
      <motion.div
        className="mt-20 w-full max-w-7xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-2">
          {skillsGrouped.map((group, i) => (
            <motion.div
              key={i}
              className="relative group bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-all overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              {/* glowing border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-semibold text-center mb-5">
                  {group.label}
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {group.items.map((skill, j) => (
                    <motion.span
                      key={j}
                      title={skill}
                      className="relative px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md transition transform hover:scale-105"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: j * 0.03 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
