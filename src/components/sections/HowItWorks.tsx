import React from "react";
import { motion } from "motion/react";
import { FileSearch, PenTool, ShieldCheck, Download } from "lucide-react";

const steps = [
  {
    icon: FileSearch,
    title: "Select Template",
    description: "Choose from our library of professionally vetted legal templates tailored for your specific needs.",
    color: "bg-blue-500"
  },
  {
    icon: PenTool,
    title: "Fill Details",
    description: "Provide the necessary information through our intuitive, guided form. Our AI handles the complexity.",
    color: "bg-brand-green"
  },
  {
    icon: ShieldCheck,
    title: "AI Generation",
    description: "Our advanced Gemini AI generates a comprehensive, iron-clad legal document in seconds.",
    color: "bg-purple-500"
  },
  {
    icon: Download,
    title: "Download & Sign",
    description: "Review your document, add your digital signature, and download as a professional PDF.",
    color: "bg-orange-500"
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
          >
            How it <span className="text-brand-green-dark">Works</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500"
          >
            A seamless, 4-step process to get your legal documents ready in minutes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-slate-100 -translate-x-1/2 z-0" />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className={`w-24 h-24 ${step.color} rounded-3xl flex items-center justify-center shadow-xl shadow-${step.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
