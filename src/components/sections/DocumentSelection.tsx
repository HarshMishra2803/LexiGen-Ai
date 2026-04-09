import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Search, X, ChevronRight, ShieldCheck, FileText, Home, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DOCUMENT_TYPES, DocumentType } from "@/constants";

const ICON_MAP: Record<string, any> = {
  ShieldCheck,
  FileText,
  Home,
  Briefcase,
  Users,
};

interface DocumentSelectionProps {
  onBack: () => void;
  onSelect: (doc: DocumentType) => void;
  onPreview: (doc: DocumentType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const DocumentSelection: React.FC<DocumentSelectionProps> = ({
  onBack,
  onSelect,
  onPreview,
  searchQuery,
  setSearchQuery
}) => {
  const filteredDocs = DOCUMENT_TYPES.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      key="select"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-24 space-y-16"
    >
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4 font-medium hover:bg-brand-green/10 rounded-full px-6">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
        </Button>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-none">Choose a <span className="text-brand-green-dark">Template</span></h2>
        <p className="text-lg text-slate-500 font-medium">Select the type of document you need to generate. Our AI will handle the rest.</p>
      </div>

      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input 
          placeholder="Search templates..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 h-12 bg-white/50 border-slate-200 rounded-2xl focus-visible:ring-brand-green"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDocs.map((doc) => {
          const Icon = ICON_MAP[doc.icon];
          return (
            <motion.div
              key={doc.id}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
            <Card 
              className="group cursor-pointer border-slate-200 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl hover:shadow-lg hover:border-brand-green/30 transition-all duration-300 h-full flex flex-col"
              onClick={() => onPreview(doc)}
            >
              <div className="h-1 bg-brand-green-dark opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="p-8">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-6 group-hover:bg-brand-green/10 transition-all duration-300">
                  <Icon className="w-6 h-6 text-slate-700 group-hover:text-brand-green-dark transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-brand-green-dark transition-colors mb-2 tracking-tight">{doc.title}</CardTitle>
                <CardDescription className="text-slate-500 text-sm leading-relaxed">{doc.description}</CardDescription>
              </CardHeader>
              <div className="flex-1" />
              <CardFooter className="p-8 pt-0 flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="font-medium text-slate-400 hover:text-slate-900 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(doc);
                  }}
                >
                  Preview
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-sm font-semibold text-brand-green-dark opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 hover:bg-brand-green/10 rounded-full px-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(doc);
                  }}
                >
                  Use Template <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No templates found</h3>
          <p className="text-slate-500">Try adjusting your search query to find what you're looking for.</p>
          <Button variant="link" onClick={() => setSearchQuery("")} className="text-brand-green-dark font-bold">
            Clear search
          </Button>
        </div>
      )}
    </motion.div>
  );
};
