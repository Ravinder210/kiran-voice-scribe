import React, { useState } from 'react';
import { ArrowLeft, FileText, Pill, History, Paperclip, Mic, Square, Save, Pause } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface PatientRecordProps {
  patient: any;
  onBack: () => void;
}

const PatientRecord = ({ patient, onBack }: PatientRecordProps) => {
  const [activeTab, setActiveTab] = useState('clinical-note');
  const [clinicalNote, setClinicalNote] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });
  const [prescriptionText, setPrescriptionText] = useState('');
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
      generateSampleClinicalNotes();
      setVoiceFlow('completed');
    }, 3000);
  };

  const generateSampleClinicalNotes = () => {
    setClinicalNote({
      subjective: "Patient presents with chief complaint of persistent dry cough for 3 days, accompanied by mild fever (99.2°F) and general fatigue. Reports difficulty sleeping due to coughing fits, especially at night. Denies chest pain, shortness of breath, or sputum production. No recent travel or known sick contacts.",
      objective: "Vital signs: BP 120/80 mmHg, HR 72 bpm, RR 16/min, Temp 99.2°F, O2 sat 98% on room air. Patient appears mildly fatigued but in no acute distress. HEENT: Throat mildly erythematous, no exudate. Lymph nodes: No cervical lymphadenopathy. Chest: Clear to auscultation bilaterally, no wheeze or crackles. Heart: Regular rate and rhythm, no murmurs.",
      assessment: "Likely viral upper respiratory tract infection based on clinical presentation and physical examination findings. No signs of bacterial infection or pneumonia at this time. Patient is stable with mild constitutional symptoms.",
      plan: "1. Supportive care with adequate rest and hydration\n2. Symptomatic treatment with acetaminophen for fever and discomfort\n3. Honey-based cough suppressants for nighttime cough\n4. Return if symptoms worsen or persist beyond 7-10 days\n5. Follow-up appointment in 1 week if no improvement"
    });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-muted">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Button variant="ghost" onClick={onBack} size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Queue</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Tabs at the top */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4 mb-4 sm:mb-6 gap-1 sm:gap-2 p-1 bg-primary/10">
            <TabsTrigger value="clinical-note" className="flex items-center justify-center p-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Clinical Note</span>
              <span className="sm:hidden">Note</span>
            </TabsTrigger>
            <TabsTrigger value="prescription" className="flex items-center justify-center p-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Pill className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Prescription</span>
              <span className="sm:hidden">Rx</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center justify-center p-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <History className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">History</span>
              <span className="sm:hidden">History</span>
            </TabsTrigger>
            <TabsTrigger value="attachments" className="flex items-center justify-center p-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Paperclip className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Attachments</span>
              <span className="sm:hidden">Files</span>
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Patient Info Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary/80 to-primary rounded-full flex items-center justify-center text-primary-foreground text-xl sm:text-2xl mx-auto mb-4">
                      {patient.avatar}
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg text-card-foreground">{patient.name}</h3>
                    <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                      <span>29</span>
                      <span>•</span>
                      <span>M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <TabsContent value="clinical-note">
                <Card className="border-border bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg text-card-foreground">Clinical Consultation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Voice Assistant Flow */}
                    {voiceFlow === 'selection' && (
                      <div className="text-center py-8 space-y-6">
                        <div className="w-32 h-32 mx-auto bg-gradient-to-r from-primary/10 to-primary/20 rounded-full flex items-center justify-center mb-6">
                          <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                            <Mic className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-card-foreground mb-4">Capture Consultation</h3>
                        <p className="text-muted-foreground mb-8">Your clinical note will appear here once your transcription or dictation is complete.</p>
                        
                        <div className="space-y-4">
                          <Button 
                            onClick={() => handleVoiceOptionSelect('transcribe')}
                            className="w-full max-w-md mx-auto bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg flex items-center justify-center space-x-2"
                          >
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
                          
                          <Button 
                            onClick={() => handleVoiceOptionSelect('dictate')}
                            variant="outline"
                            className="w-full max-w-md mx-auto border-primary text-primary hover:bg-primary/10 py-3 px-6 rounded-lg flex items-center justify-center space-x-2"
                          >
                            <Mic className="w-4 h-4" />
                            <span>Dictate Summary</span>
                          </Button>
                        </div>
                      </div>
                    )}

                    {voiceFlow === 'recording' && (
                      <div className="text-center py-8 space-y-6">
                        <h3 className="text-xl font-semibold text-card-foreground mb-4">Clinical Note</h3>
                        
                        {/* Audio Waveform Visualization */}
                        <div className="flex items-center justify-center space-x-1 mb-6">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 bg-primary rounded-full transition-all duration-300 ${
                                isRecording ? 'animate-pulse' : ''
                              }`}
                              style={{
                                height: isRecording ? `${Math.random() * 30 + 10}px` : '10px'
                              }}
                            />
                          ))}
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
                          {!isRecording ? (
                            <Button 
                              onClick={handleStartRecording}
                              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg"
                            >
                              Start Recording
                            </Button>
                          ) : (
                            <>
                              <Button 
                                variant="outline"
                                className="px-6 py-3 rounded-lg border-border"
                              >
                                <Pause className="w-4 h-4 mr-2" />
                                Pause
                              </Button>
                              <Button 
                                onClick={handleStopRecording}
                                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-3 rounded-lg"
                              >
                                <Square className="w-4 h-4 mr-2" />
                                Stop Transcribing
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {voiceFlow === 'processing' && (
                      <div className="text-center py-8 space-y-6">
                        <div className="w-16 h-16 mx-auto">
                          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                        </div>
                        <h3 className="text-xl font-semibold text-card-foreground">Processing Your Recording</h3>
                        <p className="text-muted-foreground">AI is analyzing your consultation and generating clinical notes...</p>
                      </div>
                    )}

                    {voiceFlow === 'completed' && (
                      <div className="space-y-4 sm:space-y-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-card-foreground">Generated Clinical Notes</h3>
                          <Button variant="outline" size="sm" onClick={resetVoiceFlow} className="border-primary text-primary hover:bg-primary/10">
                            <Mic className="w-4 h-4 mr-2" />
                            New Recording
                          </Button>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Subjective (Patient's Complaints)
                          </label>
                          <Textarea 
                            placeholder="Patient reports symptoms of..."
                            className="min-h-[80px] sm:min-h-[100px] border-border focus:border-primary text-sm bg-card/50"
                            value={clinicalNote.subjective}
                            onChange={(e) => setClinicalNote({...clinicalNote, subjective: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Objective (Clinical Findings)
                          </label>
                          <Textarea 
                            placeholder="Physical examination reveals..."
                            className="min-h-[80px] sm:min-h-[100px] border-border focus:border-primary text-sm bg-card/50"
                            value={clinicalNote.objective}
                            onChange={(e) => setClinicalNote({...clinicalNote, objective: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Assessment (Diagnosis)
                          </label>
                          <Textarea 
                            placeholder="Clinical assessment and diagnosis..."
                            className="min-h-[80px] sm:min-h-[100px] border-border focus:border-primary text-sm bg-card/50"
                            value={clinicalNote.assessment}
                            onChange={(e) => setClinicalNote({...clinicalNote, assessment: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Plan (Treatment Plan)
                          </label>
                          <Textarea 
                            placeholder="Treatment plan and recommendations..."
                            className="min-h-[80px] sm:min-h-[100px] border-border focus:border-primary text-sm bg-card/50"
                            value={clinicalNote.plan}
                            onChange={(e) => setClinicalNote({...clinicalNote, plan: e.target.value})}
                          />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                          <Button variant="outline" className="text-sm border-border">Save Draft</Button>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                            <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Complete Note
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prescription">
                <Card className="border-border bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <span className="text-base sm:text-lg text-card-foreground">Create Prescription</span>
                      <Button variant="outline" size="sm" onClick={() => {}} className="text-xs sm:text-sm border-primary text-primary hover:bg-primary/10">
                        <Mic className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Dictate Prescription
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Medication Name
                          </label>
                          <Input placeholder="e.g., Amoxicillin" className="border-border focus:border-primary text-sm bg-card/50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Dosage
                          </label>
                          <Input placeholder="e.g., 500mg" className="border-border focus:border-primary text-sm bg-card/50" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Frequency
                          </label>
                          <Input placeholder="e.g., 3 times daily" className="border-border focus:border-primary text-sm bg-card/50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">
                            Duration
                          </label>
                          <Input placeholder="e.g., 7 days" className="border-border focus:border-primary text-sm bg-card/50" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Instructions
                        </label>
                        <Textarea 
                          placeholder="Take with food, complete full course..."
                          className="border-border focus:border-primary text-sm bg-card/50"
                          value={prescriptionText}
                          onChange={(e) => setPrescriptionText(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                        <Button variant="outline" className="text-sm border-border">Add Another Medication</Button>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                          Generate Prescription
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="border-border bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg text-card-foreground">Patient History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 sm:p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-card-foreground text-sm sm:text-base">Previous Consultation</h4>
                          <span className="text-xs text-muted-foreground">2 weeks ago</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Routine checkup and blood pressure monitoring</p>
                        <div className="text-xs text-muted-foreground">
                          <span className="bg-primary/20 text-primary px-2 py-1 rounded-full mr-2">Completed</span>
                          Dr. Sarah Johnson
                        </div>
                      </div>
                      
                      <div className="p-3 sm:p-4 bg-secondary/50 rounded-lg border border-border">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-card-foreground text-sm sm:text-base">Lab Results Review</h4>
                          <span className="text-xs text-muted-foreground">1 month ago</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Blood work and cholesterol screening</p>
                        <div className="text-xs text-muted-foreground">
                          <span className="bg-primary/20 text-primary px-2 py-1 rounded-full mr-2">Completed</span>
                          Dr. Sarah Johnson
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attachments">
                <Card className="border-border bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg text-card-foreground">Patient Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 sm:p-8 text-center">
                      <Paperclip className="w-10 h-10 sm:w-12 sm:h-12 text-primary/60 mx-auto mb-4" />
                      <h3 className="text-base sm:text-lg font-medium text-card-foreground mb-2">Upload Documents</h3>
                      <p className="text-muted-foreground mb-4 text-sm">Drop files here or click to browse</p>
                      <Button variant="outline" className="text-sm border-border">Choose Files</Button>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium text-card-foreground mb-4 text-sm sm:text-base">Recent Uploads</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            <span className="text-xs sm:text-sm font-medium text-card-foreground">Lab_Results_2024.pdf</span>
                          </div>
                          <span className="text-xs text-muted-foreground">2.1 MB</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            <span className="text-xs sm:text-sm font-medium text-card-foreground">X-Ray_Report.pdf</span>
                          </div>
                          <span className="text-xs text-muted-foreground">2.1 MB</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientRecord;
