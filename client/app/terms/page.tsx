import PageHero from "@/app/components/shared/PageHero";

const TermsPage = () => {
  return (
    <main className="pt-24">
      <PageHero
        title="Terms of Service"
        description="Basic terms for using our website and booking services."
        variant="neutral"
      />

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-3xl px-6 text-slate-700">
          <p className="leading-relaxed">
            By using this website, you agree to provide accurate information,
            attend scheduled appointments responsibly, and use our content for
            personal informational purposes only.
          </p>
        </div>
      </section>
    </main>
  );
};

export default TermsPage;
