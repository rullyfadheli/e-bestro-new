"use client";

import React, { JSX } from "react";
import { createClient } from "@/utils/supabase/client";
import { getStudentNameById } from "@/lib/users";

// Types
import type { Student } from "@/types/student";

function BannerStudentName(): JSX.Element {
  const [name, setName] = React.useState<string>();

  React.useEffect(() => {
    async function getStudentName(): Promise<void> {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      const user_id = data.user?.id as string;

      if (error) {
        setName("Server Error");
      }

      const studentData = (await getStudentNameById(user_id)) as Student[];
      console.log(studentData);
      console.log(data);

      if (!studentData) {
        setName("User Not Found");
        return;
      }
      const studentName: string = studentData[0].name;
      setName(studentName);

      return;
    }

    getStudentName();
  }, []);
  return (
    <p className="font-poppins font-bold">
      <span className="text-md font-light">Selamat Bergabung, </span>
      {name}! BESTRO siap menemani perjalanan suksesmu!
    </p>
  );
}

export default BannerStudentName;
