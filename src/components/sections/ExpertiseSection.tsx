import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import anime from "animejs";
import {
  MapPin,
  Gem,
  LayoutGrid,
  Grid2X2,
  Layers,
  Droplets,
  Sun,
  Diamond,
  Circle,
  Maximize2,
  Mountain,
  Grid3X3,
  AlignJustify,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/* ── Category metadata ─────────────────────────────────────── */

interface CatMeta {
  Icon: LucideIcon;
  itemIcons: LucideIcon[];
}

const categoryMeta: CatMeta[] = [
  {
    Icon: MapPin,
    itemIcons: [Grid2X2, Layers, Droplets, Sun],
  },
  {
    Icon: Gem,
    itemIcons: [Diamond, Circle, Maximize2, Mountain, LayoutGrid],
  },
  {
    Icon: Grid3X3,
    itemIcons: [LayoutGrid, AlignJustify, Zap, RotateCcw, Sparkles],
  },
];

/* ── CSS tile‑pattern overlays for category headers ────────── */

const tilePatterns: React.CSSProperties[] = [
  // Grid — "By Location"
  {
    backgroundImage: `
      linear-gradient(hsl(43 72% 53% / 0.15) 1px, transparent 1px),
      linear-gradient(90deg, hsl(43 72% 53% / 0.15) 1px, transparent 1px)`,
    backgroundSize: "22px 22px",
  },
  // Diamond — "By Material"
  {
    backgroundImage: `
      linear-gradient(45deg, hsl(43 72% 53% / 0.1) 25%, transparent 25%),
      linear-gradient(-45deg, hsl(43 72% 53% / 0.1) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, hsl(43 72% 53% / 0.1) 75%),
      linear-gradient(-45deg, transparent 75%, hsl(43 72% 53% / 0.1) 75%)`,
    backgroundSize: "24px 24px",
    backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0",
  },
  // Chevron / Herringbone — "By Pattern"
  {
    backgroundImage: `
      linear-gradient(135deg, hsl(43 72% 53% / 0.12) 25%, transparent 25%),
      linear-gradient(225deg, hsl(43 72% 53% / 0.12) 25%, transparent 25%),
      linear-gradient(315deg, hsl(43 72% 53% / 0.12) 25%, transparent 25%),
      linear-gradient(45deg, hsl(43 72% 53% / 0.12) 25%, transparent 25%)`,
    backgroundSize: "20px 10px",
    backgroundPosition: "0 0, 10px 0, 10px -5px, 0 5px",
  },
];

/* ── Component ─────────────────────────────────────────────── */

export default function ExpertiseSection() {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  /* Staggered tile‑laying reveal */
  useEffect(() => {
    if (!isInView || !gridRef.current) return;

    // Category headers
    anime({
      targets: gridRef.current.querySelectorAll(".cat-header"),
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(120),
      duration: 700,
      easing: "easeOutCubic",
    });

    // Build diagonal‑wave delays: col offset + row offset
    const cols = gridRef.current.querySelectorAll(".cat-col");
    const allItems: { el: Element; delay: number }[] = [];

    cols.forEach((col, colIdx) => {
      col.querySelectorAll(".tile-item").forEach((el, rowIdx) => {
        allItems.push({ el, delay: colIdx * 90 + rowIdx * 70 });
      });
    });

    // Sort by delay so anime fires in wave order
    allItems.sort((a, b) => a.delay - b.delay);

    anime({
      targets: allItems.map((x) => x.el),
      opacity: [0, 1],
      translateY: [35, 0],
      delay: (_el: Element, i: number) => allItems[i].delay + 200,
      duration: 600,
      easing: "easeOutCubic",
    });
  }, [isInView]);

  /* Floating tile particles */
  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    anime({
      targets: sectionRef.current.querySelectorAll(".tile-particle"),
      translateY: () => anime.random(-25, 25),
      translateX: () => anime.random(-15, 15),
      rotate: () => anime.random(-20, 20),
      opacity: [0, 0.5],
      duration: () => anime.random(3000, 5000),
      delay: anime.stagger(400),
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });
  }, [isInView]);

  const categories = t.expertise.categories;

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="section-padding bg-charcoal relative overflow-hidden"
    >
      {/* ── Floating decorative tile pieces ── */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="tile-particle absolute opacity-0 pointer-events-none"
          style={{
            top: `${8 + ((i * 11) % 80)}%`,
            left: `${3 + ((i * 13) % 90)}%`,
          }}
        >
          <div
            className="w-3 h-3 border border-gold/20 rounded-[2px]"
            style={{ transform: `rotate(${i * 36}deg)` }}
          />
        </div>
      ))}

      {/* ── Background glows ── */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute top-20 left-0 w-72 h-72 bg-gold/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gold text-sm tracking-[0.3em] font-medium mb-4"
          >
            {t.expertise.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-foreground">{t.expertise.title}</span>{" "}
            <span className="text-gold-gradient">
              {t.expertise.titleHighlight}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-silver max-w-2xl mx-auto mb-6"
          >
            {t.expertise.description}
          </motion.p>

          {/* Summary stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center justify-center gap-2 text-xs text-gold/60 tracking-wider"
          >
            <span className="font-semibold text-gold">
              {categories.length}
            </span>
            <span>
              {locale === "en" ? "CATEGORIES" : "大类"}
            </span>
            <span className="mx-2 w-1 h-1 rounded-full bg-gold/40" />
            <span className="font-semibold text-gold">
              {categories.reduce((s, c) => s + c.items.length, 0)}
            </span>
            <span>
              {locale === "en" ? "SPECIALISATIONS" : "项专业"}
            </span>
          </motion.div>
        </div>

        {/* ── Three‑column expertise grid ── */}
        <div
          ref={gridRef}
          className="grid lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {categories.map((cat, colIdx) => {
            const meta = categoryMeta[colIdx];
            const CatIcon = meta.Icon;

            return (
              <div key={colIdx} className="cat-col flex flex-col">
                {/* ─ Category header ─ */}
                <div className="cat-header relative rounded-t-xl border border-border/30 border-b-0 overflow-hidden opacity-0">
                  {/* Tile‑pattern overlay */}
                  <div
                    className="absolute inset-0"
                    style={tilePatterns[colIdx]}
                  />

                  {/* Gradient background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, hsl(43 72% 53% / 0.07) 0%, transparent 100%)",
                    }}
                  />

                  <div className="relative p-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 shadow-[0_0_24px_hsl(43_72%_53%_/_0.12)]">
                      <CatIcon className="h-7 w-7 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground font-serif leading-tight">
                        {cat.title}
                      </h3>
                      <p className="text-gold/50 text-[11px] tracking-[0.15em] mt-0.5 font-medium">
                        {cat.items.length}{" "}
                        {locale === "en" ? "SPECIALISATIONS" : "项专业"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ─ Item list ─ */}
                <div className="flex-1 rounded-b-xl border border-border/30 border-t border-t-gold/10 bg-charcoal-dark/40 overflow-hidden">
                  {cat.items.map((item, rowIdx) => {
                    const ItemIcon = meta.itemIcons[rowIdx];
                    const isLast = rowIdx === cat.items.length - 1;

                    return (
                      <div
                        key={rowIdx}
                        className={`tile-item group relative opacity-0 ${
                          !isLast ? "border-b border-border/15" : ""
                        }`}
                      >
                        <div className="p-5 flex items-start gap-4 transition-colors duration-300 hover:bg-gold/[0.04]">
                          {/* Index number */}
                          <span className="text-gold/20 text-[22px] font-bold font-mono leading-none mt-0.5 select-none group-hover:text-gold/40 transition-colors duration-300">
                            {String(rowIdx + 1).padStart(2, "0")}
                          </span>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground text-[15px] font-sans group-hover:text-gold transition-colors duration-300">
                                {item.name}
                              </h4>
                              <ItemIcon className="h-3.5 w-3.5 text-gold/30 shrink-0 group-hover:text-gold/60 transition-colors duration-300" />
                            </div>
                            <p className="text-silver-dark text-xs leading-relaxed min-h-[2.5rem]">
                              {item.detail}
                            </p>
                          </div>
                        </div>

                        {/* Hover accent bar */}
                        <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-gold/0 via-gold/25 to-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
