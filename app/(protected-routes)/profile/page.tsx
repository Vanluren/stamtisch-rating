import { fetcher } from "@/lib/fetch";
import { API_ROUTES } from "@/lib/routes";
import { Profile, User } from "@prisma/client";
import { cookies } from "next/headers";
import UserAvatar from "@/components/user-avatar";
import ProfileForm from "@/components/profile-form";

export default async function MyProfilePage() {
  const currentUser = cookies().get("currentUser")?.value ?? "";

  const { user } = await fetcher<{ user: User & { profile: Profile } }>(
    API_ROUTES.users.fetchById.replace(":id", currentUser),
    { method: "GET", next: { tags: ["user"] } },
  );

  return (
    <div className="flex flex-col justify-center items-center w-full px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <UserAvatar size="xl" />
          </div>
          <div className="mt-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground capitalize">
              {user.profile.firstName} {user.profile.lastName}
            </h2>
          </div>
        </div>
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
