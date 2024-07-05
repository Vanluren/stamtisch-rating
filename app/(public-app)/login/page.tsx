"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const onFormSubmit = async () => {
    try {
      setLoading(true);
      console.log("submitting form");
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
