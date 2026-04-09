import React from "react";
import { motion } from "motion/react";
import { ChevronRight, ShieldCheck, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="pt-24 pb-24 relative overflow-hidden min-h-[85vh] flex flex-col justify-center bg-grid-slate-200">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-cream via-transparent to-brand-cream pointer-events-none" />
      {/* Background Animated Shapes */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 -left-20 w-[40rem] h-[40rem] bg-brand-green/10 rounded-full blur-[120px] opacity-40"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          x: [0, -50, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 -right-20 w-[50rem] h-[50rem] bg-brand-green/10 rounded-full blur-[150px] opacity-40"
      />

      <div className="container mx-auto px-4 text-center space-y-12 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <Badge className="mb-6 px-3 py-1 bg-slate-100 text-slate-600 border-slate-200 font-medium text-xs rounded-full">
            Next-Gen Legal Automation
          </Badge>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-tight mb-6"
          >
            Legal Docs <br />
            <span className="text-brand-green-dark">Redefined.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            The world's most advanced AI for generating iron-clad contracts, 
            NDAs, and legal agreements. Built for the modern workspace.
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button size="lg" onClick={onStart} className="h-12 px-8 text-base bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full shadow-sm group">
            Start Generating Now
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
             <span>No credit card required</span>
             <div className="w-1 h-1 rounded-full bg-slate-300" />
             <span>Instant PDF download</span>
          </div>
        </motion.div>

        {/* Visual Preview */}
        <motion.div 
          className="pt-12 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card rounded-[2rem] p-8 shadow-xl relative overflow-hidden border-white/40"
            >
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                 <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <Badge className="bg-brand-green/10 text-brand-green-dark border-none font-black text-[9px] uppercase tracking-widest">Drafting...</Badge>
                  <h4 className="font-black text-xl font-display">Freelance Contract</h4>
                </div>
                <div className="h-1.5 w-1/3 bg-slate-200 rounded-full" />
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                  <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                  <div className="h-1.5 w-2/3 bg-slate-100 rounded-full" />
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-1.5 w-1/4 bg-slate-100 rounded-full" />
                    <div className="h-1.5 w-1/2 bg-slate-100 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-brand-green/10 rounded-full blur-3xl" />
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card rounded-[2rem] p-8 shadow-xl border-brand-green/20 bg-white/80"
            >
               <div className="flex items-center justify-between mb-6">
                  <Badge className="bg-brand-green/10 text-brand-green-dark border-none font-black text-[9px] uppercase tracking-widest">✨ AI Verified</Badge>
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-brand-green-dark" />
                  </div>
               </div>
               <div className="space-y-4 text-left">
                <h4 className="font-black text-xl font-display">Non-Disclosure Agreement</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(74,222,128,0.4)]" />
                     <div className="h-1.5 w-3/4 bg-slate-200 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(74,222,128,0.4)]" />
                     <div className="h-1.5 w-1/2 bg-slate-200 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(74,222,128,0.4)]" />
                     <div className="h-1.5 w-2/3 bg-slate-200 rounded-full" />
                  </div>
                </div>
                <div className="pt-4">
                  <div className="h-8 w-24 bg-brand-green/10 rounded-lg border border-brand-green/20 flex items-center justify-center text-[9px] font-black tracking-widest text-brand-green-dark">
                    CERTIFIED
                  </div>
                </div>
               </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
