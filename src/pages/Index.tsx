import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Rocket } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Logo/Brand */}
          <div className="inline-block">
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              HighLevel Add-On
            </h1>
            <p className="text-xl text-muted-foreground">
              Powerful integrations for your HighLevel agency
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Button
              onClick={() => navigate("/agency-info")}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-8 py-6 text-lg shadow-glow"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 pt-16">
            <div className="bg-card p-6 rounded-lg border shadow-md">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Quick Setup
              </h3>
              <p className="text-sm text-muted-foreground">
                Get up and running in minutes with our streamlined onboarding process
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-md">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Secure Integration
              </h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security with encrypted data storage and OAuth 2.0
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-md">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4 mx-auto">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Powerful Features
              </h3>
              <p className="text-sm text-muted-foreground">
                Advanced automation and workflow capabilities to scale your agency
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
