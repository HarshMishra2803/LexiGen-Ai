import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogIn, LogOut, History, Plus, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { User } from "firebase/auth";

interface NavbarProps {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onNavigate: (step: any) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  onSignIn, 
  onSignOut, 
  onNavigate,
  isMenuOpen,
  setIsMenuOpen
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate("landing")}
        >
          <div className="w-8 h-8 bg-brand-green-dark rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-sm">
            <Globe className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-slate-900">LexiGen <span className="text-brand-green-dark">AI</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => onNavigate("landing")} className="text-sm font-medium text-slate-600 hover:text-brand-green-dark transition-colors">Home</button>
          <button onClick={() => onNavigate("select")} className="text-sm font-medium text-slate-600 hover:text-brand-green-dark transition-colors">Templates</button>
          {user && (
            <button onClick={() => onNavigate("history")} className="text-sm font-medium text-slate-600 hover:text-brand-green-dark transition-colors">History</button>
          )}
          
          <div className="h-6 w-px bg-slate-200 mx-2" />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="relative h-10 w-10 rounded-full p-0 hover:bg-brand-green/10 flex items-center justify-center outline-none transition-all duration-300 hover:scale-105">
                <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                  <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                  <AvatarFallback className="bg-brand-green/20 text-brand-green-dark font-bold">
                    {user.displayName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-2xl p-2 mt-2" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-display font-bold px-3 py-2">My Account</DropdownMenuLabel>
                  <div className="px-3 py-2 mb-2">
                    <p className="text-xs font-medium text-slate-500 truncate">{user.email}</p>
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => onNavigate("history")} className="rounded-xl gap-2 cursor-pointer">
                    <History className="w-4 h-4" /> History
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate("select")} className="rounded-xl gap-2 cursor-pointer">
                    <Plus className="w-4 h-4" /> New Document
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={onSignOut} className="rounded-xl gap-2 text-red-600 focus:text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={onSignIn}
                className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-8 h-11 font-semibold shadow-lg shadow-slate-200/50 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <LogIn className="mr-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /> 
                  Sign In
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <button onClick={() => { onNavigate("landing"); setIsMenuOpen(false); }} className="block w-full text-left text-lg font-bold text-slate-600">Home</button>
              <button onClick={() => { onNavigate("select"); setIsMenuOpen(false); }} className="block w-full text-left text-lg font-bold text-slate-600">Templates</button>
              {user && (
                <button onClick={() => { onNavigate("history"); setIsMenuOpen(false); }} className="block w-full text-left text-lg font-bold text-slate-600">History</button>
              )}
              <div className="pt-4">
                {user ? (
                  <Button onClick={onSignOut} variant="destructive" className="w-full rounded-full font-bold">Sign Out</Button>
                ) : (
                  <Button onClick={onSignIn} className="w-full bg-slate-900 text-white rounded-full font-bold">Sign In</Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
