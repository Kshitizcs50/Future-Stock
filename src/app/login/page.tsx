"use client";
import React, { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0B0F1A] text-white overflow-hidden">
      {/* Background gradients */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(40% 60% at 10% 10%, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0) 60%)," +
            "radial-gradient(35% 55% at 90% 20%, rgba(236,72,153,0.25) 0%, rgba(236,72,153,0) 60%)," +
            "radial-gradient(50% 60% at 50% 90%, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0) 65%)",
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-xl">
        <h1 className="mb-2 text-2xl font-bold">Welcome back</h1>
        <p className="mb-6 text-sm text-white/60">
          Sign in to access your account
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm text-white/80"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-lg bg-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm text-white/80"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full rounded-lg bg-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-400" />
              Remember me
            </label>
            <button type="button" className="text-indigo-300 hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400 py-2 font-semibold text-black hover:opacity-90"
          >
            {loading ? "Authenticating…" : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-2">
          <div className="h-px flex-1 bg-white/10"></div>
          <span className="text-xs text-white/50">OR</span>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm hover:bg-white/20">
            GitHub
          </button>
          <button className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm hover:bg-white/20">
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
