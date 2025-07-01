
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  specialty: string;
  time: string;
  status: string;
  avatar: string;
}

interface PatientQueueProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
}

const PatientQueue = ({ patients, onSelectPatient }: PatientQueueProps) => {
  return (
    <Card className="border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-semibold text-gray-800">Patient Queue</span>
          <span className="text-sm text-gray-500">Today's Schedule</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {patients.map((patient) => (
            <div 
              key={patient.id}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl hover:shadow-md transition-all cursor-pointer border border-purple-100"
              onClick={() => onSelectPatient(patient)}
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
  );
};

export default PatientQueue;
