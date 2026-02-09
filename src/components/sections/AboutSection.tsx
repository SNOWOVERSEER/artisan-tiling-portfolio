import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import anime from "animejs";
import { Award, ShieldCheck, Clock, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const valueIcons = [Award, ShieldCheck, Clock, Users];

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && badgeRef.current) {
      anime({
        targets: badgeRef.current,
        scale: [0.5, 1],
        opacity: [0, 1],
        rotate: ["-10deg", "0deg"],
        duration: 800,
        easing: "easeOutElastic(1, 0.6)",
      });
    }
  }, [isInView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-charcoal relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/3 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="/images/about/about.png"
                alt="Tiling craftsmanship"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-gold" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-gold" />
            </div>

            {/* Experience badge */}
            <div
              ref={badgeRef}
              className="absolute -bottom-6 -right-6 lg:-right-8 w-32 h-32 bg-gold-gradient rounded-full flex flex-col items-center justify-center shadow-gold opacity-0"
            >
              <span className="text-3xl font-bold text-background font-serif">
                {t.about.yearsExp}
              </span>
              <span className="text-xs text-background/80 font-medium text-center leading-tight px-2">
                {t.about.yearsExpLabel}
              </span>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gold text-sm tracking-[0.3em] font-medium mb-4">
              {t.about.label}
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.about.title}</span>{" "}
              <span className="text-gold-gradient">
                {t.about.titleHighlight}
              </span>
            </h2>
            <p className="text-silver leading-relaxed mb-4">
              {t.about.description}
            </p>
            <p className="text-silver leading-relaxed mb-10">
              {t.about.description2}
            </p>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {t.about.values.map((value, i) => {
                const Icon = valueIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="group p-4 rounded-lg border border-border/50 hover:border-gold/30 bg-charcoal-dark/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                        <Icon className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1 font-sans text-sm">
                          {value.title}
                        </h4>
                        <p className="text-silver-dark text-xs leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
