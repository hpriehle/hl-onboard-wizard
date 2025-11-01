import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import subaccountImage from "@/assets/subaccount-instruction.png";

const RedirectAgency = () => {
  const [searchParams] = useSearchParams();
  const partnerId = searchParams.get("partnerId") || "";

  const handleConnect = () => {
    const oauthUrl = `https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=https://n8n.omnirasystems.com/webhook/omnira/onboarding/oauth&client_id=68c97ca3bb623f4d37ad9782-mfo6o885&scope=businesses.readonly+businesses.write+calendars.readonly+calendars.write+calendars/events.readonly+calendars/events.write+calendars/groups.readonly+calendars/groups.write+calendars/resources.readonly+calendars/resources.write+conversations.readonly+conversations.write+conversations/message.readonly+conversations/message.write+conversations/reports.readonly+conversations/livechat.write+contacts.readonly+contacts.write+objects/schema.readonly+objects/schema.write+objects/record.readonly+objects/record.write+associations.write+associations.readonly+associations/relation.readonly+associations/relation.write+forms.readonly+forms.write+locations/customValues.readonly+locations/customValues.write+locations/customFields.readonly+locations/customFields.write+locations/tags.readonly+locations/tags.write+opportunities.write+opportunities.readonly+twilioaccount.read+phonenumbers.read+numberpools.read+voice-ai-agents.readonly+voice-ai-dashboard.readonly+voice-ai-agents.write+voice-ai-agent-goals.readonly+voice-ai-agent-goals.write+knowledge-bases.write+knowledge-bases.readonly+oauth.readonly+saas/location.read+users.write+locations.readonly+users.readonly&version_id=68c97ca3bb623f4d37ad9782&state=${partnerId}`;
    
    window.location.href = oauthUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">
          Please click the Subaccount instead of the Agency
        </h1>
        
        <div className="bg-card rounded-lg p-6 shadow-lg">
          <img 
            src={subaccountImage} 
            alt="Select subaccount instead of agency" 
            className="w-full rounded-md"
          />
        </div>

        <Button 
          onClick={handleConnect}
          size="lg"
          className="w-full max-w-md"
        >
          Continue to Connect Location
        </Button>
      </div>
    </div>
  );
};

export default RedirectAgency;
