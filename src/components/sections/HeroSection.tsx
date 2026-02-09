import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const particlesRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll(".particle");
      anime({
        targets: particles,
        translateY: () => anime.random(-80, 80),
        translateX: () => anime.random(-60, 60),
        opacity: [0, () => anime.random(2, 6) / 10],
        scale: () => anime.random(5, 15) / 10,
        duration: () => anime.random(3000, 6000),
        delay: () => anime.random(0, 2000),
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
      });
    }

    if (counterRef.current) {
      anime({
        targets: { val: 0 },
        val: 10,
        round: 1,
        duration: 2000,
        delay: 800,
        easing: "easeOutExpo",
        update: (anim) => {
          if (counterRef.current) {
            const obj = anim.animations[0];
            counterRef.current.textContent =
              String(Math.round(Number(obj.currentValue))) + "+";
          }
        },
      });
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 lg:pt-0 lg:pb-0">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 rounded-full bg-gold/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gold text-sm tracking-[0.3em] font-medium mb-6"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-2"
          >
            <span className="text-foreground">{t.hero.title1}</span>
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8"
          >
            <span className="text-gold-gradient">{t.hero.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-silver text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-gold-gradient text-background font-semibold px-8 py-6 text-base hover:shadow-gold transition-shadow duration-300"
            >
              {t.hero.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("#portfolio")}
              className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold px-8 py-6 text-base transition-all duration-300"
            >
              {t.hero.secondary}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-10 lg:mt-16 flex flex-wrap gap-8 lg:gap-12 border-t border-border/30 pt-6 lg:pt-8"
          >
            <div>
              <span
                ref={counterRef}
                className="text-3xl font-bold text-gold font-serif"
              >
                0+
              </span>
              <p className="text-silver-dark text-sm mt-1">
                {t.hero.stats.experience}
              </p>
            </div>
            <div>
              <span className="text-3xl font-bold text-gold font-serif">
                500+
              </span>
              <p className="text-silver-dark text-sm mt-1">
                {t.hero.stats.projects}
              </p>
            </div>
            <div>
              <span className="text-3xl font-bold text-gold font-serif">
                100%
              </span>
              <p className="text-silver-dark text-sm mt-1">
                {t.hero.stats.satisfaction}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-silver-dark text-xs tracking-widest uppercase">
          {t.hero.scrollDown}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
