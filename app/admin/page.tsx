"use client";

import React, { useState, useEffect, useCallback, JSX } from "react";
import Head from "next/head";
import { createClient } from "@/utils/supabase/client";
import SubmissionsTable from "@/components/admin/SubmissionTable";
import ReviewModal from "@/components/admin/ReviewModal";
import { Berkas } from "@/types/database";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/utils/app-sidebar";
import TitleBanner from "@/components/utils/TitleBanner";

type SubmissionWithProfile = Berkas & {
  profiles:
    | {
        full_name: string | null;
        nim: string | null;
      }[]
    | null;
};

const supabase = createClient();

function AdminDashboardPage(): JSX.Element {
  const [submissions, setSubmissions] = useState<SubmissionWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionWithProfile | null>(null);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("berkas")
      .select(
        `
        id, created_at, jenis_laporan, file_url, status, user_id, rejection_reason,
        profiles (full_name, nim)
      `
      )
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError);
      setError("Gagal memuat daftar pengajuan.");
    } else {
      setSubmissions(data as SubmissionWithProfile[]);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleReview = (submission: SubmissionWithProfile) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isUpdating) return;
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const updateStatus = async (
    id: number,
    status: "accepted" | "rejected",
    reason: string | null
  ) => {
    setIsUpdating(true);
    const { error: updateError } = await supabase
      .from("berkas")
      .update({ status: status, rejection_reason: reason })
      .eq("id", id);

    if (updateError) {
      alert(`Gagal memperbarui status: ${updateError.message}`);
    } else {
      setSubmissions((currentSubmissions) =>
        currentSubmissions.filter((submission) => submission.id !== id)
      );
      handleCloseModal();
    }
    setIsUpdating(false);
  };

  const handleApprove = (id: number) => {
    updateStatus(id, "accepted", null);
  };

  const handleReject = (id: number, reason: string) => {
    if (!reason.trim()) {
      alert("Alasan penolakan tidak boleh kosong.");
      return;
    }
    updateStatus(id, "rejected", reason);
  };

  const renderContent = () => {
    if (loading) {
      return <p>Memuat data pengajuan...</p>;
    }
    if (error) {
      return <p className="text-red-500">{error}</p>;
    }
    if (submissions.length === 0) {
      return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
          Tidak ada berkas baru yang perlu direview saat ini.
        </div>
      );
    }
    return (
      <SubmissionsTable submissions={submissions} onReview={handleReview} />
    );
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - BESTRO</title>
      </Head>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full min-h-screen pb-10 bg-gray-100 relative">
          <SidebarTrigger className="absolute top-9 bg-white md:-left-4 z-30 border-2 border-mainBG" />
          <div>
            <TitleBanner
              title="Dashboard Review Berkas"
              subTitle="Review dan kelola laporan dari penerima beasiswa"
            />
            <div className="px-4 md:px-6 py-6">
              <div className="container mx-auto">{renderContent()}</div>
            </div>
          </div>
        </main>

        <ReviewModal
          isOpen={isModalOpen}
          submission={selectedSubmission}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onReject={handleReject}
          isUpdating={isUpdating}
        />
      </SidebarProvider>
    </>
  );
}

export default AdminDashboardPage;
