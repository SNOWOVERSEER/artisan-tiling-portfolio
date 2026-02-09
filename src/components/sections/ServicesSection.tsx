import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import anime from "animejs";
import {
  LayoutGrid,
  Droplets,
  Ruler,
  Layers,
  Paintbrush,
  Grid3X3,
  Home,
  Building2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceIcons = [LayoutGrid, Droplets, Ruler, Layers, Paintbrush, Grid3X3];

const serviceImages = {
  residential: [
    "/images/services/residential/tile-installation.jpg",
    "/images/services/residential/waterproofing.jpg",
    "/images/services/residential/self-levelling.jpg",
    "/images/services/residential/screeding.jpg",
    "/images/services/residential/caulking.jpg",
    "/images/services/residential/grouting.jpg",
  ],
  commercial: [
    "/images/services/commercial/tile-installation.jpg",
    "/images/services/commercial/waterproofing.jpg",
    "/images/services/commercial/self-levelling.jpg",
    "/images/services/commercial/screeding.jpg",
    "/images/services/commercial/caulking.jpg",
    "/images/services/commercial/grouting.jpg",
  ],
};

type Context = "residential" | "commercial";

export default function ServicesSection() {
  const { t } = useLanguage();
  const [activeContext, setActiveContext] = useState<Context>("residential");
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    Array(6).fill(false)
  );
  const [isFlipping, setIsFlipping] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView && headerRef.current) {
      anime({
        targets: headerRef.current.querySelector(".section-line"),
        width: [0, 80],
        duration: 800,
        easing: "easeOutExpo",
      });
    }
  }, [isInView]);

  const handleToggle = (newContext: Context) => {
    if (newContext === activeContext || isFlipping) return;

    // Switch button immediately
    setActiveContext(newContext);
    setIsFlipping(true);

    // Stagger flip each card one by one
    const newFlipped = [...flippedCards];
    const flipToState = newContext === "commercial";

    t.services.items.forEach((_, i) => {
      setTimeout(() => {
        newFlipped[i] = flipToState;
        setFlippedCards([...newFlipped]);

        if (i === t.services.items.length - 1) {
          setTimeout(() => {
            setIsFlipping(false);
          }, 600);
        }
      }, i * 100);
    });
  };

  return (
    <section
      id="services"
      className="section-padding bg-charcoal-dark relative overflow-hidden"
    >
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(43 72% 53%) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(43 72% 53%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gold text-sm tracking-[0.3em] font-medium mb-4"
          >
            {t.services.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-foreground">{t.services.title}</span>{" "}
            <span className="text-gold-gradient">
              {t.services.titleHighlight}
            </span>
          </motion.h2>
          <div className="flex justify-center mb-6">
            <div className="section-line h-px bg-gold" style={{ width: 0 }} />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-silver max-w-2xl mx-auto"
          >
            {t.services.description}
          </motion.p>
        </div>

        {/* Sliding Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="relative inline-flex rounded-full border border-border/50 p-1 bg-charcoal">
            {/* Sliding indicator */}
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-gold-gradient shadow-gold"
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                left: activeContext === "residential" ? "4px" : "50%",
                right: activeContext === "commercial" ? "4px" : "50%",
              }}
            />

            <button
              onClick={() => handleToggle("residential")}
              className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeContext === "residential"
                  ? "text-background"
                  : "text-silver hover:text-gold"
              }`}
            >
              <Home className="h-4 w-4" />
              {t.services.residential}
            </button>
            <button
              onClick={() => handleToggle("commercial")}
              className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeContext === "commercial"
                  ? "text-background"
                  : "text-silver hover:text-gold"
              }`}
            >
              <Building2 className="h-4 w-4" />
              {t.services.commercial}
            </button>
          </div>

          {/* Context description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeContext}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-silver-dark max-w-xl text-center mt-6 text-sm"
            >
              {activeContext === "residential"
                ? t.services.residentialDesc
                : t.services.commercialDesc}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Services Grid - Flip Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((service, i) => {
            const Icon = serviceIcons[i];
            const isFlipped = flippedCards[i];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ perspective: 1200 }}
              >
                {/* Flip container — auto height on mobile, fixed on md+ */}
                <div
                  className="relative w-full h-auto md:h-[400px]"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: isFlipped
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT - Residential (relative so parent gets height on mobile) */}
                  <div
                    className="relative md:absolute md:inset-0"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                  >
                    <FlipCard
                      image={serviceImages.residential[i]}
                      title={service.title}
                      description={service.residentialDesc}
                      Icon={Icon}
                      context="residential"
                    />
                  </div>

                  {/* BACK - Commercial */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg) translateZ(0)",
                    }}
                  >
                    <FlipCard
                      image={serviceImages.commercial[i]}
                      title={service.title}
                      description={service.commercialDesc}
                      Icon={Icon}
                      context="commercial"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FlipCard({
  image,
  title,
  description,
  Icon,
  context,
}: {
  image: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  context: Context;
}) {
  return (
    <div className="group bg-charcoal border border-border/50 hover:border-gold/30 transition-all duration-500 rounded-lg h-full flex flex-col overflow-hidden">
      <div className="relative h-48 shrink-0 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

        {/* Icon */}
        <div className="absolute bottom-4 left-4 w-11 h-11 rounded-lg bg-gold/20 backdrop-blur-sm flex items-center justify-center border border-gold/30">
          <Icon className="h-5 w-5 text-gold" />
        </div>

        {/* Tag - top right */}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase backdrop-blur-md ${
            context === "residential"
              ? "bg-charcoal/60 text-gold border border-gold/25"
              : "bg-charcoal/60 text-blue-300 border border-blue-400/25"
          }`}
        >
          {context === "residential" ? "RES" : "COM"}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 min-h-0">
        <h3 className="text-lg font-semibold text-foreground mb-2 font-serif group-hover:text-gold transition-colors duration-300">
          {title}
        </h3>
        <p className="text-silver-dark text-sm leading-relaxed md:line-clamp-4">
          {description}
        </p>
      </div>
    </div>
  );
}
