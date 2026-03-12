type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionTitle({ eyebrow, title, description }: Props) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <div className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#d81920]">
          {eyebrow}
        </div>
      ) : null}

      <h2 className="mt-2 text-3xl font-black md:text-4xl">{title}</h2>

      {description ? (
        <p className="mt-3 max-w-2xl text-neutral-700">{description}</p>
      ) : null}
    </div>
  );
}