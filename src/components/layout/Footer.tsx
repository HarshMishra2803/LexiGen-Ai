import React from "react";
import { Globe, Twitter, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-green-dark rounded-lg flex items-center justify-center shadow-lg shadow-brand-green/10">
                <Globe className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">LexiGen <span className="text-brand-green-dark">AI</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Revolutionizing legal documentation with state-of-the-art AI. 
              Professional, secure, and accessible.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -2, color: "#4ADE80" }}
                  className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center transition-colors hover:bg-slate-800"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3 text-sm">
              {["Templates", "Custom AI", "API Access", "Enterprise", "Security"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-brand-green transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR Compliance", "Disclaimer"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-brand-green transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {currentYear} LexiGen AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Status</a>
            <a href="#" className="hover:text-white transition-colors">Changelog</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
