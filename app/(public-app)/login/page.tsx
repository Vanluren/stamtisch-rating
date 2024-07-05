"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { API_ROUTES, ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const onFormSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      const res = await fetch(API_ROUTES.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      }).then((res) => res.json());

      if (res.ok) {
        return redirect(ROUTES.HOME);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="lg:p-8 flex flex-col">
      <form
        action={onFormSubmit}
        className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] relative"
      >
        <h1 className="text-3xl font-normal">Login</h1>
        <Input type="email" name="email" placeholder="Email" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button aria-disabled={loading} type="submit">
          Log me in!
        </Button>
      </form>
    </div>
  );
}
