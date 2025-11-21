"use client";

import React, { JSX } from "react";

import Image from "next/image";

// DB
import { createClient } from "@/utils/supabase/client";
import { getScholarshipApproval } from "@/lib/users";
function Semester(): JSX.Element {
  type SemesterData = {
    semester?: number;
    check_requirement?: number;
    status?: number;
    date?: string;
  }[];

  // 1 = verified
  // 2 = waiting approval
  // 3 = draft
  // 4 = decline

  const [semesterData, setSemesterData] = React.useState<SemesterData>([]);

  React.useEffect(() => {
    async function getScholarshipRequirement() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      const user_id = data.user?.id as string;

      const scholarshipData = await getScholarshipApproval(user_id);

      if (!scholarshipData) {
        console.log("Error Fetching data from DB");
        return;
      }

      // console.log(scholarshipData);
      setSemesterData(scholarshipData as SemesterData);
    }

    getScholarshipRequirement();
  }, []);

  function getStatusText(statusCode: number): string {
    switch (statusCode) {
      case 1:
        return "Verified";
      case 2:
        return "Waiting Approval";
      case 3:
        return "Draft";
      case 4:
        return "Decline";
      default:
        return "";
    }
  }

  function getRequirement(statusCode: number) {
    switch (statusCode) {
      case 1:
        return "Completed Report";
      case 2:
        return "Verification Process";
      case 3:
        return "Proceed with Submission";
      case 4:
        return "Check Requirement";
      default:
        return "";
    }
  }

  return (
    <div className="bg-primary w-full h-72 rounded-2xl mt-2 flex items-center">
      <div className="h-54 w-full  bg-white rounded-lg font-ubuntu">
        <div className="bg-[#F7F9FC] rounded-t-lg text-[#45474B] font-bold">
          <div className="h-7 border-2 rounded-t-lg border-[#6F7175] text-[#C4DEE9]font-bold text-sm flex justify-start">
            <div className="flex w-[10%] justify-center items-center">
              <span className="flex items-center justify-center w-full h-full">
                <Image
                  src={"/tag.png"}
                  height={10}
                  width={10}
                  alt="tag image"
                />
                <Image
                  src={"/column-sorting.png"}
                  height={10}
                  width={10}
                  alt="column sorting image"
                />
              </span>
            </div>
            <div className="text-center w-[20%] opacity-50 border-x-2">
              Semester
            </div>
            <div className="text-center w-[30%] opacity-50 border-r-2">
              Requirement
            </div>
            <div className="text-center w-[20%] opacity-50 border-r-2">
              Date
            </div>
            <div className="text-center w-[22%] opacity-50 border-r-2">
              Status
            </div>
          </div>
        </div>
        <div className="w-full overflow-y-auto bg-white h-52 border-x-2 border-b-2 border-[#6F7175] rounded-b-lg">
          {semesterData.map((data, index) => (
            <div
              key={index}
              className="h-14 text-[#45474B] font-bold text-sm flex justify-start"
            >
              <span className="flex border-1 border-solid w-[10%] justify-center items-center border-y-1">
                {index + 1}
              </span>
              <span className="flex border-1 border-solid justify-center text-center items-center w-[20%] border-y-1">
                Semester {data.semester}
              </span>
              <span className="flex border-1 border-solid justify-center items-center w-[30%] border-y-1">
                {getRequirement(data?.check_requirement as number)}
              </span>
              <span className="flex border-1 border-solid justify-center items-center w-[20%] border-y-1">
                {data?.date?.split("T")[0]}
              </span>
              <span
                className={`flex justify-center items-center w-[20%] border-y-1 `}
              >
                <span
                  className={`text-center sm:px-4 px-1 py-1 sm:py-2 rounded-2xl text-xs font-light sm:font-bold ${
                    data.status === 1 ? "bg-greenBg" : ""
                  }
                  ${data.status === 4 ? "bg-redBg" : ""}
                  ${data.status === 3 ? "bg-purpleBg" : ""}
                  ${data.status === 2 ? "bg-yellowBg" : ""}`}
                >
                  <span
                    className={`rounded-full inline-block h-2 w-2 sm:mr-2 mr-1 line-clamp-1 ${
                      data.status === 1 ? "bg-greenDot" : ""
                    } ${data.status === 4 ? "bg-redDot" : ""}
                    ${data.status === 3 ? "bg-purpleDot" : ""}
                    ${data.status === 2 ? "bg-yellowDot" : ""}`}
                  ></span>
                  {getStatusText(data?.status as number)}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Semester;
