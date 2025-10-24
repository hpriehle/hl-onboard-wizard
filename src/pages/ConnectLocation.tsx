import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link2, Check, ExternalLink, PlayCircle } from "lucide-react";

const ConnectLocation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");

  useEffect(() => {
    if (!companyId) {
      navigate("/");
    }
  }, [companyId, navigate]);

  const handleConnect = () => {
    // Mock OAuth flow
    toast({
      title: "Opening HighLevel",
      description: "Redirecting to location selection...",
    });

    // Simulate OAuth success
    setTimeout(() => {
      toast({
        title: "🎉 Setup Complete!",
        description: "Your location has been connected successfully",
      });

      setTimeout(() => {
        navigate("/success");
      }, 2000);
    }, 2000);
  };

  const permissions = [
    "Access to contacts and leads",
    "Send and receive messages",
    "View conversation history",
    "Create and manage workflows",
    "Access calendar and appointments",
  ];

  return (
    <OnboardingLayout
      currentStep={4}
      title="Final Step: Connect Your Location"
      subtitle="Install the app to your specific HighLevel location to complete setup"
    >
      <div className="space-y-8">
        {/* Success Banner */}
        <div className="bg-gradient-primary p-6 rounded-lg text-white text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Almost Done! One Last Step</h3>
          <p className="text-white/90">
            You're just moments away from activating your HighLevel integration
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">How to Connect Your Location:</h3>
          
          <div className="space-y-3">
            {[
              "Click the 'Connect Location' button below",
              "Select the specific HighLevel location where you want to use this app",
              "Review and authorize the permissions",
              "You'll be redirected to your dashboard once complete",
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-foreground pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <span className="text-sm">ℹ️</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              What permissions does this app need?
            </h3>
          </div>
          
          <div className="bg-muted p-4 rounded-lg space-y-2">
            {permissions.map((permission, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success flex-shrink-0" />
                <span className="text-sm text-foreground">{permission}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connect Button */}
        <Button
          onClick={handleConnect}
          className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg shadow-glow"
        >
          <Link2 className="w-5 h-5 mr-2" />
          Connect HighLevel Location
        </Button>

        {/* Help Resources */}
        <div className="pt-6 border-t">
          <p className="text-center text-sm text-muted-foreground mb-4">Need help?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" className="gap-2">
              <PlayCircle className="w-4 h-4" />
              Watch Video Tutorial
              <ExternalLink className="w-3 h-3" />
            </Button>
            <Button variant="outline" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Read Documentation
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ConnectLocation;
