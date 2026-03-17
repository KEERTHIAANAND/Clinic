import {
  About,
  Blog,
  Hero,
  Services,
  Testimonials,
  WhyUs,
} from "@/app/components/sections/home";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Testimonials />
      <Blog />
    </main>
  );
}

