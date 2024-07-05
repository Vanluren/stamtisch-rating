import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function UserAvatar() {
  return (
    <Link href={ROUTES.PROFILE}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  );
}
