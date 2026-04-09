import React from "react";
import { X, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { DOCUMENT_TYPES } from "@/constants";

interface HistoryViewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  doc: any;
  onDownload: (content: string, title: string) => void;
}

export const HistoryViewModal: React.FC<HistoryViewModalProps> = ({
  isOpen,
  onOpenChange,
  doc,
  onDownload
}) => {
  if (!doc) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col rounded-[2.5rem] border-slate-200 p-0">
        <DialogHeader className="px-8 pt-8 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-black text-slate-900">
                {doc.title}
              </DialogTitle>
              <DialogDescription className="text-slate-500 font-medium">
                Generated on {doc.createdAt?.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </DialogDescription>
            </div>
            <Badge variant="outline" className="bg-brand-green/5 text-brand-green-dark border-brand-green/20 font-black px-4 py-1.5 rounded-full">
              {DOCUMENT_TYPES.find(t => t.id === doc.type)?.title}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="px-8 py-8 space-y-10">
            {/* Form Data Summary */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h5 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Input Configuration</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {Object.entries(doc.formData).map(([key, value]: [string, any]) => (
                  <div key={key} className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-sm font-bold text-slate-700 break-words">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Content */}
            <div className="space-y-6">
              <h5 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Document Content</h5>
                <div className="bg-white border border-slate-100 rounded-3xl p-10 shadow-sm">
                  <div className="markdown-body">
                    <ReactMarkdown>
                      {doc.content}
                    </ReactMarkdown>
                  </div>
                </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-full font-bold text-slate-500 order-2 sm:order-1">
            Close
          </Button>
          <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
            <Button 
              onClick={() => onDownload(doc.content, doc.title)}
              className="bg-brand-green-dark hover:bg-brand-green-dark/90 text-white font-black rounded-full px-8 h-12 shadow-lg shadow-brand-green/20 flex-1 sm:flex-none"
            >
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
