import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { API_ROUTES, ROUTES } from "@/lib/routes";
import { fetcher } from "@/lib/fetch";
import { cookies } from "next/headers";
import { Profile, User } from "@prisma/client";
import { cn } from "@/lib/utils";

const avatarSize = {
  small: "h-8 w-8",
  medium: "h-12 w-12",
  large: "h-16 w-16",
  xl: "h-24 w-24",
};

type UserAvatarProps = {
  size?: keyof typeof avatarSize;
};

export default async function UserAvatar({ size = "medium" }: UserAvatarProps) {
  const currentUser = cookies().get("currentUser")?.value ?? "";

  const {
    user: { profile },
  } = await fetcher<{ user: User & { profile: Profile } }>(
    API_ROUTES.users.fetchById.replace(":id", currentUser),
    { method: "GET" },
  );

  const userInitials =
    `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
  const userFullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <Link href={ROUTES.profile.index}>
      <Avatar
        className={cn(avatarSize[size], "flex items-center justify-center")}
      >
        <AvatarImage src={profile.avatar ?? ""} alt={userFullName} />
        <AvatarFallback>{userInitials}</AvatarFallback>
      </Avatar>
    </Link>
  );
}
