import { ROUTES } from "@/lib/routes";
import { BeerIcon } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-32 w-32 rounded-full bg-primary p-6 text-primary-foreground sm:h-40 sm:w-40">
          <BeerIcon className="h-full w-full" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Looks like you&apos;ve had one too many!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Sorry, we&apos;re all out of drinks - try again later!
        </p>
        <div className="mt-6">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Take me back home
          </Link>
        </div>
      </div>
    </div>
  );
}
