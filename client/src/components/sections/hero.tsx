import { User, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profileData } from '@/lib/data';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

export function HeroSection() {
  const { scrollToSection } = useSmoothScroll();

  return (
    <section id="about" className="pt-16 pb-16 gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
              <User className="h-16 w-16 text-slate-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {profileData.name}
          </h1>
          
          <p className="text-xl text-blue-100 mb-2">{profileData.credentials}</p>
          <p className="text-lg text-blue-100 mb-8">{profileData.title}</p>
          
          <p className="text-white/90 max-w-3xl mx-auto mb-8 text-lg leading-relaxed">
            {profileData.summary}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-white text-primary hover:bg-blue-50 px-6 py-3 rounded-lg font-medium"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              onClick={() => scrollToSection('experience')}
              className="border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium"
            >
              <FileText className="mr-2 h-4 w-4" />
              View Experience
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
