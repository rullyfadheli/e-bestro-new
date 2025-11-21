import * as React from "react";
// import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/client";
import { getStudentProfile } from "@/lib/users";

export function TeamSwitcher() {
  type Student = {
    name: string;
    studentID: string;
    profilePicture: string;
  };

  const [profile, setProfile] = React.useState<Student | null>(null);

  const fetchData = React.useCallback(async () => {
    const supabase = createClient();
    const userData = await supabase.auth.getUser();
    const user_id = userData.data.user?.id;

    // console.log(userData);
    if (!user_id) {
      setProfile(null);
      return;
    }

    const data = await getStudentProfile(user_id);
    // console.log(data);
    if (Array.isArray(data)) {
      setProfile({
        studentID: data[0].studentID,
        name: data[0].name,
        profilePicture: data[0].profilePicture,
      });
    } else {
      setProfile(null);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(profile?.profilePicture);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={profile?.profilePicture || "/avatar-icon.png"}
                  height={60}
                  width={60}
                  alt="Profile picture"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col text-left text-sm leading-tight w-full">
                  <span className="truncate text-xs text-[#757575]">
                    {profile?.studentID || "Unknown"}
                  </span>
                  <span className="truncate text-md font-bold line-clamp-1">
                    {/* {"Guest"} */}
                    {profile?.name || "Guest"}
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
