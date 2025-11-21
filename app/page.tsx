import React, { JSX } from "react";
import Link from "next/link";

import "@/styles/globals.css";

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Selamat Datang di <span className="text-secondary">e-BESTRO</span>
        </h1>
        <p className="text-gray-600 mb-6">
          Sistem Manajemen Pelaporan Beasiswa BESTRO. Silakan login untuk mulai
          mengelola laporan Anda.
        </p>
        <a href="/login"></a>
        <Link
          href={"/dashboard"}
          className="inline-block bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
        >
          Masuk ke Aplikasi
        </Link>
      </div>
    </main>
  );
}
