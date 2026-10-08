import {
  IconWorld,
  IconLayoutGrid,
  IconDeviceMobile,
  IconPalette,
  IconSpeakerphone,
  IconTool,
  IconSparkles,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { SectionHeading } from "./section-heading";

function CellHeader({ tag, from, to }: { tag: string; from: string; to: string }) {
  return (
    <div
      className="flex min-h-[6rem] w-full flex-1 items-center justify-center rounded-lg border border-line"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <span className="font-mono text-sm font-semibold text-white/90 md:text-base">{tag}</span>
    </div>
  );
}

const iconClass = "h-5 w-5 text-accent";

const items = [
  {
    title: "Websites",
    description:
      "Fast, responsive, pixel-perfect websites that turn visitors into customers — from brochure sites to high-volume online stores.",
    header: <CellHeader tag="<websites/>" from="#084c61" to="#00a878" />,
    icon: <IconWorld className={iconClass} />,
    className: "md:col-span-2",
  },
  {
    title: "Custom Web Apps",
    description:
      "Tailor-made web applications built around your workflow — back-office tools, booking systems, dashboards and POS integrations.",
    header: <CellHeader tag="<web_apps/>" from="#10201f" to="#084c61" />,
    icon: <IconLayoutGrid className={iconClass} />,
    className: "md:col-span-1",
  },
  {
    title: "Mobile Apps",
    description: "Smooth, native-feel apps for iOS, Android and macOS, from first idea to app store.",
    header: <CellHeader tag="<mobile_apps/>" from="#00a878" to="#10201f" />,
    icon: <IconDeviceMobile className={iconClass} />,
    className: "md:col-span-1",
  },
  {
    title: "Graphic Design",
    description:
      "Logos, brand identities and visuals that make your business unmistakable — on screen and in print.",
    header: <CellHeader tag="<graphic_design/>" from="#2bd79a" to="#084c61" />,
    icon: <IconPalette className={iconClass} />,
    className: "md:col-span-1",
  },
  {
    title: "Social Media",
    description:
      "Full channel management — content, campaigns and scheduling, run end-to-end the way we run it for Hawke.",
    header: <CellHeader tag="<social_media/>" from="#084c61" to="#2bd79a" />,
    icon: <IconSpeakerphone className={iconClass} />,
    className: "md:col-span-1",
  },
  {
    title: "Device Repairs",
    description: (
      <>
        A specialist service bench repairing thermal optics on the brand&apos;s own behalf.{" "}
        <a href="#workshop" className="text-accent hover:underline">
          see the workshop →
        </a>
      </>
    ),
    header: <CellHeader tag="<device_repairs/>" from="#10201f" to="#00a878" />,
    icon: <IconTool className={iconClass} />,
    className: "md:col-span-2",
  },
  {
    title: "Your Project",
    description: (
      <>
        Got something different in mind? We like different.{" "}
        <a href="#contact" className="text-accent hover:underline">
          let&apos;s talk →
        </a>
      </>
    ),
    header: <CellHeader tag="<your_project/>" from="#51665e" to="#10201f" />,
    icon: <IconSparkles className={iconClass} />,
    className: "md:col-span-1",
  },
];

export function Services() {
  return (
    <section id="services" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading eyebrow="what_we_do" title="Full-stack, full-service." />
      <BentoGrid className="max-w-none md:auto-rows-[20rem]">
        {items.map((item) => (
          <BentoGridItem
            key={item.title}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={
              "border-line bg-surface transition-colors hover:border-brand/50 dark:border-line dark:bg-surface dark:shadow-none " +
              item.className
            }
          />
        ))}
      </BentoGrid>
    </section>
  );
}
