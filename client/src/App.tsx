import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProfilePage from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  // Detect if we're on GitHub Pages and set the base path accordingly
  const isGitHubPages = window.location.hostname === 'gbasnyat368.github.io';
  const basePath = isGitHubPages ? '/PersonalPortfolioProfile' : '';
  
  return (
    <WouterRouter base={basePath}>
      <Switch>
        <Route path="/" component={ProfilePage} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
