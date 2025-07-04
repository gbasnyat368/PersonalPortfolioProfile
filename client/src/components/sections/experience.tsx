import { Building, Landmark, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { profileData } from '@/lib/data';

export function ExperienceSection() {
  const getIcon = (company: string) => {
    if (company.includes('Tucows')) return Building;
    if (company.includes('Investment Board')) return Landmark;
    return Building;
  };

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-foreground mb-4 tracking-tight font-medium">Work</h2>
        </div>

        <div className="space-y-8">
          {profileData.experience.map((exp, index) => {
            const Icon = getIcon(exp.company);
            
            return (
              <Card key={exp.id} className="group cursor-pointer border border-border hover:shadow-lg transition-all duration-300 rounded-2xl bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        <Icon className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-foreground">{exp.company}</h3>
                        <p className="text-sm text-muted-foreground">{exp.duration}</p>
                      </div>
                    </div>
                    {exp.current && (
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-lg font-medium text-foreground mb-3">{exp.position}</h4>
                  <p className="text-muted-foreground mb-4 font-light">
                    {exp.location}
                  </p>
                  
                  <ul className="text-muted-foreground space-y-2">
                    {exp.responsibilities.slice(0, 3).map((responsibility, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm font-light">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}