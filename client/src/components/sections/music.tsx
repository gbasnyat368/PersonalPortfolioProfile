import { Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

import { musicData } from '@/lib/data';

export function MusicSection() {
  return (
    <section id="music" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">My Music</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Curated playlists that inspire and energize my work and life
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Featured Playlist */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Music className="h-5 w-5 text-primary mr-3" />
                {musicData.featuredPlaylist.title}
              </h3>
              <div className="rounded-lg overflow-hidden">
                <iframe
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  frameBorder="0"
                  height="450"
                  style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', borderRadius: '10px' }}
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src={musicData.featuredPlaylist.embedUrl}
                  title="Apple Music Playlist"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
