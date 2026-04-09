import React from "react";
import { motion } from "motion/react";
import { Cpu, Shield, Zap, Heart } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Advanced AI Core",
    description: "Powered by Google's Gemini 3 Flash, our engine understands legal nuances and generates contextually accurate documents in seconds."
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Your data is encrypted and stored securely. We prioritize privacy and ensure your legal drafts remain confidential."
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "No more waiting for days. Get high-quality legal templates and custom agreements instantly, tailored to your specific needs."
  },
  {
    icon: Heart,
    title: "User Centric",
    description: "Designed with simplicity in mind. Whether you're a freelancer or a small business, our platform is built to be accessible to everyone."
  }
];

export const AboutProject: React.FC = () => {
  return (
    <section className="py-32 bg-brand-cream relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green-dark text-xs font-bold uppercase tracking-widest">
              Our Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Democratizing Legal <br />
              <span className="text-brand-green-dark">Documentation for All.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              LexiGen AI was born out of a simple observation: legal services are often too expensive and slow for those who need them most. We've combined cutting-edge AI technology with professional legal standards to create a platform that empowers you to protect your interests without the heavy price tag.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="text-3xl font-black text-slate-900">99%</h4>
                <p className="text-sm text-slate-500 font-medium">Faster than traditional drafting</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-slate-900">50+</h4>
                <p className="text-sm text-slate-500 font-medium">Professional templates</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-green/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-green/10 rounded-full blur-[120px] opacity-50" />
    </section>
  );
};
