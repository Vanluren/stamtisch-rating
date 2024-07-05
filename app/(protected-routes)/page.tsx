import { CardList } from "@/components/card-list";
import SearchHero from "@/components/search-hero";

export default function Page() {
  return (
    <div>
      <SearchHero />
      <CardList title="Top rated bars" description="These are top rated bars" />
    </div>
  );
}
