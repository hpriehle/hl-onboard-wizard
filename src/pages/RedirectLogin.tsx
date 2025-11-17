import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RedirectLogin = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  // Parse URL params from both query string and hash fragment
  const getParam = (name: string) => {
    const queryParam = searchParams.get(name);
    if (queryParam) return queryParam;
    
    // Check hash fragment for additional params
    const hash = window.location.hash;
    const hashParams = new URLSearchParams(hash.substring(hash.indexOf('&') + 1));
    return hashParams.get(name) || "";
  };
  
  const email = getParam("email");
  const token = getParam("token");
  const url = getParam("url");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const openLoginPage = () => {
    if (url) {
      const fullUrl = url.startsWith("http") ? url : `https://${url}`;
      window.open(fullUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-lg shadow-lg border p-8">
        <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
          Login to your account
        </h1>
        
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="text"
                value={email}
                readOnly
                className="flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(email, "Email")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex gap-2">
              <Input
                id="password"
                type="password"
                value={token}
                readOnly
                className="flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(token, "Password")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Button 
          className="w-full" 
          onClick={openLoginPage}
          disabled={!url}
        >
          Open Login Page
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RedirectLogin;
