"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetcher } from "@/lib/fetch";
import { API_ROUTES, ROUTES } from "@/lib/routes";
import { User, Profile } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const onFormSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      const res = await fetcher<{
        ok: boolean;
        user: User & { profile: Profile };
      }>(API_ROUTES.users.create, {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
          firstName: formData.get("first-name"),
          lastName: formData.get("last-name"),
        }),
      });

      if (res.ok) {
        setLoading(false);
        toast.success("Account created successfully. Please login.");
        return push(ROUTES.login);
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again later.");
      return;
    }
  };

  return (
    <div className="lg:p-8 flex flex-col mx-auto h-full items-center justify-center">
      <form
        action={onFormSubmit}
        className=" flex w-full flex-col justify-center space-y-6 sm:w-[350px] relative"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-muted-foreground">
            Create your account to find the best Stamtisch in town 🍻
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input name="first-name" placeholder="Ivan" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input name="last-name" placeholder="Sarkharin" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="ivan.sarkharin@unicorn.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type="password"
            placeholder="P4ssw0rd123!"
            required
          />
        </div>
        <Button aria-disabled={loading} type="submit">
          Sign Me Up!
        </Button>
      </form>
      <div className="mt-4 flex flex-row justify-end gap-2">
        <span className="text-gray-400 ">Already have an account?</span>
        <Link href={ROUTES.login} className="text-primary underline">
          Login here
        </Link>
      </div>
    </div>
  );
}
