import { Linkedin, Mail, ExternalLink } from 'lucide-react';
import { profileData } from '@/lib/data';

export function FooterSection() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">{profileData.name}</h3>
          <p className="text-slate-400 mb-6">{profileData.title} | {profileData.credentials}</p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href={profileData.goodreads}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ExternalLink className="h-6 w-6" />
            </a>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-400">&copy; 2024 {profileData.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
