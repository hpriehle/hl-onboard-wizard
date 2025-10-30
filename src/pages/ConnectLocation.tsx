import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Link2, Check, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
const ConnectLocation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");
  const partnerId = searchParams.get("partnerId");
  const { toast } = useToast();

  // State management
  const [hasA2PNumbers, setHasA2PNumbers] = useState<string | null>(null);
  const [subaccountName, setSubaccountName] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [createdSubaccountName, setCreatedSubaccountName] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  // Fetch partner data
  const { data: partnerData } = useQuery({
    queryKey: ["partner", partnerId],
    queryFn: async () => {
      if (!partnerId) return null;
      const { data, error } = await supabase
        .from("partners")
        .select("name")
        .eq("id", parseInt(partnerId))
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!partnerId,
  });

  // Set default subaccount name when partner data loads
  useEffect(() => {
    if (partnerData?.name && !subaccountName) {
      setSubaccountName(`${partnerData.name} Outreach`);
    }
  }, [partnerData, subaccountName]);

  useEffect(() => {
    if (!companyId) {
      navigate("/");
    }
  }, [companyId, navigate]);

  const handleCreateSubaccount = async () => {
    if (!subaccountName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a subaccount name",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingAccount(true);
    try {
      const response = await fetch("https://n8n.omnirasystems.com/webhook/omnira/create-account-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: subaccountName,
          companyId: companyId,
          partnerId: partnerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create subaccount");
      }

      setCreatedSubaccountName(subaccountName);
      setShowInstructions(true);
    } catch (error) {
      console.error("Error creating subaccount:", error);
      toast({
        title: "Error",
        description: "Failed to create subaccount. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const handleConnect = () => {
    const oauthUrl = `https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=https%3A%2F%2Fn8n.omnirasystems.com%2Fwebhook%2Fomnira%2Fonboarding%2Foauth&client_id=68c97ca3bb623f4d37ad9782-mfo6o885&scope=businesses.readonly+businesses.write+calendars.readonly+calendars.write+calendars%2Fevents.readonly+calendars%2Fevents.write+calendars%2Fgroups.readonly+calendars%2Fgroups.write+calendars%2Fresources.readonly+calendars%2Fresources.write+conversations.readonly+conversations.write+conversations%2Fmessage.readonly+conversations%2Fmessage.write+conversations%2Freports.readonly+conversations%2Flivechat.write+contacts.readonly+contacts.write+objects%2Fschema.readonly+objects%2Fschema.write+objects%2Frecord.readonly+objects%2Frecord.write+associations.write+associations.readonly+associations%2Frelation.readonly+associations%2Frelation.write+forms.readonly+forms.write+locations%2FcustomValues.readonly+locations%2FcustomValues.write+locations%2FcustomFields.readonly+locations%2FcustomFields.write+locations%2Ftags.readonly+locations%2Ftags.write+opportunities.write+opportunities.readonly+twilioaccount.read+phonenumbers.read+numberpools.read+voice-ai-agents.readonly+voice-ai-dashboard.readonly+voice-ai-agents.write+voice-ai-agent-goals.readonly+voice-ai-agent-goals.write+knowledge-bases.write+knowledge-bases.readonly+oauth.readonly+saas%2Flocation.read+users.write+locations.readonly+users.readonly&version_id=68c97ca3bb623f4d37ad9782&state=${partnerId}`;
    window.location.href = oauthUrl;
  };

  const permissions = ["Access to contacts and leads", "Send and receive messages", "View conversation history", "Access calendar and appointments"];
  return <OnboardingLayout currentStep={4} title="Final Step: Connect Your Location" subtitle="Install the app to your specific HighLevel location to complete setup">
      <div className="space-y-8">
        {/* A2P Question */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Account Setup Question</h3>
          <div className="bg-accent p-6 rounded-lg">
            <Label className="text-base font-medium mb-4 block">
              Does your intended HighLevel subaccount already have A2P verified phone numbers?
            </Label>
            <RadioGroup value={hasA2PNumbers || ""} onValueChange={setHasA2PNumbers}>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="yes" id="a2p-yes" />
                <Label htmlFor="a2p-yes" className="font-normal cursor-pointer">
                  Yes, it has A2P verified numbers
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="a2p-no" />
                <Label htmlFor="a2p-no" className="font-normal cursor-pointer">
                  No, it doesn't have A2P verified numbers
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Show content only after A2P question is answered */}
        {hasA2PNumbers === "no" && (
          <>
            {/* Success Banner */}
            <div className="bg-gradient-primary p-6 rounded-lg text-white text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Almost Done! One Last Step</h3>
              <p className="text-white/90">You're just moments away from activating your account.</p>
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">How to Connect Your Location:</h3>
              
              <div className="space-y-3">
                {["Click the 'Connect Location' button below", "Select the specific HighLevel location where you want to use this app", "Review and authorize the permissions", "You'll be redirected to your dashboard once complete"].map((step, index) => (
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
            <Button onClick={handleConnect} className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg shadow-glow">
              <Link2 className="w-5 h-5 mr-2" />
              Connect HighLevel Location
            </Button>
          </>
        )}

        {/* Show subaccount creation form if A2P is yes and instructions not shown yet */}
        {hasA2PNumbers === "yes" && !showInstructions && (
          <>
            <div className="bg-muted p-6 rounded-lg space-y-6">
              <p className="text-foreground">
                In order to connect our communication system, we need to install into a subaccount that does not have LC phone connected. The easiest way forward is to create a new subaccount to manage outreach campaigns.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Create a new Subaccount</h3>
                
                <div>
                  <Label htmlFor="subaccountName" className="mb-2 block">
                    Subaccount Name
                  </Label>
                  <Input
                    id="subaccountName"
                    value={subaccountName}
                    onChange={(e) => setSubaccountName(e.target.value)}
                    placeholder="Enter subaccount name"
                    disabled={isCreatingAccount}
                  />
                </div>

                <Button 
                  onClick={handleCreateSubaccount} 
                  disabled={isCreatingAccount}
                  className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg shadow-glow"
                >
                  {isCreatingAccount ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Show instructions after subaccount creation */}
        {hasA2PNumbers === "yes" && showInstructions && (
          <>
            {/* Success Banner */}
            <div className="bg-gradient-primary p-6 rounded-lg text-white text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Almost Done! One Last Step</h3>
              <p className="text-white/90">You're just moments away from activating your account.</p>
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">How to Connect Your Location:</h3>
              
              <div className="space-y-3">
                {["Click the 'Connect Location' button below", "Select the specific HighLevel location where you want to use this app", "Review and authorize the permissions", "You'll be redirected to your dashboard once complete"].map((step, index) => (
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

            {/* Connect Button with Updated Text */}
            <Button onClick={handleConnect} className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg shadow-glow">
              <Link2 className="w-5 h-5 mr-2" />
              Connect New HighLevel Account "{createdSubaccountName}"
            </Button>
          </>
        )}
      </div>
    </OnboardingLayout>;
};
export default ConnectLocation;