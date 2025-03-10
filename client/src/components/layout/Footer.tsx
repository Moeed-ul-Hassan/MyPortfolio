
import { Button } from "../ui/button";
import { Container } from "../ui/container";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/40 py-8 mt-20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Your Name. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a 
              href="https://twitter.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
          </div>
          
          <Button variant="ghost" size="sm" asChild>
            <a href="#hero" className="text-sm text-muted-foreground">
              Back to top <i className="fas fa-arrow-up ml-1"></i>
            </a>
          </Button>
        </div>
      </Container>
    </footer>
  );
}
