import { ReactNode } from "react";
import { ProgressStepper } from "./ProgressStepper";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  title: string;
  subtitle: string;
}

const STEPS = ["Agency Info", "Business Details", "Value Guide", "Connect Location"];

export const OnboardingLayout = ({ 
  children, 
  currentStep, 
  title, 
  subtitle 
}: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header with Logo */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Client Acquisition
          </h1>
        </div>
      </div>

      {/* Progress Stepper */}
      <ProgressStepper 
        currentStep={currentStep} 
        totalSteps={STEPS.length} 
        steps={STEPS}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-card rounded-lg shadow-lg border p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};
