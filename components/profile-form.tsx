"use client";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetch";
import { API_ROUTES } from "@/lib/routes";
import { Profile, User } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { PutBlobResult } from "@vercel/blob";

export default function ProfileForm({
  user,
}: {
  user: User & { profile: Profile };
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const _uploadProfileImage = async (
    file: File,
  ): Promise<PutBlobResult | undefined> => {
    try {
      if (!file) {
        return;
      }

      const { blob } = await fetcher<{
        status: number;
        message: string;
        blob: PutBlobResult;
      }>(API_ROUTES.blob.create.replace(":filename", file.name), {
        method: "POST",
        body: file,
      });

      if (blob) {
        return blob;
      }
    } catch (error) {
      toast.error("Failed to upload profile image");
      return;
    }
  };

  const onFormSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      let avatarBlobUrl;

      if (inputFileRef.current?.files) {
        const avatarBlob = await _uploadProfileImage(
          inputFileRef.current.files[0],
        );
        avatarBlobUrl = avatarBlob?.url;
      }

      const { ok } = await fetcher<{
        ok: boolean;
        user: User & { profile: Profile };
      }>(API_ROUTES.profile.updateByUserId.replace(":id", user.profile.id), {
        method: "PUT",
        body: JSON.stringify({
          firstName: formData.get("first-name"),
          lastName: formData.get("last-name"),
          bio: formData.get("bio"),
          avatar: avatarBlobUrl,
        }),
      });

      if (ok) {
        return toast.success("Profile updated successfully");
      }
    } catch (error) {
      return toast.error("Failed to update profile");
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
        <div>
          <Label htmlFor="avatar">Avatar</Label>
          <Input ref={inputFileRef} name="avatar" type="file" />
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
        <Button type="submit" className="w-full">
          {loading ? "Loading..." : "Update Profile"}
        </Button>
      </div>
    </form>
  );
}
