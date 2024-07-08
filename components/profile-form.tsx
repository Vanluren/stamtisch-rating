"use client";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetch";
import { API_ROUTES } from "@/lib/routes";
import { Profile, User } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ProfileForm({
  user,
}: {
  user: User & { profile: Profile };
}) {
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      await fetcher<User & { profile: Profile }>(
        API_ROUTES.profile.updateByUserId.replace(":id", user.profile.id),
        {
          method: "PUT",
          body: JSON.stringify({
            firstName: formData.get("first-name"),
            lastName: formData.get("last-name"),
            bio: formData.get("bio"),
          }),
        },
      );

      return;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" action={onFormSubmit}>
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={user.email}
            disabled
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              name="first-name"
              type="text"
              autoComplete="given-name"
              required
              defaultValue={user.profile.firstName}
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              name="last-name"
              type="text"
              autoComplete="family-name"
              required
              defaultValue={user.profile.lastName}
              disabled={loading}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            rows={3}
            defaultValue={user.profile.bio ?? ""}
            disabled={loading}
          />
        </div>
      </div>
      <div>
        <Button type="submit" className="w-full" loading={loading}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}
