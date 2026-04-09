import React from "react";
import { motion } from "motion/react";
import { FileText, ShieldCheck, Zap, Download, Users, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ProjectShowcase: React.FC = () => {
  const steps = [
    {
      title: "Select Template",
      desc: "Choose from 50+ professionally drafted legal templates.",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "AI Generation",
      desc: "Our Gemini-powered AI drafts your document in seconds.",
      icon: Zap,
      color: "bg-yellow-500",
    },
    {
      title: "Legal Verification",
      desc: "Automated checks ensure compliance and accuracy.",
      icon: ShieldCheck,
      color: "bg-green-500",
    },
    {
      title: "Instant Export",
      desc: "Download as a high-quality PDF ready for signing.",
      icon: Download,
      color: "bg-purple-500",
    }
  ];

  return (
    <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-green to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-green to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20 font-medium px-3 py-1 rounded-full uppercase tracking-widest text-[10px]">
              The Workflow
            </Badge>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              A complete <span className="text-brand-green">workspace</span> for your legal needs.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              LexiGen isn't just a generator. It's a comprehensive platform to manage, 
              draft, and verify your legal documents with the power of advanced AI.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 group"
                >
                  <div className={`w-10 h-10 shrink-0 rounded-xl ${step.color}/20 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <step.icon className={`w-5 h-5 text-white`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base mb-1">{step.title}</h4>
                    <p className="text-sm text-slate-500 leading-snug">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Mock Workspace UI */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative z-20 bg-slate-800 rounded-[3rem] border border-slate-700 shadow-2xl overflow-hidden aspect-[4/3] lg:aspect-square"
            >
              <div className="h-12 bg-slate-900 flex items-center px-6 gap-2 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                </div>
                <div className="mx-auto bg-slate-800 px-4 py-1 rounded-full text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                  LexiGen Workspace v2.0
                </div>
              </div>
              
              <div className="flex h-full">
                <div className="w-20 border-r border-slate-700 flex flex-col items-center py-8 gap-8">
                   <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shadow-lg shadow-brand-green/20">
                     <FileText className="text-slate-900 w-5 h-5" />
                   </div>
                   <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-400 transition-colors">
                     <Users className="w-5 h-5" />
                   </div>
                   <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-400 transition-colors">
                     <Briefcase className="w-5 h-5" />
                   </div>
                </div>
                
                <div className="flex-1 p-8 space-y-8">
                   <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">Active Projects</h3>
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">3 Documents in progress</p>
                      </div>
                      <div className="flex -space-x-2">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700" />
                         ))}
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      {[
                        { name: "NDA_Final_Draft.pdf", status: "Verified", progress: 100 },
                        { name: "Freelance_Agreement.docx", status: "Drafting", progress: 65 },
                        { name: "Terms_of_Service.pdf", status: "Reviewing", progress: 40 }
                      ].map((doc, i) => (
                        <div key={i} className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50 flex items-center gap-4">
                           <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                             <FileText className="w-5 h-5 text-slate-400" />
                           </div>
                           <div className="flex-1">
                              <div className="flex justify-between mb-1.5">
                                <span className="text-sm font-medium">{doc.name}</span>
                                <span className="text-[10px] font-semibold uppercase text-brand-green">{doc.status}</span>
                              </div>
                              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                 <motion.div 
                                   initial={{ width: 0 }}
                                   whileInView={{ width: `${doc.progress}%` }}
                                   transition={{ delay: 1 + (i * 0.2), duration: 1 }}
                                   className="h-full bg-brand-green" 
                                 />
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-green/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-green/10 rounded-full blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
};
