import Image from "next/image";
import { Quote, Star } from "lucide-react";

const REVIEWS = [
  {
    text: "I couldn't walk without pain before visiting Mano. The personalized exercises and manual therapy worked wonders on my knee injury.",
    author: "Sarah Jenkins",
    role: "Marathon Runner",
    img: "https://picsum.photos/seed/s1/120/120",
  },
  {
    text: "Professional, clean, and highly effective. The therapists here actually listen and adjust the plan as you progress. Highly recommend.",
    author: "Robert Chen",
    role: "Architect",
    img: "https://picsum.photos/seed/s2/120/120",
  },
  {
    text: "Best rehab experience I've had. After my shoulder surgery, the team at Mano got me back to full range of motion in record time.",
    author: "Elena Petrova",
    role: "Tennis Coach",
    img: "https://picsum.photos/seed/s3/120/120",
  },
] as const;

const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-mano-bg overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-10 h-0.5 bg-mano-primary" />
            <span className="text-mano-primary font-black uppercase tracking-[0.2em] text-[12px]">
              Success Stories
            </span>
            <div className="w-10 h-0.5 bg-mano-primary" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight text-slate-950">
            Hear From Our <br />
            <span className="font-span text-mano-primary">Recovered Patients</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {REVIEWS.map((review) => (
            <article
              key={review.author}
              className="bg-white p-12 rounded-[3.5rem] shadow-[0_15px_45px_-15px_rgba(22,169,174,0.1)] flex flex-col justify-between space-y-10 relative overflow-hidden group hover:shadow-[0_40px_80px_-20px_rgba(22,169,174,0.15)] transition-all duration-700 hover:-translate-y-2"
            >
              <Quote size={80} className="text-mano-primary opacity-[0.05] absolute top-8 right-8 rotate-12" />

              <div className="space-y-8 relative z-10">
                <div className="flex space-x-1 text-mano-primary" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={18} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <h4 className="text-2xl font-medium text-slate-800 italic leading-[1.6] tracking-tight">
                  &quot;{review.text}&quot;
                </h4>
              </div>

              <div className="flex items-center space-x-5 pt-10 border-t border-mano-bg relative z-10">
                <Image
                  src={review.img}
                  alt={review.author}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-mano-bg shadow-lg"
                />
                <div>
                  <h5 className="font-black text-xl text-slate-950 tracking-tight">{review.author}</h5>
                  <p className="text-mano-grey font-bold uppercase tracking-widest text-[11px] mt-0.5">
                    {review.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
