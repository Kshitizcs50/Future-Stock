"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      // ✅ Save token + user in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Signup successful 🎉");
      router.push("/"); // redirect to home
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0B0F1A] text-white overflow-hidden">
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
        <h1 className="mb-2 text-2xl font-bold">Create an account</h1>
        <p className="mb-6 text-sm text-white/60">
          Join us and start your journey in minutes
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm text-white/80">
                First name
              </label>
              <input
                name="firstName"
                id="firstName"
                type="text"
                required
                className="w-full rounded-lg bg-white/10 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm text-white/80">
                Last name
              </label>
              <input
                name="lastName"
                id="lastName"
                type="text"
                required
                className="w-full rounded-lg bg-white/10 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-white/80">
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              required
              className="w-full rounded-lg bg-white/10 px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-white/80">
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              required
              className="w-full rounded-lg bg-white/10 px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-emerald-400 via-fuchsia-500 to-indigo-500 py-2 font-semibold text-black"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
