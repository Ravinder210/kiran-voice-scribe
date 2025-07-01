
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface PatientInfoProps {
  patient: any;
}

const PatientInfo = ({ patient }: PatientInfoProps) => {
  return (
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
  );
};

export default PatientInfo;
