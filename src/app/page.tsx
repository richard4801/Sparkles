import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Categories } from "@/components/sections/categories";
import { Trending } from "@/components/sections/trending";
import { RecentlyAdded } from "@/components/sections/recently-added";
import { Universities } from "@/components/sections/universities";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Newsletter } from "@/components/sections/newsletter";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sparklyn",
  url: "https://sparklyn.ng",
  description:
    "Nigeria's academic resource marketplace for research projects, past questions, journals and business plans.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://sparklyn.ng/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <div className="space-y-20 py-6 lg:space-y-28 lg:py-10">
          <Stats />
          <Categories />
          <Trending />
          <RecentlyAdded />
          <Universities />
          <Testimonials />
          <Faq />
          <Newsletter />
        </div>
      </main>
      <Footer />
    </>
  );
}
