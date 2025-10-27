import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mic, StopCircle, ArrowRight, Info, AlertCircle } from "lucide-react";

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

// Web Speech API Service
class SpeechRecognitionService {
  private recognition: any;
  private isSupported: boolean;
  private shouldContinue = false;
  private retryCount = 0;
  private maxRetries = 3;
  private onFatalError: ((error: string) => void) | null = null;

  constructor() {
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.isSupported = !!SpeechRecognition;
      
      console.log('Speech Recognition available:', this.isSupported);
      console.log('SpeechRecognition:', (window as any).SpeechRecognition);
      console.log('webkitSpeechRecognition:', (window as any).webkitSpeechRecognition);
      
      if (this.isSupported) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true; // Chrome may still end; we'll auto-restart
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        console.log('Speech Recognition initialized successfully');
      } else {
        console.error('Speech Recognition not available in this browser');
      }
    } catch (error) {
      console.error('Error initializing Speech Recognition:', error);
      this.isSupported = false;
    }
  }

  start(onResult: (transcript: string, isFinal: boolean) => void, onError: (error: string) => void) {
    if (!this.isSupported) {
      console.error('Cannot start: Speech recognition is not supported');
      onError('Speech recognition is not supported in this browser');
      return;
    }

    this.shouldContinue = true;
    this.retryCount = 0;
    this.onFatalError = onError;

    try {
      this.recognition.onresult = (event: any) => {
        this.retryCount = 0; // Reset retry count on successful result
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        onResult(finalTranscript || interimTranscript, !!finalTranscript);
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        
        // Auto-recover from common non-fatal errors with retry limit
        if (['no-speech', 'audio-capture', 'network', 'aborted'].includes(event.error)) {
          this.retryCount++;
          
          if (this.retryCount > this.maxRetries) {
            console.error(`Max retries (${this.maxRetries}) exceeded for error: ${event.error}`);
            this.shouldContinue = false;
            
            let userMessage = 'Speech recognition failed after multiple attempts. ';
            if (event.error === 'network') {
              userMessage += 'Network connectivity issue. Please check your connection or use OpenAI Realtime API for better reliability.';
            } else if (event.error === 'no-speech') {
              userMessage += 'No speech detected. Please speak clearly into your microphone.';
            } else if (event.error === 'audio-capture') {
              userMessage += 'Microphone access issue. Please check your microphone permissions.';
            } else {
              userMessage += 'Please try again or type your response manually.';
            }
            
            onError(userMessage);
            return;
          }
          
          if (this.shouldContinue) {
            console.log(`Recoverable error (${event.error}). Retry ${this.retryCount}/${this.maxRetries}`);
            try { this.recognition.stop(); } catch (_) {}
            // Let onend trigger the restart
          }
          return; // do not bubble to UI toast for recoverable errors under retry limit
        }
        
        // Fatal errors
        this.shouldContinue = false;
        onError(event.error);
      };

      this.recognition.onstart = () => {
        console.log('Speech recognition started');
      };

      this.recognition.onend = () => {
        console.log('Speech recognition ended');
        if (this.shouldContinue && this.retryCount <= this.maxRetries) {
          // Chrome often ends even in continuous mode; restart to keep listening
          try {
            console.log('Auto-restarting speech recognition...');
            this.recognition.start();
          } catch (e) {
            console.warn('Immediate restart failed, retrying shortly...', e);
            setTimeout(() => {
              if (this.shouldContinue && this.retryCount <= this.maxRetries) {
                try { this.recognition.start(); } catch (err) { console.error('Restart error:', err); }
              }
            }, 300);
          }
        }
      };

      console.log('Starting speech recognition...');
      this.recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      onError(error instanceof Error ? error.message : 'Failed to start recognition');
    }
  }

  stop() {
    this.shouldContinue = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (_) {}
      try {
        this.recognition.abort();
      } catch (_) {}
      console.log('Speech recognition stopped');
    }
  }

  isAvailable() {
    return this.isSupported;
  }
}

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
  const [speechSupported, setSpeechSupported] = useState<boolean | null>(null);
  const recognitionServiceRef = useRef<SpeechRecognitionService | null>(null);

  useEffect(() => {
    if (!companyId) {
      navigate("/");
    }
  }, [companyId, navigate]);

  useEffect(() => {
    recognitionServiceRef.current = new SpeechRecognitionService();
    setSpeechSupported(recognitionServiceRef.current?.isAvailable() ?? false);
    
    return () => {
      recognitionServiceRef.current?.stop();
    };
  }, []);

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

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      recognitionServiceRef.current?.stop();
      setIsRecording(false);
      setFullTranscript(prev => (prev + ' ' + currentTranscript).trim());
      setCurrentTranscript("");
      
      toast({
        title: "Recording Stopped",
        description: "You can now edit your response",
      });
    } else {
      // Start recording
      if (!recognitionServiceRef.current?.isAvailable()) {
        toast({
          title: "Not Supported",
          description: "Speech recognition is not supported in your browser. Please use Chrome or Edge.",
          variant: "destructive",
        });
        return;
      }

      setIsRecording(true);
      recognitionServiceRef.current?.start(
        (transcript, isFinal) => {
          if (isFinal) {
            setFullTranscript(prev => (prev + ' ' + transcript).trim());
            setCurrentTranscript("");
          } else {
            setCurrentTranscript(transcript);
          }
        },
        (error) => {
          console.error('Speech recognition error:', error);
          setIsRecording(false);
          toast({
            title: "Recognition Error",
            description: "Failed to recognize speech. Please try again.",
            variant: "destructive",
          });
        }
      );

      toast({
        title: "Recording Started",
        description: "Speak clearly - your words will appear below",
      });
    }
  };

  const handleNext = () => {
    const trimmedTranscript = fullTranscript.trim();
    
    if (!trimmedTranscript) {
      toast({
        title: "Response Required",
        description: "Please provide a response before continuing",
        variant: "destructive",
      });
      return;
    }

    // Save current section response
    setSectionResponses(prev => new Map(prev).set(currentSection, trimmedTranscript));
    
    if (currentSection < SECTIONS.length) {
      // Move to next section
      setCurrentSection(prev => prev + 1);
      
      toast({
        title: "Section Complete",
        description: `Moving to section ${currentSection + 1}`,
      });
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
    
    toast({
      title: "Value Guide Complete!",
      description: "Proceeding to connect your location",
    });
    
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
        {/* Browser Support Info */}
        {speechSupported === false && (
          <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-destructive mb-1">Browser Not Supported</p>
              <p className="text-sm text-muted-foreground">
                Speech recognition requires Chrome or Edge browser. You can still type your responses manually.
              </p>
            </div>
          </div>
        )}

        <div className="bg-accent/50 p-4 rounded-lg flex items-start gap-3">
          <Info className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
          <p className="text-sm text-accent-foreground">
            Click the microphone to record your response. Your words will appear in real-time. 
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

          {/* Recording Button */}
          <div className="flex justify-center py-4">
            <Button
              onClick={toggleRecording}
              size="lg"
              disabled={speechSupported === false}
              className={`
                w-20 h-20 rounded-full transition-all shadow-lg
                ${isRecording 
                  ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
                  : 'bg-primary hover:bg-primary/90'
                }
              `}
            >
              {isRecording ? (
                <StopCircle className="w-10 h-10" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </Button>
          </div>

          {isRecording && (
            <p className="text-center text-sm text-muted-foreground animate-pulse">
              🎤 Recording in progress...
            </p>
          )}

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
