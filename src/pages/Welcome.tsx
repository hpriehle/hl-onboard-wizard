import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle } from "lucide-react";

const Welcome = () => {
  const [searchParams] = useSearchParams();
  const key = searchParams.get("key");
  const partnerId = searchParams.get("partnerId");
  const [agencyName, setAgencyName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgencyData = async () => {
      if (!key) return;
      
      const { data } = await supabase
        .from("agency")
        .select("nameTitle")
        .eq("key", key)
        .maybeSingle();
      
      if (data) {
        setAgencyName(data.nameTitle || "");
      }
      setLoading(false);
    };

    fetchAgencyData();
  }, [key]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-card rounded-lg shadow-lg border p-8 sm:p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Welcome to {agencyName || "Our Platform"}
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Your account has been successfully set up and is ready to use.
        </p>
        
        <div className="bg-accent/30 border border-accent rounded-lg p-6">
          <p className="text-sm text-foreground">
            You'll receive further instructions from {agencyName || "your agency"} on next steps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
