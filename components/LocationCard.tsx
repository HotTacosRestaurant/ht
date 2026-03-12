import Link from "next/link";
import type { Branch } from "@/app/lib/site-data";

type Props = {
  branch: Branch;
};

export default function LocationCard({ branch }: Props) {
  return (
    <article className="ht-card overflow-hidden">
      <div className="aspect-16/10 bg-neutral-200">
        <img
          src={branch.imageUrl}
          alt={branch.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <div className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#d81920]">
          {branch.city}
        </div>

        <h3 className="mt-1 text-2xl font-black">{branch.name}</h3>

        <p className="mt-3 text-sm text-neutral-700">{branch.address}</p>
        <p className="mt-1 text-sm font-semibold">{branch.phoneDisplay}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href={branch.orderUrl}
            target="_blank"
            rel="noreferrer"
            className="ht-btn ht-btn-primary"
          >
            Order
          </a>

          <a
            href={branch.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="ht-btn ht-btn-secondary"
          >
            Directions
          </a>

          <a href={branch.phoneHref} className="ht-btn border border-black/10">
            Call
          </a>

          <Link
            href={`/locations/${branch.key}`}
            className="ht-btn border border-black/10"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}