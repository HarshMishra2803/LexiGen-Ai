import React from "react";
import { motion } from "motion/react";
import { Search, X, Filter, Check, ArrowUpDown, Calendar, Plus, Download, Trash2, FileText, ShieldCheck, Home, Briefcase, Users, History as HistoryIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DOCUMENT_TYPES } from "@/constants";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, any> = {
  ShieldCheck,
  FileText,
  Home,
  Briefcase,
  Users,
};

interface DocumentHistoryProps {
  history: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterTypes: string[];
  setFilterTypes: (types: string[] | ((prev: string[]) => string[])) => void;
  sortBy: "newest" | "oldest" | "title";
  setSortBy: (sort: "newest" | "oldest" | "title") => void;
  onView: (doc: any) => void;
  onDownload: (content: string, title: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

export const DocumentHistory: React.FC<DocumentHistoryProps> = ({
  history,
  searchQuery,
  setSearchQuery,
  filterTypes,
  setFilterTypes,
  sortBy,
  setSortBy,
  onView,
  onDownload,
  onDelete,
  onNew
}) => {
  const filteredHistory = history
    .filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterTypes.length === 0 || filterTypes.includes(doc.type);
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.createdAt?.toMillis() - a.createdAt?.toMillis();
      if (sortBy === "oldest") return a.createdAt?.toMillis() - b.createdAt?.toMillis();
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <motion.div
      key="history"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto space-y-8 py-24"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Your History</h2>
          <p className="text-slate-500">Access all your previously generated legal documents.</p>
        </div>
        <Button onClick={onNew} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> New Document
        </Button>
      </div>

      {history.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 items-center bg-white/40 backdrop-blur-md p-4 rounded-[2rem] border border-slate-200/50">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search documents by title or keyword" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white/50 border-slate-200 rounded-2xl focus-visible:ring-brand-green"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-2xl border-slate-200 bg-white/50 font-bold gap-2 flex-1 md:flex-none px-4")}>
                <Filter className="w-4 h-4" />
                {filterTypes.length === 0 ? "All Types" : filterTypes.length === 1 ? DOCUMENT_TYPES.find(t => t.id === filterTypes[0])?.title : `${filterTypes.length} Types`}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex items-center justify-between">
                    Filter by Type
                    {filterTypes.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFilterTypes([]);
                        }}
                        className="h-auto p-0 text-xs text-brand-green-dark hover:bg-transparent"
                      >
                        Clear
                      </Button>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {DOCUMENT_TYPES.map(type => (
                    <DropdownMenuItem 
                      key={type.id} 
                      onSelect={(e) => {
                        e.preventDefault();
                        setFilterTypes(prev => 
                          prev.includes(type.id) 
                            ? prev.filter(id => id !== type.id)
                            : [...prev, type.id]
                        );
                      }} 
                      className="rounded-xl flex items-center justify-between cursor-pointer"
                    >
                      {type.title}
                      {filterTypes.includes(type.id) && (
                        <Check className="w-4 h-4 text-brand-green-dark" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-2xl border-slate-200 bg-white/50 font-bold gap-2 flex-1 md:flex-none px-4")}>
                <ArrowUpDown className="w-4 h-4" />
                Sort
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortBy("newest")} className="rounded-xl gap-2 cursor-pointer">
                    <Calendar className="w-4 h-4" /> Newest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("oldest")} className="rounded-xl gap-2 cursor-pointer">
                    <Calendar className="w-4 h-4" /> Oldest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("title")} className="rounded-xl gap-2 cursor-pointer">
                    <FileText className="w-4 h-4" /> Alphabetical
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {filteredHistory.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredHistory.map((doc) => {
            const Icon = ICON_MAP[DOCUMENT_TYPES.find(t => t.id === doc.type)?.icon || "FileText"];
            return (
              <motion.div
                key={doc.id}
                whileHover={{ scale: 1.01, x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card className="hover:shadow-md transition-all border-slate-200 rounded-3xl overflow-hidden group bg-white/60 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center p-6 gap-6">
                    <div className="p-4 bg-slate-100 rounded-2xl group-hover:bg-brand-green/10 transition-all duration-300">
                      <Icon className="w-6 h-6 text-slate-700 group-hover:text-brand-green-dark transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-[10px] uppercase tracking-wider font-medium">
                          {DOCUMENT_TYPES.find(t => t.id === doc.type)?.title}
                        </Badge>
                      </div>
                      <h4 className="text-lg font-semibold truncate text-slate-900 tracking-tight">{doc.title}</h4>
                      <p className="text-sm text-slate-500">
                        Generated on {doc.createdAt?.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tooltip>
                        <TooltipTrigger 
                          onClick={() => onView(doc)} 
                          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full font-bold border-slate-200 hover:bg-slate-50")}
                        >
                          View Document
                        </TooltipTrigger>
                        <TooltipContent>Open document for viewing</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger 
                          onClick={() => onDownload(doc.content, doc.title)} 
                          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full w-12 h-12 hover:bg-brand-green/10 text-brand-green-dark")}
                        >
                          <Download className="w-5 h-5" />
                        </TooltipTrigger>
                        <TooltipContent>Download as professional PDF</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger 
                          onClick={() => onDelete(doc.id)} 
                          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full w-12 h-12 hover:bg-red-50 text-red-600")}
                        >
                          <Trash2 className="w-5 h-5" />
                        </TooltipTrigger>
                        <TooltipContent>Delete document history</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card className="p-20 text-center border-dashed border-slate-200 rounded-[3rem] bg-white/40 backdrop-blur-sm">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
              <HistoryIcon className="w-12 h-12 text-slate-300" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">No documents found</h3>
              <p className="text-slate-500 font-medium">
                {history.length === 0 
                  ? "You haven't generated any documents yet. Start by choosing a template!" 
                  : "No documents match your current search or filter criteria."}
              </p>
            </div>
            <div className="pt-4">
              {history.length === 0 ? (
                <Button onClick={onNew} className="bg-brand-green-dark hover:bg-brand-green-dark/90 text-white rounded-full px-8 font-bold shadow-lg shadow-brand-green/20">
                  Create Document
                </Button>
              ) : (
                <Button variant="outline" onClick={() => { setSearchQuery(""); setFilterTypes([]); }} className="rounded-full w-full font-bold">
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
};
