import Link from "next/link";
import ReviewCard from "./review-card";

type CardListProps = {
  title: string;
};

export function CardList({ title }: CardListProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
              <Link
                href="#"
                className="text-sm font-medium hover:underline text-secondary-foreground"
                prefetch={false}
              >
                View All
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <ReviewCard
                title="rarbar"
                description="Cozy cocktail lounge with a hidden entrance."
                id="abc2"
              />
              <ReviewCard
                title="some bar"
                description="Cozy cocktail lounge with a hidden entrance."
                id="abc3"
              />
              <ReviewCard
                title="berlin bar"
                description="Cozy cocktail lounge with a hidden entrance."
                id="abc4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
