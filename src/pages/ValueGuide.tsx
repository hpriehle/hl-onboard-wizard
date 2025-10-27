import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mic, StopCircle, Check, RotateCcw, ArrowRight, Lightbulb, Info } from "lucide-react";

interface Question {
  id: number;
  question: string;
  tip: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What does your business do?",
    tip: "Describe your core services and value proposition",
  },
  {
    id: 2,
    question: "Who are your ideal customers?",
    tip: "Think demographics, industries, and target market",
  },
  {
    id: 3,
    question: "What problems do you solve for your customers?",
    tip: "Focus on pain points and the outcomes you deliver",
  },
  {
    id: 4,
    question: "What makes your business unique?",
    tip: "Highlight your competitive advantages and differentiators",
  },
  {
    id: 5,
    question: "What are your business goals for the next year?",
    tip: "Think about growth targets, expansion, or new offerings",
  },
];

interface Response {
  questionId: number;
  transcription: string;
  duration: number;
}

type RecordingState = "idle" | "recording" | "processing" | "complete";

const ValueGuide = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");
  const partnerId = searchParams.get("partnerId");

  const [responses, setResponses] = useState<Map<number, Response>>(new Map());
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscription] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!companyId) {
      navigate("/");
    }
  }, [companyId, navigate]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopRecording();
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        
        // Simulate transcription process
        setRecordingState("processing");
        
        // Mock transcription - in production, this would call a speech-to-text API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockTranscription = `This is a simulated transcription for question ${currentQuestion}. 
          In production, this would be the actual transcribed text from your voice recording. 
          The recording lasted ${recordingTime} seconds.`;
        
        setTranscription(mockTranscription);
        setRecordingState("complete");
        
        // Cleanup
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecordingState("recording");
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone",
      });
    } catch (error) {
      toast({
        title: "Microphone Access Denied",
        description: "Please enable microphone permissions to record",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const acceptResponse = () => {
    const response: Response = {
      questionId: currentQuestion,
      transcription,
      duration: recordingTime,
    };

    setResponses(prev => new Map(prev).set(currentQuestion, response));
    
    toast({
      title: "Response Saved",
      description: `Question ${currentQuestion} completed`,
    });

    // Move to next question or finish
    if (currentQuestion < QUESTIONS.length) {
      setCurrentQuestion(prev => prev + 1);
      resetRecording();
    }
  };

  const resetRecording = () => {
    setRecordingState("idle");
    setRecordingTime(0);
    setTranscription("");
  };

  const handleComplete = () => {
    if (responses.size < QUESTIONS.length) {
      toast({
        title: "Incomplete",
        description: "Please answer all questions before proceeding",
        variant: "destructive",
      });
      return;
    }

    // Save responses
    localStorage.setItem("onboarding-responses", JSON.stringify(Array.from(responses.entries())));

    toast({
      title: "Value Guide Complete",
      description: "Proceeding to final step",
    });

    navigate(`/connect-location?companyId=${companyId}&partnerId=${partnerId}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestionData = QUESTIONS[currentQuestion - 1];
  const isQuestionAnswered = responses.has(currentQuestion);

  return (
    <OnboardingLayout
      currentStep={3}
      title="Tell Us About Your Business"
      subtitle="Answer the following questions by recording your voice responses"
    >
      <div className="space-y-6">
        <div className="bg-accent p-4 rounded-lg flex items-start gap-3">
          <Info className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
          <p className="text-sm text-accent-foreground">
            Click the microphone button to start recording. We'll transcribe your response in real-time.
            Speak naturally and take your time with each answer.
          </p>
        </div>

        {/* Question Progress */}
        <div className="flex justify-center gap-2">
          {QUESTIONS.map((q) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(q.id)}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                ${responses.has(q.id) 
                  ? 'bg-success text-success-foreground' 
                  : q.id === currentQuestion
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
                }
              `}
            >
              {responses.has(q.id) ? <Check className="w-5 h-5" /> : q.id}
            </button>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Question */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Question {currentQuestion}:
              </h3>
              <p className="text-lg text-foreground">
                {currentQuestionData.question}
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Tip:</p>
                <p className="text-sm text-muted-foreground">
                  {currentQuestionData.tip}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Recording Interface */}
          <div className="space-y-4">
            {/* Recording Button */}
            {recordingState === "idle" && !isQuestionAnswered && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <Button
                  onClick={startRecording}
                  size="lg"
                  className="w-24 h-24 rounded-full bg-gradient-primary hover:opacity-90 shadow-lg"
                >
                  <Mic className="w-10 h-10" />
                </Button>
                <p className="text-sm text-muted-foreground">Click to record response</p>
              </div>
            )}

            {/* Recording Active */}
            {recordingState === "recording" && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="relative">
                  <Button
                    onClick={stopRecording}
                    size="lg"
                    className="w-24 h-24 rounded-full bg-destructive hover:bg-destructive/90"
                  >
                    <StopCircle className="w-10 h-10" />
                  </Button>
                  <div className="absolute -inset-2 rounded-full bg-destructive/20 animate-pulse-slow" />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-destructive mb-1">● REC</p>
                  <p className="text-lg font-mono">{formatTime(recordingTime)}</p>
                  <p className="text-sm text-muted-foreground mt-2">Recording...</p>
                </div>
              </div>
            )}

            {/* Processing */}
            {recordingState === "processing" && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Transcribing your response...</p>
              </div>
            )}

            {/* Complete/Transcription */}
            {(recordingState === "complete" || isQuestionAnswered) && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg max-h-48 overflow-y-auto">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {isQuestionAnswered 
                      ? responses.get(currentQuestion)?.transcription 
                      : transcription
                    }
                  </p>
                </div>

                {!isQuestionAnswered && (
                  <div className="flex gap-3">
                    <Button
                      onClick={resetRecording}
                      variant="outline"
                      className="flex-1"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Re-record
                    </Button>
                    <Button
                      onClick={acceptResponse}
                      className="flex-1 bg-success hover:bg-success/90"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Accept
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Complete Button */}
        <Button
          onClick={handleComplete}
          disabled={responses.size < QUESTIONS.length}
          className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg mt-8"
        >
          Complete Business Value Guide
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          {responses.size} of {QUESTIONS.length} questions completed
        </p>
      </div>
    </OnboardingLayout>
  );
};

export default ValueGuide;
