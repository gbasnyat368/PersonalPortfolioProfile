import { User, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profileData } from '@/lib/data';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

export function HeroSection() {
  const { scrollToSection } = useSmoothScroll();

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="mb-12">
          <img
            src="/attached_assets/profile photo_1751643993008.jpg"
            alt="Gaurav Basnyat"
            className="w-24 h-24 rounded-full mx-auto mb-8 object-cover"
          />
          <h1 className="text-5xl font-light text-foreground mb-6 tracking-tight">
            {profileData.name}
          </h1>
        </div>
        
        <div className="space-y-8">
          <p className="text-xl text-muted-foreground leading-relaxed font-light">
            I'm a technology leader with over 15 years of experience in designing and implementing scalable solutions. 
            Currently I work at{" "}
            <a 
              href="https://www.tucows.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors underline decoration-1 underline-offset-2"
            >
              Tucows
            </a>
            , architecting systems that power millions of domain registrations and web services globally.
          </p>
          
          <div className="pt-4">
            <Button 
              size="lg" 
              className="bg-foreground hover:bg-foreground/90 text-background font-medium px-8 py-3 rounded-full"
              onClick={() => scrollToSection('experience')}
            >
              View My Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
