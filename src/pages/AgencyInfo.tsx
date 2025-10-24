import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link2 } from "lucide-react";

interface FormData {
  agencyName: string;
  hlDomain: string;
  website: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const AgencyInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    agencyName: "",
    hlDomain: "",
    website: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (formData.agencyName.length < 2) {
      newErrors.agencyName = "Agency name must be at least 2 characters";
    }

    if (!formData.hlDomain.includes(".gohighlevel.com")) {
      newErrors.hlDomain = "Please enter a valid HighLevel domain";
    }

    if (!formData.website.startsWith("http")) {
      newErrors.website = "Website must start with http:// or https://";
    }

    if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    // Mock OAuth flow - in production, this would open OAuth popup
    toast({
      title: "Connecting Agency...",
      description: "Redirecting to HighLevel authorization",
    });

    // Simulate OAuth success and redirect with companyId
    setTimeout(() => {
      const mockCompanyId = crypto.randomUUID();
      localStorage.setItem("onboarding-agency", JSON.stringify(formData));
      navigate(`/business-details?companyId=${mockCompanyId}`);
    }, 1500);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <OnboardingLayout
      currentStep={1}
      title="Connect Your HighLevel Agency"
      subtitle="Let's get started by connecting your agency account and basic information"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Agency Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-2">
            Agency Information
          </h3>

          <div>
            <Label htmlFor="agencyName">
              Agency Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="agencyName"
              value={formData.agencyName}
              onChange={(e) => updateField("agencyName", e.target.value)}
              placeholder="Your Agency Name"
              className={errors.agencyName ? "border-destructive" : ""}
            />
            {errors.agencyName && (
              <p className="text-sm text-destructive mt-1">{errors.agencyName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="hlDomain">
              HighLevel White-Label Domain <span className="text-destructive">*</span>
            </Label>
            <Input
              id="hlDomain"
              value={formData.hlDomain}
              onChange={(e) => updateField("hlDomain", e.target.value)}
              placeholder="youragency.gohighlevel.com"
              className={errors.hlDomain ? "border-destructive" : ""}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Example: youragency.gohighlevel.com
            </p>
            {errors.hlDomain && (
              <p className="text-sm text-destructive mt-1">{errors.hlDomain}</p>
            )}
          </div>

          <div>
            <Label htmlFor="website">
              Website <span className="text-destructive">*</span>
            </Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => updateField("website", e.target.value)}
              placeholder="https://yourwebsite.com"
              className={errors.website ? "border-destructive" : ""}
            />
            {errors.website && (
              <p className="text-sm text-destructive mt-1">{errors.website}</p>
            )}
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-2">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                placeholder="John"
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                placeholder="Doe"
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="john@agency.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="(555) 123-4567"
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg shadow-md"
        >
          <Link2 className="w-5 h-5 mr-2" />
          Connect HighLevel Agency
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          By connecting, you authorize our app to access your HighLevel agency data
        </p>
      </form>
    </OnboardingLayout>
  );
};

export default AgencyInfo;
