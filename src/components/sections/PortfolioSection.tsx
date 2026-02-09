import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Expand, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/i18n";

interface ProjectInfo {
  title: Record<Locale, string>;
  category: string;
  description: Record<Locale, string>;
  photos: number;
}

interface PortfolioProject {
  id: string;
  info: ProjectInfo;
  coverImage: string;
  images: string[];
}

type FilterCategory = "all" | "residential" | "commercial";

function buildImages(id: string, photos: number): string[] {
  const base = `/images/portfolio/${id}`;
  const list = [`${base}/cover.jpg`];
  for (let i = 1; i <= photos; i++) {
    list.push(`${base}/${i}.jpg`);
  }
  return list;
}

export default function PortfolioSection() {
  const { t, locale } = useLanguage();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/images/portfolio/manifest.json");
        const ids: string[] = await res.json();

        const loaded = await Promise.all(
          ids.map(async (id) => {
            const infoRes = await fetch(
              `/images/portfolio/${id}/info.json`
            );
            const info: ProjectInfo = await infoRes.json();
            const images = buildImages(id, info.photos);
            return { id, info, coverImage: images[0], images };
          })
        );

        setProjects(loaded);
      } catch (e) {
        console.error("Failed to load portfolio:", e);
      }
    }
    load();
  }, []);

  const filters: { key: FilterCategory; label: string }[] = [
    { key: "all", label: t.portfolio.filters.all },
    { key: "residential", label: t.portfolio.filters.residential },
    { key: "commercial", label: t.portfolio.filters.commercial },
  ];

  const filteredItems = projects.filter(
    (p) => filter === "all" || p.info.category === filter
  );

  const currentProject =
    selectedIndex !== null ? projects[selectedIndex] : null;

  const nextImage = () => {
    if (!currentProject) return;
    setSelectedImage((prev) =>
      prev < currentProject.images.length - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    if (!currentProject) return;
    setSelectedImage((prev) =>
      prev > 0 ? prev - 1 : currentProject.images.length - 1
    );
  };

  return (
    <section id="portfolio" className="section-padding bg-charcoal relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gold text-sm tracking-[0.3em] font-medium mb-4"
          >
            {t.portfolio.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-foreground">{t.portfolio.title}</span>{" "}
            <span className="text-gold-gradient">
              {t.portfolio.titleHighlight}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-silver max-w-2xl mx-auto mb-8"
          >
            {t.portfolio.description}
          </motion.p>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === f.key
                    ? "bg-gold-gradient text-background shadow-gold"
                    : "text-silver border border-border/50 hover:border-gold/30 hover:text-gold"
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((project) => {
              const globalIndex = projects.indexOf(project);
              const hasGallery = project.images.length > 1;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => {
                    setSelectedIndex(globalIndex);
                    setSelectedImage(0);
                  }}
                >
                  <img
                    src={project.coverImage}
                    alt={project.info.title[locale]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-lg font-semibold text-foreground font-serif mb-1">
                      {project.info.title[locale]}
                    </h3>
                    <p className="text-silver-dark text-sm line-clamp-2">
                      {project.info.description[locale]}
                    </p>
                    {hasGallery && (
                      <span className="text-gold text-xs mt-2 font-medium">
                        {t.portfolio.viewGallery} ({project.images.length})
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-gold/30">
                    <Expand className="h-4 w-4 text-gold" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Dialog
        open={selectedIndex !== null}
        onOpenChange={() => setSelectedIndex(null)}
      >
        <DialogContent className="max-w-4xl bg-charcoal border-border/50 p-0 overflow-hidden">
          {currentProject && (
            <>
              <div className="relative aspect-video bg-charcoal-dark">
                <img
                  src={currentProject.images[selectedImage]}
                  alt={currentProject.info.title[locale]}
                  className="w-full h-full object-cover"
                />

                {currentProject.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/60 hover:bg-background/80 text-foreground"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/60 hover:bg-background/80 text-foreground"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {currentProject.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(i);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            i === selectedImage
                              ? "bg-gold w-4"
                              : "bg-white/40 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="p-6">
                <DialogTitle className="text-2xl font-bold text-foreground font-serif mb-2">
                  {currentProject.info.title[locale]}
                </DialogTitle>
                <DialogDescription className="text-silver leading-relaxed">
                  {currentProject.info.description[locale]}
                </DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
