import Nav from "@/components/nav/Nav";
import Hero from "@/components/hero/Hero";
import Showcase from "@/components/showcase/Showcase";
import Work from "@/components/work/Work";
import Services from "@/components/services/Services";
import Process from "@/components/process/Process";
import Stats from "@/components/stats/Stats";
import Testimonials from "@/components/testimonials/Testimonials";
import About from "@/components/about/About";
import FAQ from "@/components/faq/FAQ";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Showcase />
        <Work />
        <Services />
        <Process />
        <Stats />
        <Testimonials />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
