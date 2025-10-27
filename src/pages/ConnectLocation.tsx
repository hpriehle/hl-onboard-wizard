import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Link2, Check } from "lucide-react";
const ConnectLocation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");
  const partnerId = searchParams.get("partnerId");
  useEffect(() => {
    if (!companyId) {
      navigate("/");
    }
  }, [companyId, navigate]);
  const handleConnect = () => {
    const oauthUrl = `https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=https%3A%2F%2Fn8n.omnirasystems.com%2Fwebhook%2Fomnira%2Fonboarding%2Foauth&client_id=68c97ca3bb623f4d37ad9782-mfo6o885&scope=businesses.readonly+businesses.write+calendars.readonly+calendars.write+calendars%2Fevents.readonly+calendars%2Fevents.write+calendars%2Fgroups.readonly+calendars%2Fgroups.write+calendars%2Fresources.readonly+calendars%2Fresources.write+conversations.readonly+conversations.write+conversations%2Fmessage.readonly+conversations%2Fmessage.write+conversations%2Freports.readonly+conversations%2Flivechat.write+contacts.readonly+contacts.write+objects%2Fschema.readonly+objects%2Fschema.write+objects%2Frecord.readonly+objects%2Frecord.write+associations.write+associations.readonly+associations%2Frelation.readonly+associations%2Frelation.write+forms.readonly+forms.write+locations%2FcustomValues.readonly+locations%2FcustomValues.write+locations%2FcustomFields.readonly+locations%2FcustomFields.write+locations%2Ftags.readonly+locations%2Ftags.write+opportunities.write+opportunities.readonly+twilioaccount.read+phonenumbers.read+numberpools.read+voice-ai-agents.readonly+voice-ai-dashboard.readonly+voice-ai-agents.write+voice-ai-agent-goals.readonly+voice-ai-agent-goals.write+knowledge-bases.write+knowledge-bases.readonly+oauth.readonly+saas%2Flocation.read+users.write+locations.readonly+users.readonly&version_id=68c97ca3bb623f4d37ad9782&state=${partnerId}`;
    window.location.href = oauthUrl;
  };
  const permissions = ["Access to contacts and leads", "Send and receive messages", "View conversation history", "Create and manage workflows", "Access calendar and appointments"];
  return <OnboardingLayout currentStep={4} title="Final Step: Connect Your Location" subtitle="Install the app to your specific HighLevel location to complete setup">
      <div className="space-y-8">
        {/* Success Banner */}
        <div className="bg-gradient-primary p-6 rounded-lg text-white text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Almost Done! One Last Step</h3>
          <p className="text-white/90">You're just moments away from activating your account. </p>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">How to Connect Your Location:</h3>
          
          <div className="space-y-3">
            {["Click the 'Connect Location' button below", "Select the specific HighLevel location where you want to use this app", "Review and authorize the permissions", "You'll be redirected to your dashboard once complete"].map((step, index) => <div key={index} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-foreground pt-1">{step}</p>
              </div>)}
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
            {permissions.map((permission, index) => <div key={index} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success flex-shrink-0" />
                <span className="text-sm text-foreground">{permission}</span>
              </div>)}
          </div>
        </div>

        {/* Connect Button */}
        <Button onClick={handleConnect} className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg shadow-glow">
          <Link2 className="w-5 h-5 mr-2" />
          Connect HighLevel Location
        </Button>

        {/* Help Resources */}
        
      </div>
    </OnboardingLayout>;
};
export default ConnectLocation;