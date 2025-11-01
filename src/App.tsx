import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AgencyInfo from "./pages/AgencyInfo";
import BusinessDetails from "./pages/BusinessDetails";
import ValueGuide from "./pages/ValueGuide";
import ConnectLocation from "./pages/ConnectLocation";
import Success from "./pages/Success";
import Welcome from "./pages/Welcome";
import RedirectAgency from "./pages/RedirectAgency";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agency-info" element={<AgencyInfo />} />
          <Route path="/business-details" element={<BusinessDetails />} />
          <Route path="/value-guide" element={<ValueGuide />} />
          <Route path="/connect-location" element={<ConnectLocation />} />
          <Route path="/success" element={<Success />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/redirect-agency" element={<RedirectAgency />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
