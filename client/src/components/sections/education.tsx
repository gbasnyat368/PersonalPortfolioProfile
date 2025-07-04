import { GraduationCap, Calendar, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { profileData } from '@/lib/data';

export function EducationSection() {
  return (
    <section id="education" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Education</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic foundation in business administration and management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {profileData.education.map((edu, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                    index === 0 ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">{edu.degree}</h3>
                    <p className="text-primary font-semibold mb-2">{edu.institution}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span className="text-sm">{edu.field}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{edu.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}