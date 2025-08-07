import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    toast.loading("Sending...", { id: "contact" });

    emailjs
      .sendForm(
        "service_hyagijr",
        "template_4k5wr9d",
        form.current,
        "WUFPBLlAKD1vmNH_P"
      )
      .then(() => {
        toast.success("Message sent!", { id: "contact" });
        form.current.reset();
      })
      .catch(() => {
        toast.error("Something went wrong. Try again.", { id: "contact" });
      });
  };

  return (
    <section className="min-h-screen px-6 py-20 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl p-8 rounded-2xl border border-blue-500 bg-white/5 backdrop-blur shadow-xl"
      >
        <h2 className="text-4xl font-bold text-center mb-6">Let's Talk</h2>

        <form ref={form} onSubmit={sendEmail} className="grid gap-6">
          <input type="hidden" name="title" value="New Contact Form Message" />
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 rounded bg-white/10 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded bg-white/10 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full px-4 py-2 rounded bg-white/10 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              placeholder="Your message"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded text-white font-semibold w-full"
          >
            Send Message
          </button>
        </form>

        {/* Social Links */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Other ways to reach me</h3>
          <div className="flex justify-center gap-6 text-sm flex-wrap">
            <a
              href="mailto:seneryavuzberk@gmail.com"
              className="hover:text-blue-400 transition"
            >
              📧 seneryavuzberk@gmail.com
            </a>
            <a
              href="https://github.com/codingpotate"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              💻 github.com/codingpotate
            </a>
            <a
              href="https://linkedin.com/in/yavuzberksener"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              💼 linkedin.com/in/yavuzberksener
            </a>
          </div>

          {/* CV Download */}
          <a
            href="/Muhammed_Yavuz_Berk_Şener_CV.pdf"
            download
            className="inline-block mt-6 px-6 py-2 border border-blue-400 rounded hover:bg-blue-600 transition"
          >
            📄 Download CV
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
