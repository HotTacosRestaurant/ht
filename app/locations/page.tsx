import SectionTitle from "@/components/SectionTitle";
import LocationCard from "@/components/LocationCard";
import { BRANCHES } from "@/lib/site-data";

export default function LocationsPage() {
  return (
    <section className="ht-section">
      <div className="ht-shell">
        <SectionTitle
          eyebrow="Locations"
          title="Leamington and Windsor"
          description="Pick your nearest branch and take the shortest path to order, call, or get directions."
        />

        <div className="ht-grid-2">
          <LocationCard branch={BRANCHES.leamington} />
          <LocationCard branch={BRANCHES.windsor} />
        </div>
      </div>
    </section>
  );
}