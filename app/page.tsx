import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { Workshop } from "@/components/site/workshop";
import { Work } from "@/components/site/work";
import { Apps } from "@/components/site/apps";
import { Clients } from "@/components/site/clients";
import { Studio } from "@/components/site/studio";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { ConsoleEgg } from "@/components/site/console-egg";

export default function Home() {
  return (
    <div id="top" className="relative">
      <div aria-hidden className="wx-grid pointer-events-none fixed inset-0 -z-10" />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Workshop />
        <Work />
        <Apps />
        <Clients />
        <Studio />
        <Contact />
      </main>
      <Footer />
      <ConsoleEgg />
    </div>
  );
}
