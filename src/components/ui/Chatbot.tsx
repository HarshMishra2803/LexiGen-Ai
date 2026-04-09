import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your LexiGen AI assistant. How can I help you with your legal documents today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    
    // Small timeout to ensure DOM has updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Map messages to Gemini history format
      const history = messages.map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process chat");
      }

      const data = await response.json();
      const assistantMessage: Message = { role: "assistant", content: data.text || "I'm sorry, I couldn't process that request." };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? "80px" : "500px",
              width: "380px"
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col mb-4"
          >
            {/* Header */}
            <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">LexiGen Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 bg-slate-50 overflow-y-auto scroll-smooth">
                  <div className="space-y-4">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          msg.role === "user" 
                            ? "bg-brand-green text-slate-900 rounded-tr-none" 
                            : "bg-white text-slate-700 border border-slate-200 rounded-tl-none"
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200">
                          <Loader2 className="w-4 h-4 animate-spin text-brand-green" />
                        </div>
                      </div>
                    )}
                    <div ref={scrollRef} />
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-100 bg-white">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type your message..." 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      className="rounded-full border-slate-200 focus-visible:ring-brand-green"
                    />
                    <Button 
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="rounded-full w-10 h-10 p-0 bg-slate-900 hover:bg-slate-800"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-slate-800 transition-colors relative group"
      >
        <MessageSquare className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-green rounded-full border-2 border-white" />
        <div className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1.5 rounded-xl shadow-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Need help? Chat with AI
        </div>
      </motion.button>
    </div>
  );
};
