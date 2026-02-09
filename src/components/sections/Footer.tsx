import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const quickLinks = [
    { label: t.nav.home, href: "#" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="bg-charcoal-dark">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Simon Master" className="h-10 w-auto" />
              <span className="text-foreground font-serif text-lg font-semibold">
                {t.footer.brand}
              </span>
            </div>
            <p className="text-silver-dark text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4 text-sm font-sans">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-silver-dark hover:text-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-semibold mb-4 text-sm font-sans">
              {t.footer.services}
            </h4>
            <ul className="space-y-2">
              {t.footer.serviceList.map((service, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection("#services")}
                    className="text-silver-dark hover:text-gold text-sm transition-colors duration-200"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-foreground font-semibold mb-4 text-sm font-sans">
              {t.footer.contactUs}
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-silver-dark">{t.contact.phone.value}</p>
              <p className="text-silver-dark">{t.contact.email.value}</p>
              <p className="text-silver-dark">{t.contact.address.value}</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/30" />

        <div className="text-center">
          <p className="text-silver-dark text-xs">
            &copy; {new Date().getFullYear()} {t.footer.brand}.{" "}
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
