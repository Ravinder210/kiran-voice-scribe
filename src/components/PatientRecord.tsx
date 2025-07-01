
import React, { useState } from 'react';
import { ArrowLeft, FileText, Pill, History, Paperclip, Mic, Play, Square, Save } from 'lucide-react';
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
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState('clinical-note');
  const [clinicalNote, setClinicalNote] = useState('');
  const [prescriptionText, setPrescriptionText] = useState('');

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      console.log('Starting voice recording...');
    } else {
      console.log('Stopping voice recording...');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Button variant="ghost" onClick={onBack} size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Queue</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-lg sm:text-xl">
                {patient.avatar}
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-800">{patient.name}</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">{patient.specialty}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Patient Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-purple-200">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl mx-auto mb-4">
                    {patient.avatar}
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg">{patient.name}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{patient.specialty}</p>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Patient ID</p>
                    <p className="font-medium text-sm sm:text-base">PAT-{patient.id.toString().padStart(4, '0')}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Age</p>
                    <p className="font-medium text-sm sm:text-base">45 years</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Last Visit</p>
                    <p className="font-medium text-sm sm:text-base">2 weeks ago</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Insurance</p>
                    <p className="font-medium text-sm sm:text-base">Health Plus</p>
                  </div>
                </div>

                {/* Voice Recording Controls */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white">
                  <h4 className="font-medium mb-3 text-sm sm:text-base">Voice Assistant</h4>
                  <Button 
                    variant="secondary" 
                    className={`w-full text-xs sm:text-sm ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
                    onClick={handleVoiceToggle}
                  >
                    {isRecording ? (
                      <>
                        <Square className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Start Recording
                      </>
                    )}
                  </Button>
                  {isRecording && (
                    <div className="mt-2 flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-2"></div>
                      <span className="text-xs">Recording in progress...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-4 sm:mb-6 gap-1 sm:gap-2 p-1">
                <TabsTrigger value="clinical-note" className="flex items-center justify-center p-2 text-xs sm:text-sm">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Clinical Note</span>
                  <span className="sm:hidden">Note</span>
                </TabsTrigger>
                <TabsTrigger value="prescription" className="flex items-center justify-center p-2 text-xs sm:text-sm">
                  <Pill className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Prescription</span>
                  <span className="sm:hidden">Rx</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center justify-center p-2 text-xs sm:text-sm">
                  <History className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">History</span>
                  <span className="sm:hidden">History</span>
                </TabsTrigger>
                <TabsTrigger value="attachments" className="flex items-center justify-center p-2 text-xs sm:text-sm">
                  <Paperclip className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Attachments</span>
                  <span className="sm:hidden">Files</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="clinical-note">
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <span className="text-base sm:text-lg">Clinical Consultation</span>
                      <Button variant="outline" size="sm" onClick={handleVoiceToggle} className="text-xs sm:text-sm">
                        <Mic className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        {isRecording ? 'Recording...' : 'Voice Input'}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subjective (Patient's Complaints)
                        </label>
                        <Textarea 
                          placeholder="Patient reports symptoms of..."
                          className="min-h-[80px] sm:min-h-[100px] border-purple-200 focus:border-purple-400 text-sm"
                          value={clinicalNote}
                          onChange={(e) => setClinicalNote(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Objective (Clinical Findings)
                        </label>
                        <Textarea 
                          placeholder="Physical examination reveals..."
                          className="min-h-[80px] sm:min-h-[100px] border-purple-200 focus:border-purple-400 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Assessment & Plan
                        </label>
                        <Textarea 
                          placeholder="Diagnosis and treatment plan..."
                          className="min-h-[80px] sm:min-h-[100px] border-purple-200 focus:border-purple-400 text-sm"
                        />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                        <Button variant="outline" className="text-sm">Save Draft</Button>
                        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-sm">
                          <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Complete Note
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prescription">
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <span className="text-base sm:text-lg">Create Prescription</span>
                      <Button variant="outline" size="sm" onClick={handleVoiceToggle} className="text-xs sm:text-sm">
                        <Mic className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Dictate Prescription
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Medication Name
                          </label>
                          <Input placeholder="e.g., Amoxicillin" className="border-purple-200 focus:border-purple-400 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dosage
                          </label>
                          <Input placeholder="e.g., 500mg" className="border-purple-200 focus:border-purple-400 text-sm" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Frequency
                          </label>
                          <Input placeholder="e.g., 3 times daily" className="border-purple-200 focus:border-purple-400 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration
                          </label>
                          <Input placeholder="e.g., 7 days" className="border-purple-200 focus:border-purple-400 text-sm" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instructions
                        </label>
                        <Textarea 
                          placeholder="Take with food, complete full course..."
                          className="border-purple-200 focus:border-purple-400 text-sm"
                          value={prescriptionText}
                          onChange={(e) => setPrescriptionText(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                        <Button variant="outline" className="text-sm">Add Another Medication</Button>
                        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-sm">
                          Generate Prescription
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Patient History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-800 text-sm sm:text-base">Previous Consultation</h4>
                          <span className="text-xs text-gray-500">2 weeks ago</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">Routine checkup and blood pressure monitoring</p>
                        <div className="text-xs text-gray-500">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full mr-2">Completed</span>
                          Dr. Sarah Johnson
                        </div>
                      </div>
                      
                      <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-800 text-sm sm:text-base">Lab Results Review</h4>
                          <span className="text-xs text-gray-500">1 month ago</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">Blood work and cholesterol screening</p>
                        <div className="text-xs text-gray-500">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full mr-2">Completed</span>
                          Dr. Sarah Johnson
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attachments">
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Patient Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 sm:p-8 text-center">
                      <Paperclip className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Upload Documents</h3>
                      <p className="text-gray-600 mb-4 text-sm">Drop files here or click to browse</p>
                      <Button variant="outline" className="text-sm">Choose Files</Button>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-800 mb-4 text-sm sm:text-base">Recent Uploads</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                            <span className="text-xs sm:text-sm font-medium">Lab_Results_2024.pdf</span>
                          </div>
                          <span className="text-xs text-gray-500">2.1 MB</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                            <span className="text-xs sm:text-sm font-medium">X-Ray_Report.pdf</span>
                          </div>
                          <span className="text-xs text-gray-500">1.8 MB</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecord;
