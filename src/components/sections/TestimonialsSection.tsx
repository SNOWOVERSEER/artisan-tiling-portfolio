import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="section-padding bg-charcoal-dark relative overflow-hidden">
      {/* Decorative quote marks */}
      <div className="absolute top-16 left-8 opacity-[0.03]">
        <Quote className="w-64 h-64 text-gold" />
      </div>
      <div className="absolute bottom-16 right-8 opacity-[0.03] rotate-180">
        <Quote className="w-48 h-48 text-gold" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gold text-sm tracking-[0.3em] font-medium mb-4"
          >
            {t.testimonials.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold"
          >
            <span className="text-foreground">{t.testimonials.title}</span>{" "}
            <span className="text-gold-gradient">{t.testimonials.titleHighlight}</span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {t.testimonials.items.map((testimonial, i) => (
                <CarouselItem
                  key={i}
                  className="pl-4 md:basis-1/2"
                >
                  <Card className="bg-charcoal border-border/50 hover:border-gold/20 transition-colors duration-300 h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, j) => (
                          <Star
                            key={j}
                            className="h-4 w-4 fill-gold text-gold"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-silver leading-relaxed flex-1 mb-6 italic">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 border-t border-border/30 pt-4">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                          <span className="text-gold font-semibold text-sm font-sans">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm font-sans">
                            {testimonial.name}
                          </p>
                          <p className="text-silver-dark text-xs">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 bg-charcoal border-border/50 text-silver hover:text-gold hover:border-gold/30" />
              <CarouselNext className="static translate-y-0 bg-charcoal border-border/50 text-silver hover:text-gold hover:border-gold/30" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
