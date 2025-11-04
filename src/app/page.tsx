import { HeroSection } from "@/components/Home/HeroSection/HeroSection";

// const StatsAction = dynamic(
//   () => import("@/components/Home/StatsSection/StatsSection"),
//   {
//     ssr: true,
//   }
// );

// const LAZY_SECTIONS = [
//   { Component: StatsAction, height: "h-32", name: "stats" },
//   { Component: Sustainability, height: "h-40", name: "sustainability" },
//   { Component: RockWorthWorkSpaces, height: "h-48", name: "workspaces" },
//   { Component: TrustedCompanies, height: "h-24", name: "trusted-companies" },
//   { Component: TestimonialsCarousel, height: "h-56", name: "testimonials" },
//   { Component: InspiredCTA, height: "h-32", name: "cta" },
// ] as const;

export default async function Home() {
  return (
    <main className="min-h-screen">
      {/* Critical rendering path - immediate load */}
      <section aria-label="Hero section">
        <HeroSection />
      </section>

      {/* Progressive loading sections */}
      {/* {LAZY_SECTIONS.map(({ Component, height, name }) => (
        <OptimizedSection
          key={name}
          height={height}
          sectionName={name}
          rootMargin="150px"
          threshold={0.1}
        >
          <Component />
        </OptimizedSection>
      ))} */}
    </main>
  );
}
