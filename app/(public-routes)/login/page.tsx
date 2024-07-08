"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { API_ROUTES, ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { fetcher } from "@/lib/fetch";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { replace } = useRouter();
  const onFormSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      const res = await fetcher(API_ROUTES.login, {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      if (res.ok) {
        return replace(ROUTES.HOME);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="lg:p-8 flex flex-col h-full  justify-center mx-auto">
      <form
        action={onFormSubmit}
        className=" flex w-full flex-col justify-center space-y-6 sm:w-[350px] relative"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">
            Find your favourite stamtisch now! 🍻
          </p>
        </div>
        <div className="space-y-2">
          <Input type="email" name="email" placeholder="Email" required />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <Button aria-disabled={loading} type="submit">
          Log me in!
        </Button>
      </form>
      <div className="mt-4 flex flex-row justify-end gap-2">
        <span className="text-gray-400 ">Don&apos;t have an account?</span>
        <Link href={ROUTES.REGISTER} className="text-primary underline">
          Register here
        </Link>
      </div>
    </div>
  );
}
