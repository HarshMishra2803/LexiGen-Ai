import React from "react";
import { motion } from "motion/react";
import { Clock, ZapIcon, FileText, History, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Features: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: "Instant Turnaround",
      desc: "Stop waiting days for drafts. Generate professional contracts, NDAs, and more in under 30 seconds.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: ZapIcon,
      title: "Real-time Streaming",
      desc: "Watch your document being drafted in real-time. No more staring at a loading spinner for minutes.",
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: FileText,
      title: "Professional Exports",
      desc: "Download your documents in high-quality, professionally formatted PDF templates ready for signing.",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: History,
      title: "Smart History",
      desc: "Manage all your documents in one place with advanced sorting, filtering, and search capabilities.",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-green-dark/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
            Everything you need to <span className="text-brand-green-dark">scale safely.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Powerful features designed for the modern legal landscape, ensuring your business stays protected and efficient.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-8 h-full rounded-[2rem] border-slate-100 hover:border-brand-green/30 hover:shadow-2xl hover:shadow-brand-green/5 transition-all duration-500 bg-white group">
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
