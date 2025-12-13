"use client";
import { logout } from "@/API/auth.api";
import { getCurrentUser } from "@/API/user.api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOnboardingStore } from "@/store/onbboading";
import { useUserStore } from "@/store/user.store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Header = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const { setFullname } = useOnboardingStore();

  const handleLogout = async () => {
    const { response, success } = await logout();
    if (!success) return toast.error(response || "Logout failed");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  // const { data, isLoading } = useQuery({
  //   queryKey: ["user-profile"],
  //   queryFn: getCurrentUser,
  // });

  // if (data && data.success && !user) {
  //   setUser(data.response);
  //   setFullname(data.response.fullname);
  // }

  return (
    <header className="flex item-center gap-x-4 justify-between py-2 sm:px-8 px-4">
      <div></div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Image
              src="/images/user.webp"
              alt="User"
              width={50}
              height={50}
              className="object-cover rounded-full sm:size-10 size-8"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              {user?.fullname || "Username"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
