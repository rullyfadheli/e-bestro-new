import React, { useState, useEffect } from "react";
import { Berkas } from "@/types/database";
import Button from "@/components/Button"; // Gunakan komponen Button Anda

interface ReviewModalProps {
  submission: Berkas | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number, reason: string) => void;
  isUpdating: boolean;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  submission,
  isOpen,
  onClose,
  onApprove,
  onReject,
  isUpdating,
}) => {
  const [reason, setReason] = useState("");

  useEffect(() => {
    // Reset reason saat modal dibuka dengan submission baru
    if (submission) {
      setReason(submission.rejection_reason || "");
    }
  }, [submission]);

  if (!isOpen || !submission) return null;

  const handleReject = () => {
    if (!reason.trim()) {
      alert("Alasan penolakan wajib diisi.");
      return;
    }
    onReject(submission.id, reason);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">Review Berkas</h3>
          <p className="text-sm text-gray-600">
            {submission.profiles?.full_name} - {submission.profiles?.nim}
          </p>
        </div>

        <div className="p-6 space-y-4">
          <p>
            <strong>Jenis Laporan:</strong> {submission.jenis_laporan}
          </p>
          <a
            href={submission.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white bg-indigo-600 hover:bg-indigo-700 font-semibold py-2 px-4 rounded-md transition"
          >
            Lihat Berkas Unggahan
          </a>
          <div className="mt-4">
            <label
              htmlFor="rejectionReason"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Catatan / Alasan Penolakan
            </label>
            <textarea
              id="rejectionReason"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Isi alasan jika berkas ditolak..."
            />
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex justify-between items-center rounded-b-lg">
          <Button
            className="text-gray-600"
            onClick={onClose}
            // disabled={isUpdating}
          >
            Batal
          </Button>
          <div className="space-x-3">
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleReject}
              // disabled={isUpdating || !reason.trim()}
            >
              {isUpdating ? "Menolak..." : "Tolak"}
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => onApprove(submission.id)}
              // disabled={isUpdating}
            >
              {isUpdating ? "Menerima..." : "Terima"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
