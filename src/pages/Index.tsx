
import React, { useState } from 'react';
import { Mic, Users, FileText, Pill, History, Paperclip, ChevronRight, Search, Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PatientQueue from '@/components/PatientQueue';
import PatientRecord from '@/components/PatientRecord';
import ThemeToggle from '@/components/ThemeToggle';

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
                </div>
                <h1 className="text-2xl font-bold text-primary">
                  Kiran
                </h1>
              </div>
              <span className="hidden md:inline text-sm text-primary/70 font-medium">Ray of Hope</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search patients..." 
                  className="pl-10 w-64 border-border focus:border-primary bg-card/50"
                />
              </div>
              <ThemeToggle />
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="hidden sm:inline text-sm font-medium text-foreground">Dr. Sazidur Rahman</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 sm:p-8 text-primary-foreground relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Good Morning, Doctor!</h2>
              <p className="text-primary-foreground/80 mb-4 sm:mb-6 text-sm sm:text-base">Ready to bring hope and healing to your patients today</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">8 patients today</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Voice-enabled consultations</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-foreground/5 rounded-full translate-y-16 translate-x-16"></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="border-border hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Today's Patients</p>
                  <p className="text-xl sm:text-2xl font-bold text-primary">8</p>
                </div>
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Consultations</p>
                  <p className="text-xl sm:text-2xl font-bold text-primary">5</p>
                </div>
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Prescriptions</p>
                  <p className="text-xl sm:text-2xl font-bold text-primary">12</p>
                </div>
                <Pill className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Voice Notes</p>
                  <p className="text-xl sm:text-2xl font-bold text-primary">15</p>
                </div>
                <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg sm:text-xl font-semibold text-card-foreground">Patient Queue</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysPatients.map((patient) => (
                    <div 
                      key={patient.id}
                      className="flex items-center justify-between p-3 sm:p-4 bg-accent/30 rounded-xl hover:shadow-md transition-all cursor-pointer border border-border"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-lg sm:text-xl">
                          {patient.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-card-foreground text-sm sm:text-base">{patient.name}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{patient.specialty}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              patient.status === 'waiting' ? 'bg-secondary text-secondary-foreground' :
                              patient.status === 'in-progress' ? 'bg-primary/20 text-primary' :
                              'bg-accent text-accent-foreground'
                            }`}>
                              {patient.status.replace('-', ' ')}
                            </span>
                            <span className="text-xs text-muted-foreground">{patient.time}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Voice Assistant Card */}
            <Card className="border-border bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                  <h3 className="font-semibold text-sm sm:text-base">Voice Assistant</h3>
                </div>
                <p className="text-primary-foreground/80 mb-4 text-xs sm:text-sm">Start voice-enabled consultation for faster, more accurate patient records.</p>
                <Button variant="secondary" className="w-full text-sm">
                  Start Voice Session
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg text-card-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-xs sm:text-sm border-border hover:bg-accent/30" size="sm">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  New Clinical Note
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs sm:text-sm border-border hover:bg-accent/30" size="sm">
                  <Pill className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Create Prescription
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs sm:text-sm border-border hover:bg-accent/30" size="sm">
                  <History className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  View Patient History
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs sm:text-sm border-border hover:bg-accent/30" size="sm">
                  <Paperclip className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
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
