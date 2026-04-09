import React from "react";
import { motion } from "motion/react";
import { Check, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individuals and small projects.",
    features: [
      "3 Documents per month",
      "Standard Templates",
      "Basic PDF Export",
      "Email Support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Professional",
    price: "$29",
    period: "/mo",
    description: "Ideal for freelancers and growing businesses.",
    features: [
      "Unlimited Documents",
      "Premium Templates",
      "Custom Branding",
      "E-Signature Support",
      "Priority AI Generation",
      "Multilingual Support"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Advanced features for large organizations.",
    features: [
      "Bulk Generation API",
      "Team Collaboration",
      "Custom Legal Review",
      "Dedicated Account Manager",
      "SSO & Advanced Security",
      "White-labeling"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export const Pricing: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
          >
            Simple, Transparent <span className="text-brand-green-dark">Pricing</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500"
          >
            Choose the plan that's right for your legal needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-[2.5rem] bg-white border ${plan.popular ? 'border-brand-green shadow-2xl scale-105 z-10' : 'border-slate-200 shadow-xl'} flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-green text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  {plan.period && <span className="text-slate-500 font-medium">{plan.period}</span>}
                </div>
                <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-brand-green" />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.popular ? "default" : "outline"}
                className={`w-full h-12 rounded-full font-bold ${plan.popular ? 'bg-brand-green hover:bg-brand-green-dark text-white' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
