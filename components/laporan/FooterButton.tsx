"use client";

import React, { JSX } from "react";

import Button from "../Button";

// Context
import { useProgressBar } from "@/context/store";
import { useReport } from "@/context/store";

// DB
import { createClient } from "@/utils/supabase/client";
import { uploadGradeDocument } from "@/lib/users";
import { uploadPaymentDocument, uploadGradeReport } from "@/lib/users";
function FooterButton(): JSX.Element {
  const { updateProgress } = useProgressBar();

  // getting all context values
  const {
    updateCumulativeGradeIndex,
    updateGradeFile,
    updatePaymentDate,
    updatePaymentFile,
    updateSemester,
    updateSemesterGradeIndex,
    semesterGradeIndex,
    gradeFile,
    paymentFile,
    paymentDate,
    semester,
    cumulativeGradeIndex,
  } = useReport();

  // function to set progress bar to 0 and remove all values
  function handleRemoveValue() {
    updateCumulativeGradeIndex(null);
    updateGradeFile(null);
    updatePaymentDate("");
    updatePaymentFile(null);
    updateSemester(null);
    updateSemesterGradeIndex(null);
    updateProgress(0);
    console.log(semesterGradeIndex);
  }

  // function to handle submit button click
  async function handleSubmit() {
    if (
      semester === null ||
      semesterGradeIndex === null ||
      gradeFile === null ||
      paymentFile === null ||
      paymentDate === "" ||
      cumulativeGradeIndex === null
    ) {
      alert("Mohon lengkapi semua field sebelum mengirim.");
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    // getting user_id
    const user_id = data?.user?.id;
    if (error || !user_id) {
      console.error("User ID tidak ditemukan.");
      alert("Terjadi kesalahan, silakan coba lagi.");
      return;
    }

    try {
      const regex = /^[a-zA-Z0-9.\-_ ]+$/;

      if (
        regex.test(paymentFile.name) === false ||
        regex.test(gradeFile.name) === false
      ) {
        alert("Nama file hanya huruf dan angka yang diperbolehkan.");
      }

      //uploading semester non file value to DB
      const uploadGradeToDBError = await uploadGradeReport({
        semester,
        gradeIndex: semesterGradeIndex,
        cumulativeGradeIndex,
        paymentDate,
        user_id,
      });

      if (uploadGradeToDBError) {
        alert("Gagal mengunggah dokumen.");
        return;
      }

      //uploading grade docs to DB
      const uploadGradeError = await uploadGradeDocument(gradeFile, user_id);
      //uploading payment docs to DB
      const uploadPaymentError = await uploadPaymentDocument(
        paymentFile,
        user_id
      );

      if (uploadGradeError || uploadPaymentError) {
        alert(
          "File sudah ada di database. Silakan ganti nama file dan coba lagi."
        );
        return;
      }
      // If all uploads are successful, reset the form
      handleRemoveValue();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Gagal mengunggah dokumen:", error);
        alert(
          "Terjadi kesalahan saat mengunggah dokumen. Silakan refresh halaman dan coba lagi. " +
            error.message
        );
      }
    }
  }
  return (
    <div className="col-span-1 md:col-span-2">
      <div className="flex gap-4 h-10 justify-center">
        <Button
          onClick={handleRemoveValue}
          className="bg-white px-10 py-2 hover:text-primary hover:bg-secondary text-secondary border border-secondary"
        >
          Batal
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-secondary text-white hover:bg-white hover:text-primary hover:border-primary border border-secondary py-2 px-11"
        >
          Kirim
        </Button>
      </div>
    </div>
  );
}

export default FooterButton;
