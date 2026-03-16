import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";

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

