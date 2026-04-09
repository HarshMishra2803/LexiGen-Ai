import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Download, CheckCircle2, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PenTool } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { DocumentType } from "@/constants";

interface DocumentPreviewProps {
  selectedDoc: DocumentType;
  generatedContent: string;
  onBack: () => void;
  onDownload: () => void;
  onNew: () => void;
  signatureName: string;
  onSignatureChange: (name: string) => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  selectedDoc,
  generatedContent,
  onBack,
  onDownload,
  onNew,
  signatureName,
  onSignatureChange
}) => {
  return (
    <motion.div
      key="preview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto py-24 space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Badge className="bg-slate-100 text-slate-600 border-none font-medium text-[10px] uppercase tracking-widest px-3 py-1">Success</Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Document Ready</h2>
          <p className="text-slate-500">Your {selectedDoc.title} has been generated successfully.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onNew} className="rounded-full font-medium border-slate-200">
            Create Another
          </Button>
          <Button onClick={onDownload} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
      </div>

      <Card className="border-slate-200 shadow-xl rounded-3xl overflow-hidden bg-white">
        <CardHeader className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-brand-green-dark" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold tracking-tight text-slate-900">Preview</CardTitle>
                <CardDescription className="font-medium text-sm">Professionally formatted legal document</CardDescription>
              </div>
            </div>
            <FileDown className="w-6 h-6 text-slate-300" />
          </div>
        </CardHeader>
        <CardContent className="p-10">
          <div className="markdown-body prose prose-slate max-w-none">
            <ReactMarkdown>{generatedContent}</ReactMarkdown>
          </div>

          {/* E-Sign Section */}
          <div className="mt-16 pt-12 border-t border-slate-100 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-green/10 rounded-lg flex items-center justify-center">
                <PenTool className="w-4 h-4 text-brand-green-dark" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Digital Signature</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Type your full name to sign</Label>
                <Input 
                  placeholder="Your Full Name" 
                  value={signatureName}
                  onChange={(e) => onSignatureChange(e.target.value)}
                  className="h-12 rounded-2xl border-slate-200 focus-visible:ring-brand-green bg-slate-50/50 italic font-medium"
                />
                <p className="text-[10px] text-slate-400">By typing your name, you agree that this is a legally binding digital signature.</p>
              </div>
              
              <div className="flex flex-col justify-end">
                <div className="p-6 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/30 flex flex-col items-center justify-center min-h-[100px]">
                  {signatureName ? (
                    <span className="text-3xl font-display italic text-slate-800 tracking-tight">
                      {signatureName}
                    </span>
                  ) : (
                    <span className="text-slate-300 text-sm font-medium">Signature Preview</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-10 bg-slate-50/50 border-t border-slate-100 flex justify-center italic text-slate-400 text-sm font-medium">
          This document was generated by LexiGen AI and should be reviewed by a legal professional.
        </CardFooter>
      </Card>
    </motion.div>
  );
};
