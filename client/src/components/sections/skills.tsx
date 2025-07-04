import { Star, Award, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { profileData } from '@/lib/data';

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Skills & Certifications</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Core competencies and professional certifications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Skills */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <Star className="h-5 w-5 text-primary mr-3" />
                Top Skills
              </h3>
              
              <div className="space-y-6">
                {profileData.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700 font-medium">{skill.name}</span>
                      <span className="text-sm text-slate-500">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <Award className="h-5 w-5 text-accent mr-3" />
                Certifications
              </h3>
              
              <div className="space-y-4">
                {profileData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center p-3 bg-slate-50 rounded-lg">
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
