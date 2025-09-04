"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 flex items-center justify-center px-6 py-16 overflow-hidden">
      {/* Background decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-[400px] h-[400px] bg-sky-200 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-200 rounded-full blur-3xl"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-cyan-500 text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
          <p className="text-sky-100">
            We'd love to hear from you! Let's start a conversation.
          </p>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500 outline-none"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full p-3 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500 outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              <Send size={18} /> Send Message
            </motion.button>
          </form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-6 text-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-sky-100 rounded-xl">
                <Phone className="text-sky-600" size={22} />
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-sm text-slate-500">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-sky-100 rounded-xl">
                <Mail className="text-sky-600" size={22} />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-slate-500">support@futurestock.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-sky-100 rounded-xl">
                <MapPin className="text-sky-600" size={22} />
              </div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-sm text-slate-500">Bangalore, India</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
