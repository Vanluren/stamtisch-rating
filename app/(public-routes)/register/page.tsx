"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetcher } from "@/lib/fetch";
import { API_ROUTES, ROUTES } from "@/lib/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const onFormSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      const res = await fetcher(API_ROUTES.users.create, {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
          firstName: formData.get("first-name"),
          lastName: formData.get("last-name"),
        }),
      });

      if (res.ok) {
        return push(ROUTES.LOGIN);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:p-8 flex flex-col mx-auto">
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
            <Input name="first-name" placeholder="Pede" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input name="last-name" placeholder="Pik" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="pede@pik.com"
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
        <Link href={ROUTES.LOGIN} className="text-primary underline">
          Login here
        </Link>
      </div>
    </div>
  );
}
