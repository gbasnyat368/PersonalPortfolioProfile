import { Star, Award, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { profileData } from '@/lib/data';

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-foreground mb-4 tracking-tight font-medium">Skills</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Skills */}
          <Card className="border border-border hover:shadow-lg transition-all duration-300 rounded-2xl bg-card">
            <CardContent className="p-8">
              <h3 className="text-xl font-medium text-foreground mb-6 flex items-center">
                <Star className="h-5 w-5 text-primary mr-3" />
                Top Skills
              </h3>
              
              <div className="space-y-6">
                {profileData.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground font-light">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="border border-border hover:shadow-lg transition-all duration-300 rounded-2xl bg-card">
            <CardContent className="p-8">
              <h3 className="text-xl font-medium text-foreground mb-6 flex items-center">
                <Award className="h-5 w-5 text-accent mr-3" />
                Certifications
              </h3>
              
              <div className="space-y-4">
                {profileData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center p-4 bg-muted/50 rounded-lg">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                      index % 3 === 0 ? 'bg-primary' : 
                      index % 3 === 1 ? 'bg-accent' : 'bg-secondary'
                    }`}>
                      {cert.name.includes('MBA') ? (
                        <GraduationCap className="h-5 w-5 text-white" />
                      ) : (
                        <Award className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{cert.name}</p>
                      <p className="text-slate-600 text-sm">{cert.description}</p>
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
