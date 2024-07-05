import UserAvatar from "@/components/user-avatar";
import { BeerIcon } from "lucide-react";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="flex items-center flex-row justify-between pt-4 pb-2 px-3 bg-secondary">
        <BeerIcon className="w-8 h-8 m-2" />
        <UserAvatar />
      </nav>
      {children}
    </div>
  );
}
