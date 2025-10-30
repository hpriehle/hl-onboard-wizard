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
  const key = searchParams.get("key");
  const [agencyName, setAgencyName] = useState("");
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
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
    jobTitle: ""
  });
  useEffect(() => {
    const fetchAgencyData = async () => {
      if (!companyId && !key) {
        toast({
          title: "Missing Required Parameter",
          description: "Please start from the beginning",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      try {
        let query = supabase
          .from("agency")
          .select("companyId, nameTitle, website, firstName, lastName, email, phone");

        if (key) {
          query = query.eq("key", key);
        } else if (companyId) {
          query = query.eq("companyId", companyId);
        }

        const { data, error } = await query.maybeSingle();

        if (error || !data) {
          toast({
            title: "Agency Not Found",
            description: "Could not find agency information",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        setAgencyName(data.nameTitle || "");
        setFormData(prev => ({
          ...prev,
          // Only pre-fill company name for agency flow (companyId), not for key flow
          legalName: key ? "" : (data.nameTitle || ""),
          businessWebsite: data.website || "",
          contactFirstName: data.firstName || "",
          contactLastName: data.lastName || "",
          contactEmail: data.email || "",
          contactPhone: data.phone || ""
        }));
      } catch (error) {
        console.error("Error fetching agency data:", error);
      }
    };

    fetchAgencyData();
  }, [companyId, key, navigate, toast]);
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
          key,
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

      if (data?.partner) {
        toast({
          title: "Success!",
          description: "Business details saved successfully",
        });
        
        localStorage.setItem("onboarding-partnerId", data.partner.id);
        
        if (key) {
          navigate(`/value-guide?key=${key}&partnerId=${data.partner.id}`);
        } else {
          navigate(`/value-guide?companyId=${companyId}&partnerId=${data.partner.id}`);
        }
      }
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
  return <OnboardingLayout 
      currentStep={key ? 1 : 2} 
      title="Account Details" 
      subtitle="Fill in your business information"
      customBrandName={key && agencyName ? agencyName : undefined}
      isKeyFlow={!!key}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="contactFirstName">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input id="contactFirstName" value={formData.contactFirstName} onChange={e => updateField("contactFirstName", e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="contactLastName">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input id="contactLastName" value={formData.contactLastName} onChange={e => updateField("contactLastName", e.target.value)} required />
            </div>
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