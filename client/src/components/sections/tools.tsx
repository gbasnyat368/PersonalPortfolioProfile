import { ExternalLink, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toolsData } from '@/lib/data';

export function ToolsSection() {
  return (
    <section id="tools" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-foreground mb-4 tracking-tight">Tools Proficiency</h2>
        </div>

        <Card className="border border-border hover:shadow-lg transition-all duration-300 rounded-2xl bg-card">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsData.map((tool, index) => (
                <div key={index} className="group">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-all duration-300 group-hover:scale-105"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Settings className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{tool.name}</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}