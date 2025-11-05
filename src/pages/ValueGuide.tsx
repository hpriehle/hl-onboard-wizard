import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mic, StopCircle, ArrowRight, Info, AlertCircle } from "lucide-react";
import { RealtimeVoiceService } from "@/utils/RealtimeVoice";
import { supabase } from "@/integrations/supabase/client";
interface Section {
  id: number;
  title: string;
  description: string;
  suggestedQuestions: string[];
}
const SECTIONS: Section[] = [
  {
    id: 1,
    title: "Who You Are & What You Do",
    description: "Your AI identity and business context",
    suggestedQuestions: [
      "What's your AI agent's name and role? (e.g., 'Sarah, Business Development Associate')",
      "What's your company name and what do you do in 2-3 sentences?",
      "How does your AI relate to your business? (e.g., 'I work with business owners to...')"
    ]
  },
  {
    id: 2,
    title: "Why You Give a Damn (Genuine Curiosity)",
    description: "Your authentic connection and authority",
    suggestedQuestions: [
      "Why do you personally care about helping these business owners?",
      "What credentials or track record prove you're legitimate?",
      "What makes you uniquely qualified to help them?"
    ]
  },
  {
    id: 3,
    title: "Why They'd Be Crazy Not to Listen (Urgency)",
    description: "The opportunity and timing",
    suggestedQuestions: [
      "What's happening RIGHT NOW that creates urgency?",
      "What do you know that they're missing?",
      "What's the dream outcome you can help them achieve?"
    ]
  },
  {
    id: 4,
    title: "Who You're Talking To & What They Care About",
    description: "Target audience psychology and motivations",
    suggestedQuestions: [
      "Describe your ideal prospect (demographics + psychographics)",
      "What do they care about, fear, and want?",
      "How do they make decisions? (fast/slow, emotional/logical, etc.)"
    ]
  },
  {
    id: 5,
    title: "How to Build Trust & Add Value",
    description: "Conversation tactics and personalization strategy",
    suggestedQuestions: [
      "List 4-6 specific ways your AI should build trust in conversations",
      "List 4-6 ways to add immediate value in each message",
      "When should your AI use business name, location, revenue, or industry data?"
    ]
  },
  {
    id: 6,
    title: "Campaign Goal & Success Criteria",
    description: "What you're trying to achieve and how conversations should end",
    suggestedQuestions: [
      "What's the single goal of this campaign? (e.g., 'Book 20-min calls')",
      "When is a conversation successfully complete?",
      "When should the AI stop messaging after failure?"
    ]
  },
  {
    id: 7,
    title: "AI Behavior & Edge Cases",
    description: "How your AI should act and handle objections",
    suggestedQuestions: [
      "Describe your AI's personality: formality level, persistence style, empathy level",
      "List 3-5 common objections and how to respond to each",
      "List 2-3 unusual requests and how to handle them"
    ]
  }
];
const ValueGuide = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");
  const key = searchParams.get("key");
  const partnerId = searchParams.get("partnerId");
  const [agencyName, setAgencyName] = useState("");
  const [currentSection, setCurrentSection] = useState(1);
  const [sectionResponses, setSectionResponses] = useState<Map<number, string>>(new Map());
  const [isRecording, setIsRecording] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [fullTranscript, setFullTranscript] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const voiceServiceRef = useRef<RealtimeVoiceService | null>(null);
  useEffect(() => {
    if (!companyId && !key) {
      navigate("/");
    }
    
    // If using key, fetch agency name
    if (key) {
      const fetchAgencyName = async () => {
        const { data } = await supabase
          .from("agency")
          .select("nameTitle")
          .eq("key", key)
          .maybeSingle();
        
        if (data) {
          setAgencyName(data.nameTitle || "");
        }
      };
      fetchAgencyName();
    }
  }, [companyId, key, navigate]);
  useEffect(() => {
    // Initialize Realtime Voice Service
    voiceServiceRef.current = new RealtimeVoiceService((transcript, isFinal) => {
      if (isFinal) {
        setFullTranscript(prev => (prev + ' ' + transcript).trim());
        setCurrentTranscript("");
      } else {
        setCurrentTranscript(transcript);
      }
    }, error => {
      console.error('Voice service error:', error);
      setIsRecording(false);
    });
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
  const handleSubmit = async (finalTranscript: string) => {
    // Save all responses including the current one
    const allResponses = new Map(sectionResponses).set(currentSection, finalTranscript);
    const responsesObject = Object.fromEntries(Array.from(allResponses.entries()).map(([id, text]) => [SECTIONS[id - 1].title, text]));
    localStorage.setItem("value-guide-responses", JSON.stringify(responsesObject));

    // Update partner record with business value guide
    if (partnerId) {
      try {
        const { error } = await supabase
          .from('partners')
          .update({ business_value_guide: JSON.stringify(responsesObject) })
          .eq('id', parseInt(partnerId));
        
        if (error) {
          console.error('Failed to update partner:', error);
        }
      } catch (error) {
        console.error('Error updating partner:', error);
      }
    }

    // If key flow, call webhook to create account user
    if (key && partnerId) {
      try {
        // Fetch partner data to get companyId and llc_name
        const { data: partnerData } = await supabase
          .from('partners')
          .select('companyid, llc_name')
          .eq('id', parseInt(partnerId))
          .single();

        if (partnerData) {
          const webhookBody: Record<string, string> = {
            name: partnerData.llc_name || "",
            companyId: partnerData.companyid || "",
            partnerId: partnerId,
            key: key
          };

          // Call the webhook
          await fetch('https://n8n.omnirasystems.com/webhook/omnira/create-account-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookBody),
          });
        }
      } catch (error) {
        console.error('Error calling webhook:', error);
      }
    }

    // Navigate based on flow type
    if (key) {
      navigate(`/welcome?key=${key}&partnerId=${partnerId}`);
    } else {
      navigate(`/connect-location?companyId=${companyId}&partnerId=${partnerId}`);
    }
  };
  const currentSectionData = SECTIONS[currentSection - 1];
  const displayText = fullTranscript + (currentTranscript ? ' ' + currentTranscript : '');
  return <OnboardingLayout 
      currentStep={key ? 2 : 3} 
      title="Value Guide" 
      subtitle="Tell us about your business in your own words"
      customBrandName={key && agencyName ? agencyName : undefined}
      isKeyFlow={!!key}
    >
      <div className="space-y-6">
        {/* Browser Support Info - Removed since OpenAI Realtime works in all browsers */}

        

        {/* Section Progress */}
        <div className="flex justify-center gap-3">
          {SECTIONS.map(section => <div key={section.id} className={`
                w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all
                ${sectionResponses.has(section.id) ? 'bg-primary text-primary-foreground shadow-lg' : section.id === currentSection ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'}
              `}>
              {section.id}
            </div>)}
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
              {currentSectionData.suggestedQuestions.map((q, i) => <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{q}</span>
                </li>)}
            </ul>
          </div>

          {/* Recording Button */}
          <div className="flex justify-center py-2">
            <Button onClick={toggleRecording} size="lg" disabled={isConnecting} className={`
                w-16 h-16 rounded-full transition-all shadow-lg
                ${isRecording ? 'bg-destructive hover:bg-destructive/90 animate-pulse' : 'bg-primary hover:bg-primary/90'}
              `}>
              {isConnecting ? <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" /> : isRecording ? <StopCircle className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </Button>
          </div>

          {isRecording && <p className="text-center text-sm text-muted-foreground animate-pulse">
              🎤 Recording in progress...
            </p>}

          {/* Textarea with real-time transcription */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Your Response
            </label>
            <Textarea value={displayText} onChange={e => setFullTranscript(e.target.value)} placeholder={isRecording ? "Listening... speak now" : "Click the microphone to start recording, or type your response here..."} className="min-h-[200px] text-base" disabled={isRecording} />
          </div>

          {/* Navigation Button */}
          <Button onClick={handleNext} disabled={!fullTranscript.trim() || isRecording} size="lg" className="w-full text-lg py-6 bg-primary hover:bg-primary/90">
            {currentSection === SECTIONS.length ? "Submit & Continue" : "Next Section"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Section {currentSection} of {SECTIONS.length}
            {sectionResponses.size > 0 && ` • ${sectionResponses.size} completed`}
          </p>
        </div>
      </div>
    </OnboardingLayout>;
};
export default ValueGuide;