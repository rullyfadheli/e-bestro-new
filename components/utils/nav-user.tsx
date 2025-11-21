"use client";

import Image from "next/image";
import { signOut } from "@/lib/users";

import // BadgeCheck,
// Bell,
// ChevronsUpDown,
// CreditCard,
// LogOut,
// Sparkles,
"lucide-react";

import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  // DropdownMenuContent,
  // DropdownMenuGroup,
  // DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // useSidebar,
} from "@/components/ui/sidebar";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    avatar: string;
  };
}) {
  // const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              onClick={async () => {
                await signOut();
              }}
            >
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-6 w-6">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <Image
                    src={user.avatar}
                    width={40}
                    height={40}
                    alt={user.name}
                    className="w-6 h-6 "
                  />
                  {/* <AvatarFallback className="rounded-lg">CN</AvatarFallback> */}
                </Avatar>
                <div className="flex text-left text-sm leading-tight">
                  <span className="truncate font-medium text-red-600 font-ubuntu">
                    {user.name}
                  </span>
                  {/* <span className="truncate text-xs">{user.email}</span> */}
                </div>
                {/* <ChevronsUpDown className="ml-auto size-4" /> */}
              </SidebarMenuButton>
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
