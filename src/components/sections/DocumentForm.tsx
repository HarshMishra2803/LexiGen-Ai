import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { DocumentType } from "@/constants";

interface DocumentFormProps {
  selectedDoc: DocumentType;
  onBack: () => void;
  onGenerate: () => void;
  formData: Record<string, string>;
  onInputChange: (name: string, value: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  errors: Record<string, string>;
  isGenerating: boolean;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({
  selectedDoc,
  onBack,
  onGenerate,
  formData,
  onInputChange,
  language,
  onLanguageChange,
  errors,
  isGenerating
}) => {
  return (
    <motion.div
      key="form"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-3xl mx-auto py-24"
    >
      <Card className="border-slate-200 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
        <CardHeader className="p-10 pb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="w-fit mb-6 font-medium hover:bg-brand-green/10 rounded-full">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Templates
          </Button>
          <CardTitle className="text-3xl font-semibold text-slate-900 tracking-tight">{selectedDoc.title}</CardTitle>
          <CardDescription className="text-base text-slate-500 mt-2">Fill in the details below to generate your custom document.</CardDescription>
        </CardHeader>
        <CardContent className="p-10 pt-0 space-y-8">
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-slate-700 uppercase tracking-widest ml-1">
              Document Language
            </Label>
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="h-12 rounded-2xl border-slate-200 focus:ring-brand-green bg-white/50">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <SelectValue placeholder="Select Language" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi (हिन्दी)</SelectItem>
                <SelectItem value="Spanish">Spanish (Español)</SelectItem>
                <SelectItem value="French">French (Français)</SelectItem>
                <SelectItem value="German">German (Deutsch)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {selectedDoc.fields.map((field) => (
              <div key={field.name} className={field.type === "textarea" ? "md:col-span-2 space-y-3" : "space-y-3"}>
                <Label className="text-xs font-semibold text-slate-700 uppercase tracking-widest ml-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </Label>
                {field.type === "textarea" ? (
                  <Textarea
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => onInputChange(field.name, e.target.value)}
                    className={`min-h-[120px] rounded-2xl border-slate-200 focus-visible:ring-brand-green bg-white/50 ${errors[field.name] ? 'border-red-500' : ''}`}
                  />
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => onInputChange(field.name, e.target.value)}
                    className={`h-12 rounded-2xl border-slate-200 focus-visible:ring-brand-green bg-white/50 ${errors[field.name] ? 'border-red-500' : ''}`}
                  />
                )}
                {errors[field.name] && (
                  <p className="text-xs font-bold text-red-500 ml-1">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-10 pt-0">
          <Button 
            onClick={onGenerate} 
            disabled={isGenerating}
            className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-lg font-medium shadow-sm group"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" /> Generating Document...
              </>
            ) : (
              <>
                <Zap className="mr-3 h-5 w-5 fill-current group-hover:scale-110 transition-transform" /> Generate Professional Document
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
