import { Blog } from "@/app/components/sections/home";
import PageHero from "@/app/components/shared/PageHero";

const BlogPage = () => {
  return (
    <main className="pt-24">
      <PageHero
        title="Health Insights"
        description="Stay updated with the latest medical trends, wellness tips, and clinic news."
        variant="neutral"
      />

      <Blog />

      <section className="bg-white py-24">
        <div className="container mx-auto px-6 text-center">
          <button
            type="button"
            className="rounded-full bg-mano-primary px-8 py-4 font-bold text-white shadow-xl transition-colors hover:bg-mano-accent"
          >
            Load More Articles
          </button>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
