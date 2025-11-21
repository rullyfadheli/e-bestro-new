"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8F8F8] px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold text-secondary mb-4">Oops!</h1>
        <p className="text-gray-600 text-lg mb-6">
          Maaf, terjadi kesalahan saat memuat halaman. Silakan coba lagi nanti.
        </p>
        <Link
          href="/"
          className="inline-block bg-secondary text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
