import { User, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profileData } from '@/lib/data';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import profilePhoto from '@assets/profile photo_1751644618081.jpg';

export function HeroSection() {
  const { scrollToSection } = useSmoothScroll();

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="mb-12">
          <img
            src={profilePhoto}
            alt="Gaurav Basnyat"
            className="w-24 h-24 rounded-full mx-auto mb-8 object-cover"
          />
          <h1 className="text-6xl font-serif text-foreground mb-6 tracking-tight font-medium">
            {profileData.name}
          </h1>
        </div>
        
        <div className="space-y-8">
          <p className="text-xl text-muted-foreground leading-relaxed font-light font-sans">
            I'm a technology leader with over 15 years of experience in designing and implementing scalable solutions. 
            Currently I work at{" "}
            <a 
              href="https://www.tucows.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-primary transition-colors underline decoration-1 underline-offset-4"
            >
              Tucows
            </a>
            .
          </p>
          
          <div className="pt-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-10 py-4 rounded-full font-sans text-base shadow-lg hover:shadow-xl transition-all duration-300"
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
