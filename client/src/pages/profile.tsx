import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/sections/hero';
import { ExperienceSection } from '@/components/sections/experience';
import { SkillsSection } from '@/components/sections/skills';
import { ReadingSection } from '@/components/sections/reading';
import { MusicSection } from '@/components/sections/music';
import { ContactSection } from '@/components/sections/contact';
import { FooterSection } from '@/components/sections/footer';
import { apiRequest } from '@/lib/queryClient';

export default function ProfilePage() {
  const syncBooksMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/books/sync'),
    onSuccess: () => {
      console.log('Books synced successfully');
    },
    onError: (error) => {
      console.error('Failed to sync books:', error);
    },
  });

  useEffect(() => {
    // Sync books from Goodreads on page load
    syncBooksMutation.mutate();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <ReadingSection />
      <MusicSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
