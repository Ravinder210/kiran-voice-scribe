
import React from 'react';
import { Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ClinicalNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

interface ClinicalNoteFormProps {
  clinicalNote: ClinicalNote;
  setClinicalNote: (note: ClinicalNote) => void;
}

const ClinicalNoteForm = ({ clinicalNote, setClinicalNote }: ClinicalNoteFormProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
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
  );
};

export default ClinicalNoteForm;
