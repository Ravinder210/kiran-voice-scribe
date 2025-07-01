
import React from 'react';
import { Mic } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PrescriptionFormProps {
  prescriptionText: string;
  setPrescriptionText: (text: string) => void;
}

const PrescriptionForm = ({ prescriptionText, setPrescriptionText }: PrescriptionFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 mb-4">
        <span className="text-base sm:text-lg text-card-foreground font-semibold">Create Prescription</span>
        <Button variant="outline" size="sm" onClick={() => {}} className="text-xs sm:text-sm border-primary text-primary hover:bg-primary/10">
          <Mic className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Dictate Prescription
        </Button>
      </div>

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
  );
};

export default PrescriptionForm;
