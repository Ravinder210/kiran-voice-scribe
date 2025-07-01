import React, { useState } from 'react';
import { Mic, Square, Pause } from 'lucide-react';
import { Button } from "@/components/ui/button";
interface VoiceRecordingProps {
  onTranscriptionComplete: (notes: any) => void;
}
const VoiceRecording = ({
  onTranscriptionComplete
}: VoiceRecordingProps) => {
  const [voiceFlow, setVoiceFlow] = useState<'selection' | 'recording' | 'processing' | 'completed'>('selection');
  const [selectedVoiceOption, setSelectedVoiceOption] = useState<'transcribe' | 'dictate' | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const handleVoiceOptionSelect = (option: 'transcribe' | 'dictate') => {
    setSelectedVoiceOption(option);
    setVoiceFlow('recording');
  };
  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);

    // Simulate recording timer
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    // Store timer reference for cleanup
    (window as any).recordingTimer = timer;
  };
  const handleStopRecording = () => {
    setIsRecording(false);
    if ((window as any).recordingTimer) {
      clearInterval((window as any).recordingTimer);
    }
    setVoiceFlow('processing');

    // Simulate AI processing
    setTimeout(() => {
      const sampleNotes = {
        subjective: "Patient presents with chief complaint of persistent dry cough for 3 days, accompanied by mild fever (99.2°F) and general fatigue. Reports difficulty sleeping due to coughing fits, especially at night. Denies chest pain, shortness of breath, or sputum production. No recent travel or known sick contacts.",
        objective: "Vital signs: BP 120/80 mmHg, HR 72 bpm, RR 16/min, Temp 99.2°F, O2 sat 98% on room air. Patient appears mildly fatigued but in no acute distress. HEENT: Throat mildly erythematous, no exudate. Lymph nodes: No cervical lymphadenopathy. Chest: Clear to auscultation bilaterally, no wheeze or crackles. Heart: Regular rate and rhythm, no murmurs.",
        assessment: "Likely viral upper respiratory tract infection based on clinical presentation and physical examination findings. No signs of bacterial infection or pneumonia at this time. Patient is stable with mild constitutional symptoms.",
        plan: "1. Supportive care with adequate rest and hydration\n2. Symptomatic treatment with acetaminophen for fever and discomfort\n3. Honey-based cough suppressants for nighttime cough\n4. Return if symptoms worsen or persist beyond 7-10 days\n5. Follow-up appointment in 1 week if no improvement"
      };
      onTranscriptionComplete(sampleNotes);
      setVoiceFlow('completed');
    }, 3000);
  };
  const resetVoiceFlow = () => {
    setVoiceFlow('selection');
    setSelectedVoiceOption(null);
    setRecordingTime(0);
    setIsRecording(false);
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  if (voiceFlow === 'selection') {
    return <div className="text-center py-8 space-y-6">
        <div className="w-32 h-32 mx-auto bg-gradient-to-r from-primary/10 to-primary/20 rounded-full flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
            <Mic className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-card-foreground mb-4">Capture Consultation</h3>
        <p className="text-muted-foreground mb-8 text-sm">Your clinical note will appear here once your transcription or dictation is complete.</p>
        
        <div className="space-y-4">
          <Button onClick={() => handleVoiceOptionSelect('transcribe')} className="w-full max-w-md mx-auto bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg flex items-center justify-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 flex items-center">
                <div className="flex space-x-0.5">
                  <div className="w-0.5 h-2 bg-primary-foreground rounded-full"></div>
                  <div className="w-0.5 h-3 bg-primary-foreground rounded-full"></div>
                  <div className="w-0.5 h-4 bg-primary-foreground rounded-full"></div>
                  <div className="w-0.5 h-2 bg-primary-foreground rounded-full"></div>
                </div>
              </div>
              <span>Transcribe Consultation</span>
            </div>
          </Button>
          
          <Button onClick={() => handleVoiceOptionSelect('dictate')} variant="outline" className="w-full max-w-md mx-auto border-primary text-primary hover:bg-primary/10 py-3 px-6 rounded-lg flex items-center justify-center space-x-2">
            <Mic className="w-4 h-4" />
            <span>Dictate Summary</span>
          </Button>
        </div>
      </div>;
  }
  if (voiceFlow === 'recording') {
    return <div className="text-center py-8 space-y-6">
        <h3 className="text-xl font-semibold text-card-foreground mb-4">Clinical Note</h3>
        
        {/* Audio Waveform Visualization */}
        <div className="flex items-center justify-center space-x-1 mb-6">
          {[...Array(20)].map((_, i) => <div key={i} className={`w-1 bg-primary rounded-full transition-all duration-300 ${isRecording ? 'animate-pulse' : ''}`} style={{
          height: isRecording ? `${Math.random() * 30 + 10}px` : '10px'
        }} />)}
        </div>

        {/* Timer */}
        <div className="bg-muted rounded-full px-4 py-2 inline-flex items-center space-x-2 mb-6">
          <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
          <span className="text-lg font-mono text-muted-foreground">{formatTime(recordingTime)}</span>
        </div>

        <p className="text-muted-foreground mb-8">
          {isRecording ? 'Recording in progress...' : 'Transcription In Progress.'}<br />
          Your clinical note will appear here once your transcription is complete.
        </p>

        <div className="flex justify-center space-x-4">
          {!isRecording ? <Button onClick={handleStartRecording} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg">
              Start Recording
            </Button> : <>
              <Button variant="outline" className="px-6 py-3 rounded-lg border-border">
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
              <Button onClick={handleStopRecording} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-3 rounded-lg">
                <Square className="w-4 h-4 mr-2" />
                Stop Transcribing
              </Button>
            </>}
        </div>
      </div>;
  }
  if (voiceFlow === 'processing') {
    return <div className="text-center py-8 space-y-6">
        <div className="w-16 h-16 mx-auto">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
        <h3 className="text-xl font-semibold text-card-foreground">Processing Your Recording</h3>
        <p className="text-muted-foreground">AI is analyzing your consultation and generating clinical notes...</p>
      </div>;
  }
  return <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-card-foreground">Generated Clinical Notes</h3>
      <Button variant="outline" size="sm" onClick={resetVoiceFlow} className="border-primary text-primary hover:bg-primary/10">
        <Mic className="w-4 h-4 mr-2" />
        New Recording
      </Button>
    </div>;
};
export default VoiceRecording;