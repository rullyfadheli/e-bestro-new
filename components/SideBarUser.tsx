"use client";
import React, { JSX } from "react";

import Link from "next/link";
import {
  FiUser,
  FiFileText,
  FiCalendar,
  FiBarChart2,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

interface MenuItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <FiBarChart2 /> },
  { label: "Profile", href: "/dashboard/profile", icon: <FiUser /> },
  {
    label: "Berkas Administrasi",
    href: "/dashboard/berkas",
    icon: <FiFileText />,
  },
  {
    label: "Kalender Kegiatan",
    href: "/dashboard/kalender",
    icon: <FiCalendar />,
  },
  {
    label: "Pelaporan Hasil Belajar",
    href: "/dashboard/khs",
    icon: <FiFileText />,
  },
  {
    label: "Lapor Pembayaran UKT",
    href: "/dashboard/ukt",
    icon: <FiFileText />,
  },
  {
    label: "Lapor Prestasi",
    href: "/dashboard/prestasi",
    icon: <FiFileText />,
  },
  {
    label: "Lapor Perkembangan Diri",
    href: "/dashboard/perkembangan",
    icon: <FiFileText />,
  },
  { label: "Settings", href: "/dashboard/settings", icon: <FiSettings /> },
  { label: "Help", href: "/dashboard/help", icon: <FiHelpCircle /> },
];

export default function SidebarUser(): JSX.Element {
  return (
    <aside className="bg-secondary text-white w-64 min-h-screen flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold p-6 border-b border-secondary">
          e-BESTRO
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded hover:bg-green-600 transition min-w-0"
                >
                  {item.icon}
                  <span className="whitespace-normal break-words">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="p-4 border-t border-secondary">
        <button className="flex items-center gap-3 w-full hover:bg-green-800 px-3 py-2 rounded">
          <FiLogOut />
          Logout Account
        </button>
      </div>
    </aside>
  );
}
