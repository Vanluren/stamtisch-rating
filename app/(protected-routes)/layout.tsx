import UserAvatar from "@/components/user-avatar";
import { ROUTES } from "@/lib/routes";
import { BeerIcon } from "lucide-react";
import Link from "next/link";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="flex items-center flex-row justify-between pt-4 pb-2 px-3 bg-secondary">
        <Link href={ROUTES.HOME}>
          <BeerIcon className="w-8 h-8 m-2" />
        </Link>
        <UserAvatar size="small" />
      </nav>
      {children}
    </div>
  );
}
