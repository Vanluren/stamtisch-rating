export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10  lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary-foreground" />
        <section className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">“To inifinity and beyond!”</p>
            <footer className="text-sm">Buzz Lightyear</footer>
          </blockquote>
        </section>
      </div>
      {children}
    </main>
  );
}
