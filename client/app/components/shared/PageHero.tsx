type PageHeroVariant = "brand" | "deep" | "neutral";

type PageHeroProps = {
  title: string;
  description: string;
  variant?: PageHeroVariant;
};

const VARIANT_STYLES: Record<
  PageHeroVariant,
  { section: string; description: string }
> = {
  brand: {
    section: "bg-mano-primary",
    description: "text-mano-pale",
  },
  deep: {
    section: "bg-slate-950",
    description: "text-slate-400",
  },
  neutral: {
    section: "bg-slate-900",
    description: "text-slate-400",
  },
};

const PageHero: React.FC<PageHeroProps> = ({
  title,
  description,
  variant = "deep",
}) => {
  const styles = VARIANT_STYLES[variant];

  return (
    <section className={`${styles.section} py-24 text-center`}>
      <div className="container mx-auto px-6">
        <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">{title}</h1>
        <p className={`mx-auto max-w-2xl text-xl ${styles.description}`}>
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHero;
