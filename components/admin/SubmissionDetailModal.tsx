"use client";

import React, { useState } from "react";
import { Berkas } from "@/types/database";
import { createClient } from "@/utils/supabase/client";
import Button from "@/components/Button";

interface SubmissionDetailModalProps {
  submission: Berkas | null;
  isOpen: boolean;
  onClose: () => void;
  onActionSuccess: () => void; // Callback untuk refresh data di halaman utama
}

const SubmissionDetailModal: React.FC<SubmissionDetailModalProps> = ({
  submission,
  isOpen,
  onClose,
  onActionSuccess,
}) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  if (!isOpen || !submission) return null;

  const handleUpdateStatus = async (status: "accepted" | "rejected") => {
    if (status === "rejected" && !rejectionReason.trim()) {
      alert("Harap isi alasan penolakan.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase
      .from("berkas")
      .update({
        status: status,
        rejection_reason: status === "rejected" ? rejectionReason : null,
      })
      .eq("id", submission.id);

    if (error) {
      alert("Gagal memperbarui status. Coba lagi.");
      console.error(error);
    } else {
      alert(
        `Berkas berhasil di-${status === "accepted" ? "terima" : "tolak"}.`
      );
      onActionSuccess(); // Panggil fungsi untuk refresh data
      onClose(); // Tutup modal
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 sm:p-8 relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Review Berkas: {submission.profiles?.full_name}
        </h3>

        <div className="space-y-3 text-sm border-t border-b py-4 mb-4">
          <p>
            <strong>NIM:</strong> {submission.profiles?.nim}
          </p>
          <p>
            <strong>Jenis Laporan:</strong> {submission.jenis_laporan}
          </p>
          <p>
            <strong>Tanggal Unggah:</strong>{" "}
            {new Date(submission.created_at).toLocaleString("id-ID")}
          </p>
          <p>
            <strong>Status Saat Ini:</strong> {submission.status}
          </p>
          {submission.status === "rejected" && submission.rejection_reason && (
            <p>
              <strong>Alasan Ditolak Sebelumnya:</strong>{" "}
              {submission.rejection_reason}
            </p>
          )}
          <a
            href={submission.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Lihat Berkas Unggahan
          </a>
        </div>

        {submission.status === "pending" && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="rejectionReason"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Alasan Penolakan (wajib diisi jika menolak)
              </label>
              <textarea
                id="rejectionReason"
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Contoh: File KHS tidak terbaca, mohon unggah ulang."
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                className="bg-red-600 text-white px-5 py-2"
                onClick={() => handleUpdateStatus("rejected")}
                // disabled={isSubmitting}
              >
                {isSubmitting ? "Memproses..." : "Tolak"}
              </Button>
              <Button
                className="bg-green-600 text-white px-5 py-2"
                onClick={() => handleUpdateStatus("accepted")}
                // disabled={isSubmitting}
              >
                {isSubmitting ? "Memproses..." : "Terima"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionDetailModal;
