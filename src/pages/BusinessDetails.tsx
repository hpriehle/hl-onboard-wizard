import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
const BusinessDetails = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");
  const [hasTwilio, setHasTwilio] = useState<"yes" | "no">("no");
  const [formData, setFormData] = useState({
    twilioSid: "",
    twilioToken: "",
    legalName: "",
    llcName: "",
    ein: "",
    businessType: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    businessWebsite: "",
    industry: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    jobTitle: ""
  });
  useEffect(() => {
    if (!companyId) {
      toast({
        title: "Error",
        description: "Missing company ID. Redirecting to start.",
        variant: "destructive"
      });
      navigate("/");
      return;
    }

    // Fetch agency data
    const fetchAgencyData = async () => {
      console.log("Fetching agency data for companyId:", companyId);
      
      const { data, error } = await supabase
        .from("agency")
        .select("companyName, website, firstName, lastName, email, phone")
        .eq("companyId", companyId)
        .maybeSingle();

      console.log("Supabase response:", { data, error });

      if (error) {
        console.error("Error fetching agency data:", error);
        toast({
          title: "Warning",
          description: "Could not load agency information",
          variant: "destructive"
        });
        return;
      }

      if (data) {
        console.log("Setting form data with:", data);
        setFormData(prev => ({
          ...prev,
          legalName: data.companyName || "",
          businessWebsite: data.website || "",
          contactName: data.firstName && data.lastName 
            ? `${data.firstName} ${data.lastName}` 
            : "",
          contactEmail: data.email || "",
          contactPhone: data.phone || ""
        }));
      } else {
        console.log("No agency data found for companyId:", companyId);
      }
    };

    fetchAgencyData();
  }, [companyId, navigate, toast]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Store business details locally
      localStorage.setItem("onboarding-business", JSON.stringify({
        ...formData,
        hasTwilio,
        companyId
      }));

      // Create partner record via edge function
      const { data, error } = await supabase.functions.invoke('create-partner', {
        body: {
          companyId,
          hasTwilio,
          ...formData
        }
      });

      if (error) {
        console.error('Error creating partner:', error);
        toast({
          title: "Error",
          description: "Failed to save partner information. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log('Partner created:', data);
      
      toast({
        title: "Information Saved",
        description: "Partner record created successfully"
      });
      
      navigate(`/value-guide?companyId=${companyId}&partnerId=${data.partner.id}`);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <OnboardingLayout currentStep={2} title="Business & Account Details" subtitle="Fill in your business subaccount information">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Twilio Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-2">Twilio Integration</h3>

          <div>
            <Label className="text-base mb-3 block">Do you have a Twilio account?</Label>
            <RadioGroup value={hasTwilio} onValueChange={value => setHasTwilio(value as "yes" | "no")}>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="yes" id="twilio-yes" />
                <Label htmlFor="twilio-yes" className="font-normal cursor-pointer">
                  Yes, I have Twilio
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="twilio-no" />
                <Label htmlFor="twilio-no" className="font-normal cursor-pointer">
                  No, I don't have Twilio
                </Label>
              </div>
            </RadioGroup>
          </div>

          {hasTwilio === "yes" && <div className="bg-accent p-4 rounded-lg space-y-4 animate-fade-in">
              <div>
                <Label htmlFor="twilioSid">
                  Twilio Account SID <span className="text-destructive">*</span>
                </Label>
                <Input 
                  id="twilioSid" 
                  value={formData.twilioSid} 
                  onChange={e => updateField("twilioSid", e.target.value)} 
                  placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
                  required={hasTwilio === "yes"}
                  autoComplete="off"
                />
              </div>

              <div>
                <Label htmlFor="twilioToken">
                  Twilio Auth Token <span className="text-destructive">*</span>
                </Label>
                <Input 
                  id="twilioToken" 
                  type="text"
                  value={formData.twilioToken} 
                  onChange={e => updateField("twilioToken", e.target.value)} 
                  placeholder="Enter your Twilio Auth Token" 
                  required={hasTwilio === "yes"}
                  autoComplete="off"
                />
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Info className="w-4 h-4" />
                  <span>Your auth token will be encrypted and stored securely</span>
                </div>
              </div>
            </div>}
        </div>

        {/* Business Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-2">
            Business Information
          </h3>

          <div>
            <Label htmlFor="legalName">
              Company Name <span className="text-destructive">*</span>
            </Label>
            <Input id="legalName" value={formData.legalName} onChange={e => updateField("legalName", e.target.value)} placeholder="Name" required />
          </div>

          <div>
            <Label htmlFor="llcName">Company LLC Name</Label>
            <Input id="llcName" value={formData.llcName} onChange={e => updateField("llcName", e.target.value)} placeholder="As registered" />
          </div>

          <div>
            <Label htmlFor="ein">
              EIN / Tax ID <span className="text-destructive">*</span>
            </Label>
            <Input id="ein" value={formData.ein} onChange={e => updateField("ein", e.target.value)} placeholder="12-3456789" required />
          </div>

          <div>
            <Label htmlFor="businessType">
              Business Type <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.businessType} onValueChange={value => updateField("businessType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corporation">Corporation</SelectItem>
                <SelectItem value="llc">LLC</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                <SelectItem value="non-profit">Non-profit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>
              Business Address <span className="text-destructive">*</span>
            </Label>
            <Input value={formData.street} onChange={e => updateField("street", e.target.value)} placeholder="Street address" required />
            <div className="grid grid-cols-2 gap-3">
              <Input value={formData.city} onChange={e => updateField("city", e.target.value)} placeholder="City" required />
              <Input value={formData.state} onChange={e => updateField("state", e.target.value)} placeholder="State" required />
            </div>
            <Input value={formData.zip} onChange={e => updateField("zip", e.target.value)} placeholder="ZIP Code" required />
          </div>

          <div>
            <Label htmlFor="businessWebsite">
              Business Website <span className="text-destructive">*</span>
            </Label>
            <Input id="businessWebsite" type="url" value={formData.businessWebsite} onChange={e => updateField("businessWebsite", e.target.value)} placeholder="https://yourbusiness.com" required />
          </div>

          <div>
            <Label htmlFor="industry">
              Business Industry/Vertical <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.industry} onValueChange={value => updateField("industry", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-2">
            Authorized Representative
          </h3>

          <div>
            <Label htmlFor="contactName">
              Contact Name <span className="text-destructive">*</span>
            </Label>
            <Input id="contactName" value={formData.contactName} onChange={e => updateField("contactName", e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="contactEmail">
              Contact Email <span className="text-destructive">*</span>
            </Label>
            <Input id="contactEmail" type="email" value={formData.contactEmail} onChange={e => updateField("contactEmail", e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="contactPhone">
              Contact Phone <span className="text-destructive">*</span>
            </Label>
            <Input id="contactPhone" type="tel" value={formData.contactPhone} onChange={e => updateField("contactPhone", e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="jobTitle">
              Job Title/Position <span className="text-destructive">*</span>
            </Label>
            <Input id="jobTitle" value={formData.jobTitle} onChange={e => updateField("jobTitle", e.target.value)} required />
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg">
          Continue to Business Value Guide
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </form>
    </OnboardingLayout>;
};
export default BusinessDetails;