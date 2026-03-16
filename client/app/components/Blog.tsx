import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";

const POSTS = [
  {
    category: "Rehab Tips",
    title: "5 Daily Stretches to Relieve Lower Back Tension",
    date: "Sep 10, 2025",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000",
  },
  {
    category: "Injury Prevention",
    title: "Understanding Sports Recovery: Why Rest is Key",
    date: "Aug 22, 2025",
    img: "https://images.unsplash.com/photo-1594737625785-a6bad33ff119?auto=format&fit=crop&q=80&w=1000",
  },
] as const;

const Blog: React.FC = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-0.5 bg-mano-primary" />
              <span className="text-mano-primary font-black uppercase tracking-[0.2em] text-[12px]">
                Rehab Insights
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold leading-[1.1] text-slate-950">
              Wellness <br />
              <span className="font-span text-mano-primary">&amp; Mobility Articles</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="w-16 h-16 bg-mano-bg rounded-full border border-mano-pale flex items-center justify-center hover:bg-mano-primary hover:text-white hover:border-mano-primary transition-all duration-500 shadow-sm"
            aria-label="View all blog articles"
          >
            <ChevronRight size={32} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {POSTS.map((post) => (
            <Link
              key={post.title}
              href="/blog"
              className="group block relative rounded-[3.5rem] overflow-hidden aspect-16/11 bg-mano-dark shadow-2xl"
            >
              <Image
                src={post.img}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1500 group-hover:scale-110 opacity-60"
              />
              <div className="absolute inset-0 bg-linear-to-t from-mano-dark via-transparent to-transparent flex flex-col justify-end p-12 lg:p-16">
                <div className="space-y-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                  <div className="flex items-center space-x-5">
                    <span className="bg-mano-primary text-white text-[11px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em]">
                      {post.category}
                    </span>
                    <div className="flex items-center text-white/70 text-sm font-bold tracking-tight">
                      <Calendar size={16} className="mr-2 text-mano-pale" />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-mano-pale transition-colors leading-[1.2] tracking-tight">
                    {post.title}
                  </h3>
                  <div className="pt-6 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center text-mano-pale font-black uppercase tracking-[0.2em] text-[12px]">
                    Read Tips
                    <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
