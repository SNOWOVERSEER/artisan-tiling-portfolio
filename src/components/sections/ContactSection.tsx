import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import anime from "animejs";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialLinks = [
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/simon_master_tiling",
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "https://www.facebook.com/share/1BqKX3Vf3n/?mibextid=wwXIfr",
  },
];

export default function ContactSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && cardsRef.current) {
      anime({
        targets: cardsRef.current.querySelectorAll(".contact-card"),
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(120, { start: 200 }),
        duration: 700,
        easing: "easeOutCubic",
      });
    }
  }, [isInView]);

  const contactItems = [
    {
      icon: Phone,
      label: t.contact.phone.label,
      value: t.contact.phone.value,
      note: t.contact.phone.note,
      href: `tel:${t.contact.phone.value.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: t.contact.email.label,
      value: t.contact.email.value,
      note: t.contact.email.note,
      href: `mailto:${t.contact.email.value}`,
    },
    {
      icon: MapPin,
      label: t.contact.address.label,
      value: t.contact.address.value,
      note: t.contact.address.note,
      href: null,
    },
    {
      icon: Clock,
      label: t.contact.hours.label,
      value: t.contact.hours.value,
      note: t.contact.hours.note,
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-charcoal relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />

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
            {t.contact.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-foreground">{t.contact.title}</span>{" "}
            <span className="text-gold-gradient">
              {t.contact.titleHighlight}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-silver max-w-2xl mx-auto"
          >
            {t.contact.description}
          </motion.p>
        </div>

        {/* Contact Cards + Social */}
        <div ref={cardsRef} className="max-w-4xl mx-auto">
          {/* 2×2 contact info grid */}
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              const Wrapper = item.href ? "a" : "div";
              const wrapperProps = item.href
                ? {
                    href: item.href,
                    target: item.href.startsWith("mailto")
                      ? undefined
                      : ("_blank" as const),
                    rel: "noopener noreferrer",
                  }
                : {};

              return (
                <Wrapper
                  key={i}
                  {...(wrapperProps as any)}
                  className="contact-card group flex items-start gap-4 p-6 rounded-xl border border-border/50 bg-charcoal-dark/80 hover:border-gold/30 transition-all duration-500 opacity-0"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs uppercase tracking-[0.15em] text-gold mb-1 font-sans font-medium">
                      {item.label}
                    </h4>
                    <p className="text-foreground font-medium text-sm mb-0.5 break-words">
                      {item.value}
                    </p>
                    <p className="text-silver-dark text-xs">{item.note}</p>
                  </div>
                </Wrapper>
              );
            })}
          </div>

          {/* Social bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-6 py-6 rounded-xl border border-border/50 bg-charcoal-dark/80"
          >
            <span className="text-sm font-medium text-silver">
              {t.contact.followUs}
            </span>
            <div className="w-px h-5 bg-border/50" />
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center text-silver hover:text-gold hover:border-gold/30 hover:bg-gold/10 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
