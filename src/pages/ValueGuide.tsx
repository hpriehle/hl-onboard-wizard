import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mic, StopCircle, ArrowRight, Info, AlertCircle } from "lucide-react";
import { RealtimeVoiceService } from "@/utils/RealtimeVoice";

interface Section {
  id: number;
  title: string;
  description: string;
  suggestedQuestions: string[];
}

const SECTIONS: Section[] = [
  {
    id: 1,
    title: "Why You Give a Damn (Genuine Curiosity)",
    description: "Share your genuine connection to the business owners you serve",
    suggestedQuestions: [
      "What personal experience makes you care about these business owners?",
      "What specific observation about their business triggered your outreach?",
      "What future do you genuinely want for them?"
    ]
  },
  {
    id: 2,
    title: "Why You're Not Some Random Person (Authority Building)",
    description: "Establish your credibility and expertise",
    suggestedQuestions: [
      "What gives you the right to contact them?",
      "What unique access/insight do you have?",
      "What track record proves you deliver?"
    ]
  },
  {
    id: 3,
    title: "Why You're the Smartest Person in Their Orbit Right Now",
    description: "Demonstrate your unique knowledge and perspective",
    suggestedQuestions: [
      "What do you know that they don't?",
      "What pattern have you spotted they're missing?",
      "What's your contrarian insight?"
    ]
  },
  {
    id: 4,
    title: "Why They'd Be Crazy Not to Listen",
    description: "Create urgency and demonstrate immediate value",
    suggestedQuestions: [
      "What's happening RIGHT NOW that creates urgency?",
      "What specific cost of inaction exists?",
      "What's the smallest ask that gives massive value?"
    ]
  }
];

const ValueGuide = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");
  const partnerId = searchParams.get("partnerId");

  const [currentSection, setCurrentSection] = useState(1);
  const [sectionResponses, setSectionResponses] = useState<Map<number, string>>(new Map());
  const [isRecording, setIsRecording] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [fullTranscript, setFullTranscript] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const voiceServiceRef = useRef<RealtimeVoiceService | null>(null);

  useEffect(() => {
    if (!companyId) {
      navigate("/");
    }
  }, [companyId, navigate]);

  useEffect(() => {
    // Initialize Realtime Voice Service
    voiceServiceRef.current = new RealtimeVoiceService(
      (transcript, isFinal) => {
        if (isFinal) {
          setFullTranscript(prev => (prev + ' ' + transcript).trim());
          setCurrentTranscript("");
        } else {
          setCurrentTranscript(transcript);
        }
      },
      (error) => {
        console.error('Voice service error:', error);
        setIsRecording(false);
      }
    );
    
    return () => {
      voiceServiceRef.current?.disconnect();
    };
  }, [toast]);

  // Load saved response when changing sections
  useEffect(() => {
    const savedResponse = sectionResponses.get(currentSection);
    if (savedResponse) {
      setFullTranscript(savedResponse);
    } else {
      setFullTranscript("");
    }
    setCurrentTranscript("");
  }, [currentSection, sectionResponses]);

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      voiceServiceRef.current?.stopRecording();
      setIsRecording(false);
      setFullTranscript(prev => (prev + ' ' + currentTranscript).trim());
      setCurrentTranscript("");
    } else {
      // Start recording
      try {
        setIsConnecting(true);
        
        // Connect to WebSocket if not already connected
        if (!voiceServiceRef.current) {
          throw new Error("Voice service not initialized");
        }
        
        await voiceServiceRef.current.connect();
        await voiceServiceRef.current.startRecording();
        
        setIsRecording(true);
        setIsConnecting(false);
      } catch (error) {
        console.error('Failed to start recording:', error);
        setIsRecording(false);
        setIsConnecting(false);
      }
    }
  };

  const handleNext = () => {
    const trimmedTranscript = fullTranscript.trim();
    
    if (!trimmedTranscript) {
      return;
    }

    // Save current section response
    setSectionResponses(prev => new Map(prev).set(currentSection, trimmedTranscript));
    
    if (currentSection < SECTIONS.length) {
      // Move to next section
      setCurrentSection(prev => prev + 1);
    } else {
      // Submit - navigate to OAuth
      handleSubmit(trimmedTranscript);
    }
  };

  const handleSubmit = (finalTranscript: string) => {
    // Save all responses including the current one
    const allResponses = new Map(sectionResponses).set(currentSection, finalTranscript);
    
    const responsesObject = Object.fromEntries(
      Array.from(allResponses.entries()).map(([id, text]) => [
        SECTIONS[id - 1].title,
        text
      ])
    );
    
    localStorage.setItem("value-guide-responses", JSON.stringify(responsesObject));
    
    // Navigate to OAuth link (to be provided)
    navigate(`/connect-location?companyId=${companyId}&partnerId=${partnerId}`);
  };

  const currentSectionData = SECTIONS[currentSection - 1];
  const displayText = fullTranscript + (currentTranscript ? ' ' + currentTranscript : '');

  return (
    <OnboardingLayout
      currentStep={3}
      title="Value Guide"
      subtitle="Tell us about your business in your own words"
    >
      <div className="space-y-6">
        {/* Browser Support Info - Removed since OpenAI Realtime works in all browsers */}

        <div className="bg-accent/50 p-4 rounded-lg flex items-start gap-3">
          <Info className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
          <p className="text-sm text-accent-foreground">
            Click the microphone to record your response. Your words will appear in real-time using OpenAI's advanced speech recognition.
            You can stop anytime and edit the text manually.
          </p>
        </div>

        {/* Section Progress */}
        <div className="flex justify-center gap-3">
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all
                ${sectionResponses.has(section.id) 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : section.id === currentSection
                  ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                  : 'bg-muted text-muted-foreground'
                }
              `}
            >
              {section.id}
            </div>
          ))}
        </div>

        {/* Current Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Section {currentSection}: {currentSectionData.title}
            </h3>
            <p className="text-muted-foreground">
              {currentSectionData.description}
            </p>
          </div>

          {/* Suggested Questions */}
          <div className="bg-accent/30 p-5 rounded-lg border border-accent">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="text-primary">💡</span>
              Consider these questions:
            </h4>
            <ul className="space-y-2">
              {currentSectionData.suggestedQuestions.map((q, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recording Button */}
          <div className="flex justify-center py-2">
            <Button
              onClick={toggleRecording}
              size="lg"
              disabled={isConnecting}
              className={`
                w-16 h-16 rounded-full transition-all shadow-lg
                ${isRecording 
                  ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
                  : 'bg-primary hover:bg-primary/90'
                }
              `}
            >
              {isConnecting ? (
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : isRecording ? (
                <StopCircle className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </Button>
          </div>

          {isRecording && (
            <p className="text-center text-sm text-muted-foreground animate-pulse">
              🎤 Recording in progress...
            </p>
          )}

          {/* Textarea with real-time transcription */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Your Response
            </label>
            <Textarea 
              value={displayText}
              onChange={(e) => setFullTranscript(e.target.value)}
              placeholder={isRecording ? "Listening... speak now" : "Click the microphone to start recording, or type your response here..."}
              className="min-h-[200px] text-base"
              disabled={isRecording}
            />
          </div>

          {/* Navigation Button */}
          <Button
            onClick={handleNext}
            disabled={!fullTranscript.trim() || isRecording}
            size="lg"
            className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
          >
            {currentSection === SECTIONS.length ? "Submit & Continue" : "Next Section"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Section {currentSection} of {SECTIONS.length}
            {sectionResponses.size > 0 && ` • ${sectionResponses.size} completed`}
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ValueGuide;
