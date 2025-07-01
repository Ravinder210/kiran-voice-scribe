
import React, { useState } from 'react';
import { Mic, Users, FileText, Pill, History, Paperclip, ChevronRight, Search, Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PatientQueue from '@/components/PatientQueue';
import PatientRecord from '@/components/PatientRecord';

const Index = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const todaysPatients = [
    {
      id: 1,
      name: "Benjamin Frank",
      specialty: "General doctor",
      time: "2 mins",
      status: "waiting",
      avatar: "👨‍⚕️"
    },
    {
      id: 2,
      name: "Lica Fitcher",
      specialty: "Urologist specialist",
      time: "10 mins",
      status: "waiting",
      avatar: "👩‍⚕️"
    },
    {
      id: 3,
      name: "Jonathon",
      specialty: "Cardiologist",
      time: "5 mins",
      status: "in-progress",
      avatar: "👨‍⚕️"
    },
    {
      id: 4,
      name: "Jamil Sheikh",
      specialty: "Neurologist",
      time: "15 mins",
      status: "completed",
      avatar: "👨‍⚕️"
    }
  ];

  if (selectedPatient) {
    return <PatientRecord patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Kiran
                </h1>
              </div>
              <span className="text-sm text-purple-600 font-medium">Ray of Hope</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search patients..." 
                  className="pl-10 w-64 border-purple-200 focus:border-purple-400"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Dr. Sazidur Rahman</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">Good Morning, Doctor!</h2>
              <p className="text-purple-100 mb-6">Ready to bring hope and healing to your patients today</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>8 patients today</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mic className="w-5 h-5" />
                  <span>Voice-enabled consultations</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 translate-x-16"></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Patients</p>
                  <p className="text-2xl font-bold text-purple-600">8</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Consultations</p>
                  <p className="text-2xl font-bold text-blue-600">5</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Prescriptions</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <Pill className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Voice Notes</p>
                  <p className="text-2xl font-bold text-orange-600">15</p>
                </div>
                <Mic className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-gray-800">Patient Queue</span>
                  <span className="text-sm text-gray-500">Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysPatients.map((patient) => (
                    <div 
                      key={patient.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl hover:shadow-md transition-all cursor-pointer border border-purple-100"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xl">
                          {patient.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                          <p className="text-sm text-gray-600">{patient.specialty}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              patient.status === 'waiting' ? 'bg-yellow-100 text-yellow-700' :
                              patient.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {patient.status.replace('-', ' ')}
                            </span>
                            <span className="text-xs text-gray-500">{patient.time}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Voice Assistant Card */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-500 to-blue-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Mic className="w-6 h-6" />
                  <h3 className="font-semibold">Voice Assistant</h3>
                </div>
                <p className="text-purple-100 mb-4">Start voice-enabled consultation for faster, more accurate patient records.</p>
                <Button variant="secondary" className="w-full">
                  Start Voice Session
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  New Clinical Note
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Pill className="w-4 h-4 mr-2" />
                  Create Prescription
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <History className="w-4 h-4 mr-2" />
                  View Patient History
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
