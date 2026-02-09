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

        {/* Contact Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            const Wrapper = item.href ? "a" : "div";
            const wrapperProps = item.href
              ? {
                  href: item.href,
                  target: item.href.startsWith("mailto")
                    ? undefined
                    : "_blank" as const,
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <Wrapper
                key={i}
                {...(wrapperProps as any)}
                className="contact-card group p-6 rounded-xl border border-border/50 bg-charcoal-dark/80 hover:border-gold/30 transition-all duration-500 opacity-0 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-3 font-sans font-medium">
                  {item.label}
                </h4>
                <p className="text-foreground font-medium mb-2 font-sans text-sm">
                  {item.value}
                </p>
                <p className="text-silver-dark text-xs">{item.note}</p>
              </Wrapper>
            );
          })}
        </div>

        {/* Map + Social */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Map area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 rounded-xl overflow-hidden border border-border/50 h-72 bg-charcoal-dark relative"
          >
            <iframe
              title="Simon Master Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.5!2d145.1497!3d-37.8297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad639b0e0000001%3A0x0!2s197+Blackburn+Rd%2C+Blackburn+South+VIC+3130!5e0!3m2!1sen!2sau!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 rounded-xl border border-border/50 bg-charcoal-dark/80 p-8 h-72 flex flex-col justify-center"
          >
            <h3 className="text-lg font-semibold text-foreground font-serif mb-6 text-center">
              {t.contact.followUs}
            </h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-14 h-14 rounded-xl border border-border/50 flex items-center justify-center text-silver hover:text-gold hover:border-gold/30 hover:bg-gold/10 transition-all duration-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-silver-dark text-xs text-center mt-6">
              {t.contact.email.value}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
