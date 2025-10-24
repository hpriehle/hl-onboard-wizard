import { useEffect, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Success = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      <div className="max-w-2xl w-full">
        <div className="bg-card rounded-lg shadow-glow border p-8 sm:p-12 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <Check className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-secondary" />
              Setup Complete!
              <Sparkles className="w-8 h-8 text-secondary" />
            </h1>
            <p className="text-xl text-muted-foreground">
              Your Client Acquisition setup has been successfully configured
            </p>
          </div>

          {/* What's Next */}
          <div className="bg-accent p-6 rounded-lg text-left space-y-4">
            <h2 className="text-lg font-semibold text-foreground">What happens next?</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">
                  Your onboarding workflow will be automatically triggered
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">
                  You'll receive a welcome email with next steps
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">
                  Your team can start using the integration immediately
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">
                  Access your dashboard to manage settings and view analytics
                </span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button className="flex-1 bg-gradient-primary hover:opacity-90 text-white font-semibold py-6">
              Go to Dashboard
            </Button>
            <Button variant="outline" className="flex-1 py-6">
              View Documentation
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Need assistance? Contact our support team at support@youragency.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
