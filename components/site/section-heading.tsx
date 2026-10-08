export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mb-10 font-head text-3xl font-extrabold tracking-tight text-fg md:text-4xl">
        {title}
      </h2>
    </>
  );
}
