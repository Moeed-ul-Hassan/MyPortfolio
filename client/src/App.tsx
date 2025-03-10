import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import CustomCursor from "@/components/ui/custom-cursor";
import CustomScroll from "@/components/ui/custom-scroll";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

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
  // State to control scrolling behavior - default to false (using custom scroll)
  const [useNativeScroll, setUseNativeScroll] = useState<boolean>(false);
  
  // Detect if the device is likely a mobile device where we should use native scrolling
  useEffect(() => {
    const checkIfMobile = () => {
      // Simple check for mobile devices based on screen width
      const isMobileDevice = window.innerWidth < 768 || 
                            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobileDevice) {
        setUseNativeScroll(true);
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {/* Custom cursor component */}
        <CustomCursor />
        
        {/* Custom scroll component with native scroll option */}
        <CustomScroll useNativeScroll={useNativeScroll} />
        
        {/* Controls area in top-right */}
        <div className="fixed right-4 top-4 z-50 flex items-center space-x-2">
          {/* Theme toggle component */}
          <ThemeToggle />
          
          {/* Scroll behavior toggle button */}
          <Button
            className="text-xs py-1 px-2 h-auto"
            variant="outline"
            size="sm"
            onClick={() => setUseNativeScroll(prev => !prev)}
          >
            {useNativeScroll ? "Custom Scroll" : "Native Scroll"}
          </Button>
        </div>
        
        {/* Hide default cursor */}
        <div className={`cursor-none custom-scroll ${useNativeScroll ? 'native-scroll' : ''}`}>
          <Router />
          <Toaster />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
