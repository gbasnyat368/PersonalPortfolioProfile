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
    <section id="experience" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Professional Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A decade of leadership in solution architecture and project management across multiple industries
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full timeline-line"></div>
          
          {profileData.experience.map((exp, index) => {
            const Icon = getIcon(exp.company);
            const isEven = index % 2 === 0;
            
            return (
              <div key={exp.id} className="relative flex items-center mb-12">
                <div className={`absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg timeline-dot ${
                  exp.current ? 'bg-primary' : 'bg-slate-400'
                }`}></div>
                
                <div className={`ml-12 md:ml-0 ${isEven ? 'md:w-1/2 md:pr-8' : 'md:w-1/2 md:pl-8 md:ml-auto'}`}>
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                          exp.current ? 'bg-primary' : 'bg-slate-400'
                        }`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className={`font-semibold ${exp.current ? 'text-primary' : 'text-slate-600'}`}>
                          {exp.company}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-2">{exp.position}</h3>
                      <p className="text-muted-foreground mb-3">{exp.duration}</p>
                      <p className="text-muted-foreground mb-4">{exp.location}</p>
                      
                      <ul className="text-muted-foreground space-y-2">
                        {exp.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                            <span className="text-sm">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
