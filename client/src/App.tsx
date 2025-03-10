import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import CustomCursor from "@/components/ui/custom-cursor";
import CustomScroll from "@/components/ui/custom-scroll";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Custom cursor component */}
      <CustomCursor />
      
      {/* Custom scroll component */}
      <CustomScroll />
      
      {/* Hide default cursor */}
      <div className="cursor-none custom-scroll">
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
