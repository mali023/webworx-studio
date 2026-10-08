export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <>
      <p className="mb-3 font-mono text-sm text-mut">
        <span className="text-mut">{"// "}</span>
        {eyebrow}
      </p>
      <h2 className="mb-10 font-head text-3xl font-extrabold tracking-tight text-fg md:text-4xl">
        {title}
      </h2>
    </>
  );
}
