import PageHero from "@/app/components/shared/PageHero";

const PrivacyPage = () => {
  return (
    <main className="pt-24">
      <PageHero
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information."
        variant="deep"
      />

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-3xl px-6 text-slate-700">
          <p className="leading-relaxed">
            We only collect information required to provide clinical care,
            schedule appointments, and improve your patient experience. Your data
            is handled securely and never sold to third parties.
          </p>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPage;
