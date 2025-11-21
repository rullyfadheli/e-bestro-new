"use client";

import React, { JSX } from "react";

// Components
import FormProgressBar from "../ui/FormProgressBar";
import { FormSelect } from "../ui/FormSelect";
import PaymentUploadBox from "./PaymentUploadBox";
import FooterButton from "./FooterButton";
import FormInputSemester from "./FormInputSemester";
import FormInputPayment from "./FormInputPayment";
import GradeUploadBox from "./GradeUploadBox";
import FormInputCumulativeGrade from "./FormInputCumulativeGrade";

function InputForm(): JSX.Element {
  return (
    <form className="p-2">
      <FormProgressBar />
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mr-3">
        <div className="flex flex-col gap-y-3">
          <FormSelect
            label="Semester"
            options={["1", "2", "3", "4", "5", "6", "7", "8"]}
            required
          />
          <FormInputSemester
            label="Indeks Prestasi Semester"
            placeholder="Nilai Indeks Prestasi Semester"
            type="number"
            required={true}
          />
          <GradeUploadBox label="Upload Transkrip Nilai" />
        </div>
        <div className="flex flex-col gap-y-3">
          <FormInputPayment
            label="Tanggal Bayar UKT"
            placeholder="Tanggal Bayar UKT"
            type="date"
            required={true}
          />

          <FormInputCumulativeGrade
            label="Indeks Prestasi Kumulatif"
            placeholder="Nilai Indeks Prestasi Kumulatif"
            type="number"
            required={true}
          />

          <PaymentUploadBox label="Upload bukti bayar UKT" />
        </div>
        <FooterButton />
      </div>
    </form>
  );
}

export default InputForm;
