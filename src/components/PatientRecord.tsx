import React, { useState } from 'react';
import { ArrowLeft, FileText, Pill, History, Paperclip } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientInfo from './PatientInfo';
import VoiceRecording from './VoiceRecording';
import ClinicalNoteForm from './ClinicalNoteForm';
import PrescriptionForm from './PrescriptionForm';
interface PatientRecordProps {
  patient: any;
  onBack: () => void;
}
const PatientRecord = ({
  patient,
  onBack
}: PatientRecordProps) => {
  const [activeTab, setActiveTab] = useState('clinical-note');
  const [clinicalNote, setClinicalNote] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });
  const [prescriptionText, setPrescriptionText] = useState('');
  const [showClinicalForm, setShowClinicalForm] = useState(false);
  const handleTranscriptionComplete = (notes: any) => {
    setClinicalNote(notes);
    setShowClinicalForm(true);
  };
  return <div className="min-h-screen bg-gradient-to-br from-accent via-background to-muted">
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
              <PatientInfo patient={patient} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <TabsContent value="clinical-note">
                <Card className="border-border bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg text-card-foreground">Clinical Consultation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!showClinicalForm ? <VoiceRecording onTranscriptionComplete={handleTranscriptionComplete} /> : <ClinicalNoteForm clinicalNote={clinicalNote} setClinicalNote={setClinicalNote} />}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prescription">
                <Card className="border-border bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg text-card-foreground">Create Prescription</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PrescriptionForm prescriptionText={prescriptionText} setPrescriptionText={setPrescriptionText} />
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
                          <h4 className="text-card-foreground text-sm sm:text-base font-extrabold">Previous Consultation</h4>
                          <span className="text-xs text-muted-foreground">2 weeks ago</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Routine checkup and blood pressure monitoring</p>
                        <div className="text-xs text-muted-foreground">
                          <span className="bg-primary/80 px-2 py-1 rounded-full mr-2 text-zinc-50">Completed</span>
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
                          <span className="bg-primary/80 px-2 py-1 rounded-full mr-2 text-zinc-50">Completed</span>
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
    </div>;
};
export default PatientRecord;