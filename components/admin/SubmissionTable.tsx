import React from "react";
import { Berkas } from "@/types/database";

type SubmissionWithProfile = Berkas & {
  profiles:
    | {
        full_name: string | null;
        nim: string | null;
      }[]
    | null;
};

interface SubmissionsTableProps {
  submissions: SubmissionWithProfile[];
  onReview: (submission: SubmissionWithProfile) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  onReview,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Mahasiswa
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NIM
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {submission.profiles?.[0]?.full_name ?? "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {submission.profiles?.[0]?.nim ?? "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onReview(submission)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsTable;
