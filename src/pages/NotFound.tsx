import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-gold-gradient">404</h1>
        <p className="text-xl text-silver">
          {locale === "en"
            ? "The page you are looking for does not exist."
            : "您访问的页面不存在。"}
        </p>
        <Link to="/">
          <Button className="bg-gold-gradient text-background hover:shadow-gold mt-4">
            <Home className="mr-2 h-4 w-4" />
            {locale === "en" ? "Back to Home" : "返回首页"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
