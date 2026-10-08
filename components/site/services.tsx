import {
  IconWorld,
  IconLayoutGrid,
  IconDeviceMobile,
  IconPalette,
  IconSpeakerphone,
  IconTool,
  IconSparkles,
  IconMessageCircle,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const features = [
  {
    title: "Websites",
    description:
      "Fast, responsive, pixel-perfect websites that turn visitors into customers — from brochure sites to high-volume online stores.",
    icon: <IconWorld />,
  },
  {
    title: "Custom Web Apps",
    description:
      "Tailor-made web applications built around your workflow — back-office tools, booking systems, dashboards and POS integrations.",
    icon: <IconLayoutGrid />,
  },
  {
    title: "Mobile Apps",
    description: "Smooth, native-feel apps for iOS, Android and macOS, from first idea to app store.",
    icon: <IconDeviceMobile />,
  },
  {
    title: "Graphic Design",
    description:
      "Logos, brand identities and visuals that make your business unmistakable — on screen and in print.",
    icon: <IconPalette />,
  },
  {
    title: "Social Media",
    description:
      "Full channel management — content, campaigns and scheduling, run end-to-end the way we run it for Hawke.",
    icon: <IconSpeakerphone />,
  },
  {
    title: "Device Repairs",
    description: (
      <>
        A specialist service bench repairing thermal optics on the brand&apos;s own behalf.{" "}
        <a href="#workshop" className="font-medium text-accent hover:underline">
          See the workshop →
        </a>
      </>
    ),
    icon: <IconTool />,
  },
  {
    title: "Your Project",
    description: (
      <>
        Got something different in mind? We like different.{" "}
        <a href="#contact" className="font-medium text-accent hover:underline">
          Let&apos;s talk →
        </a>
      </>
    ),
    icon: <IconSparkles />,
  },
  {
    title: "Straight Answers",
    description:
      "No jargon, no account managers, no runaround — you talk directly to the person building your thing.",
    icon: <IconMessageCircle />,
  },
];

function Feature({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  index: number;
}) {
  return (
    <div
      className={cn(
        "group/feature relative flex flex-col border-line py-10 lg:border-r",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b",
      )}
    >
      {index < 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-brand/10 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}
      {index >= 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-brand/10 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}
      <div className="relative z-10 mb-4 px-10 text-accent">{icon}</div>
      <div className="relative z-10 mb-2 px-10 font-head text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-liner transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-brand" />
        <span className="inline-block text-fg transition duration-200 group-hover/feature:translate-x-2">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm leading-relaxed text-mut">{description}</p>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading eyebrow="What we do" title="Full-stack, full-service." />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}
