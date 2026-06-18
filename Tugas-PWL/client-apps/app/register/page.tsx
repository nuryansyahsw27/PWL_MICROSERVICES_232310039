"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { REGISTER } from "@/components/apis/AuthServices";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!username.trim()) {
      setError("Username tidak boleh kosong");
      return false;
    }
    if (!email.trim()) {
      setError("Email tidak boleh kosong");
      return false;
    }
    if (!password) {
      setError("Password tidak boleh kosong");
      return false;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Password tidak sesuai");
      return false;
    }
    return true;
  };

  const save = async () => {
    if (!validate()) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await REGISTER({
        username,
        email,
        password,
      });

      if (result.success) {
        alert("Register berhasil! Silakan login.");
        router.push("/sign-in");
      } else {
        setError("Register gagal. Email mungkin sudah terdaftar.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      save();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header - Library Admin */}
          <div className="bg-indigo-600 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white tracking-wide">
              Library Admin
            </h1>
            <p className="text-indigo-200 mt-2 text-sm">Sistem Manajemen Perpustakaan</p>
          </div>

          {/* Body */}
          <div className="px-6 py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Daftar Akun</h2>
            <p className="text-gray-500 text-sm mb-6">Buat akun baru untuk mengelola perpustakaan</p>

            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {/* Username Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Username
              </label>
              <input
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="contoh@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                placeholder="Masukkan ulang password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Register Button */}
            <button
              onClick={save}
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                "Daftar"
              )}
            </button>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Sudah punya akun?{" "}
                <Link
                  href="/sign-in"
                  className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                >
                  Masuk Sekarang
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Library Admin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}