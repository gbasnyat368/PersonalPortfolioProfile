import { Music, BarChart3, List, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Playlist */}
          <div className="lg:col-span-2">
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

          {/* Music Preferences */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 text-accent mr-3" />
                Music Preferences
              </h3>
              <div className="space-y-4">
                {musicData.genres.map((genre, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">{genre.name}</span>
                      <span className="text-sm text-slate-500">{genre.percentage}%</span>
                    </div>
                    <Progress value={genre.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Playlist Collection */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <List className="h-5 w-5 text-primary mr-3" />
                Playlist Collection
              </h3>
              <div className="space-y-3">
                {musicData.playlists.map((playlist, index) => (
                  <div key={index} className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                      index % 3 === 0 ? 'bg-primary' : 
                      index % 3 === 1 ? 'bg-accent' : 'bg-secondary'
                    }`}>
                      <Play className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{playlist.name}</p>
                      <p className="text-slate-600 text-sm">{playlist.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
