import { Services } from "@/app/components/sections/home";
import PageHero from "@/app/components/shared/PageHero";

const ServicesPage = () => {
  return (
    <main className="pt-24">
      <PageHero
        title="Our Medical Specialties"
        description="Comprehensive care solutions designed for your unique health journey."
        variant="brand"
      />
      <Services />
    </main>
  );
};

export default ServicesPage;