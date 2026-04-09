import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

// Layout & UI
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Chatbot } from "@/components/ui/Chatbot";

// Sections
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AboutProject } from "@/components/sections/AboutProject";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { DocumentSelection } from "@/components/sections/DocumentSelection";
import { DocumentForm } from "@/components/sections/DocumentForm";
import { DocumentPreview } from "@/components/sections/DocumentPreview";
import { DocumentHistory } from "@/components/sections/DocumentHistory";
import { HistoryViewModal } from "@/components/sections/HistoryViewModal";

// Constants & Types
import { DOCUMENT_TYPES, DocumentType } from "./constants";
import { AppStep } from "./types";

// Services
import { generateLegalDocument } from "./services/gemini";
import { auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User, handleFirestoreError, OperationType } from "./lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState<AppStep>("landing");
  const [selectedDoc, setSelectedDoc] = useState<DocumentType | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [templateSearchQuery, setTemplateSearchQuery] = useState("");
  const [language, setLanguage] = useState("English");
  const [signatureName, setSignatureName] = useState("");
  
  // Modals
  const [viewingHistoryDoc, setViewingHistoryDoc] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const path = `users/${user.uid}/documents`;
        const q = query(
          collection(db, "users", user.uid, "documents"),
          orderBy("createdAt", "desc")
        );
        const unsubHistory = onSnapshot(q, (snapshot) => {
          setHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }, (error) => {
          handleFirestoreError(error, OperationType.LIST, path);
        });
        return () => unsubHistory();
      } else {
        setHistory([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in successfully!");
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Failed to sign in.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setStep("landing");
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out.");
    }
  };

  const handleSelectDoc = (doc: DocumentType) => {
    setSelectedDoc(doc);
    setFormData({});
    setErrors({});
    setStep("form");
  };

  const validateField = (name: string, value: string, field: any) => {
    let error = "";
    if (field.required && !value.trim()) {
      error = `${field.label} is required`;
    } else if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email address";
      }
    }
    return error;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (selectedDoc) {
      const field = selectedDoc.fields.find(f => f.name === name);
      if (field) {
        const error = validateField(name, value, field);
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    }
  };

  const handleGenerate = async () => {
    if (!selectedDoc) return;

    const newErrors: Record<string, string> = {};
    selectedDoc.fields.forEach(field => {
      const value = formData[field.name] || "";
      const error = validateField(field.name, value, field);
      if (error) newErrors[field.name] = error;
    });

    if (Object.values(newErrors).some(e => e)) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent("");
    setSignatureName("");
    setStep("preview");

    try {
      const content = await generateLegalDocument(selectedDoc.title, formData, (chunk) => {
        setGeneratedContent(chunk);
      }, language);
      
      if (user) {
        const path = `users/${user.uid}/documents`;
        try {
          await addDoc(collection(db, "users", user.uid, "documents"), {
            userId: user.uid,
            type: selectedDoc.id,
            title: selectedDoc.title,
            content: content,
            formData: formData,
            createdAt: serverTimestamp()
          });
          toast.success("Document saved to history!");
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, path);
        }
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate document.");
      setStep("form");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = async (content: string, title: string) => {
    const toastId = toast.loading("Preparing professional PDF...");
    
    try {
      // Create a hidden container for PDF rendering
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "800px";
      container.style.backgroundColor = "white";
      container.style.color = "#0f172a";
      container.style.padding = "60px";
      container.style.lineHeight = "1.6";

      // Include fonts for Hindi support
      const fontLink = document.createElement("link");
      fontLink.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&family=Inter:wght@400;700&display=swap";
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);

      container.style.fontFamily = "'Inter', 'Noto Sans Devanagari', sans-serif";

      // Professional Header
      const header = `
        <div style="border-bottom: 3px solid #1e293b; padding-bottom: 25px; margin-bottom: 45px; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="width: 50px; height: 50px; background-color: #0f172a; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #4ade80; font-size: 24px; font-weight: bold;">L</div>
            <div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 800; color: #0f172a; letter-spacing: -1px;">LEXIGEN AI</h1>
              <p style="margin: 0; font-size: 10px; color: #64748b; letter-spacing: 3px; font-weight: bold; text-transform: uppercase;">Professional Legal Documentation</p>
            </div>
          </div>
          <div style="text-align: right; font-size: 10px; color: #64748b; font-weight: 500;">
            <p style="margin: 0;">REF: LXG-${Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
            <p style="margin: 3px 0;">DATE: ${new Date().toLocaleDateString()}</p>
            <p style="margin: 0;">LANGUAGE: ${language.toUpperCase()}</p>
          </div>
        </div>
      `;

      // Document Title
      const docTitle = `
        <div style="text-align: center; margin-bottom: 60px;">
          <h2 style="font-size: 28px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; color: #0f172a;">${title}</h2>
          <div style="width: 80px; height: 4px; background-color: #22c55e; margin: 0 auto; border-radius: 2px;"></div>
        </div>
      `;

      // Content Area - Improved for Legal Formatting and Hindi
      const cleanContent = content
        .split('\n')
        .map(line => {
          const trimmed = line.trim();
          if (!trimmed) return '';
          
          // Handle headers
          if (trimmed.startsWith('###')) {
            return `<h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 15px; font-weight: bold; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">${trimmed.replace(/^###\s*/, '').trim()}</h3>`;
          }
          if (trimmed.startsWith('##')) {
            return `<h2 style="margin-top: 25px; margin-bottom: 12px; font-size: 18px; font-weight: bold; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">${trimmed.replace(/^##\s*/, '').trim()}</h2>`;
          }
          if (trimmed.startsWith('#')) {
            return `<h1 style="margin-top: 30px; margin-bottom: 15px; font-size: 22px; font-weight: bold; color: #0f172a; text-align: center;">${trimmed.replace(/^#\s*/, '').trim()}</h1>`;
          }

          // Handle bold and italic text
          let processedLine = trimmed
            .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #0f172a; font-weight: 700;">$1</strong>')
            .replace(/__(.*?)__/g, '<strong style="color: #0f172a; font-weight: 700;">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em style="color: #475569;">$1</em>')
            .replace(/_(.*?)_/g, '<em style="color: #475569;">$1</em>');

          // Handle list items
          if (trimmed.match(/^[\-\*\+]\s/)) {
            return `<div style="margin-bottom: 10px; margin-left: 25px; font-size: 13px; color: #334155; display: flex; gap: 10px;">
              <span style="color: #22c55e;">•</span>
              <span>${processedLine.replace(/^[\-\*\+]\s/, '')}</span>
            </div>`;
          }

          // Handle numbered lists
          if (trimmed.match(/^\d+\.\s/)) {
            return `<div style="margin-bottom: 12px; font-size: 13px; color: #334155; font-weight: 500;">
              ${processedLine}
            </div>`;
          }
          
          // Regular paragraphs
          return `<p style="margin-bottom: 18px; text-align: justify; font-size: 13px; color: #334155; line-height: 1.7;">${processedLine}</p>`;
        })
        .join('');

      // Signature Section
      const signature = `
        <div style="margin-top: 100px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px;">
          <div style="position: relative;">
            <p style="font-weight: 800; margin-bottom: 50px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">EXECUTION</p>
            <div style="border-bottom: 2px solid #1e293b; margin-bottom: 12px; min-height: 60px; position: relative; display: flex; align-items: flex-end; padding-bottom: 5px;">
              ${signatureName ? `<span style="font-family: 'Brush Script MT', cursive, 'Inter'; font-size: 32px; color: #0f172a;">${signatureName}</span>` : ''}
            </div>
            <p style="font-size: 11px; font-weight: bold; color: #0f172a;">AUTHORIZED SIGNATORY</p>
            <p style="font-size: 10px; color: #64748b; margin-top: 4px;">DATED: ${new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p style="font-weight: 800; margin-bottom: 50px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">WITNESS / COUNTERPARTY</p>
            <div style="border-bottom: 2px solid #1e293b; margin-bottom: 12px; min-height: 60px;"></div>
            <p style="font-size: 11px; font-weight: bold; color: #0f172a;">AUTHORIZED SIGNATORY</p>
            <p style="font-size: 10px; color: #64748b; margin-top: 4px;">DATED: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `;

      // Footer
      const footer = `
        <div style="margin-top: 120px; border-top: 2px solid #f1f5f9; padding-top: 30px; text-align: center; font-size: 9px; color: #94a3b8; font-weight: 500;">
          <p style="margin-bottom: 8px; color: #64748b; font-weight: bold;">CONFIDENTIAL LEGAL DOCUMENT</p>
          <p style="margin-bottom: 5px;">THIS DOCUMENT IS AI-GENERATED BY LEXIGEN AI AND PROVIDED FOR INFORMATIONAL PURPOSES ONLY.</p>
          <p>LEXIGEN AI SECURE DOCUMENT | VERIFIED DIGITAL ASSET | PAGE 1 OF 1</p>
        </div>
      `;

      container.innerHTML = `
        <div style="padding: 60px; background-color: white; min-height: 100%;">
          <div style="border: 2px solid #1e293b; padding: 60px; position: relative; min-height: 1050px; background-color: white; box-shadow: inset 0 0 0 10px #f8fafc;">
            ${header}
            ${docTitle}
            <div style="position: relative; z-index: 10;">
              ${cleanContent}
            </div>
            ${signature}
            ${footer}
            
            <!-- Watermark -->
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 120px; color: rgba(241, 245, 249, 0.5); font-weight: 900; pointer-events: none; z-index: 0; white-space: nowrap; letter-spacing: 15px; text-transform: uppercase;">
              LEXIGEN AI
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(container);

      // Wait for fonts to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "white",
        windowWidth: 800,
        height: container.offsetHeight
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add the first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add subsequent pages if content overflows
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      document.body.removeChild(container);
      
      pdf.save(`${title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
      toast.dismiss(toastId);
      toast.success("Professional PDF generated successfully!");
    } catch (error) {
      console.error("PDF Error:", error);
      toast.dismiss(toastId);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const deleteHistoryDoc = async (docId: string) => {
    if (!user) return;
    
    const path = `users/${user.uid}/documents/${docId}`;
    try {
      await deleteDoc(doc(db, "users", user.uid, "documents", docId));
      toast.success("Document deleted.");
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const viewHistoryDoc = (doc: any) => {
    setViewingHistoryDoc(doc);
    setIsViewModalOpen(true);
  };

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <CustomCursor />
        <Toaster position="top-center" richColors />
        <div className="min-h-screen bg-brand-cream text-slate-900 font-sans selection:bg-brand-green/30 soft-gradient">
          <Navbar 
            user={user} 
            onSignIn={handleSignIn} 
            onSignOut={handleSignOut} 
            onNavigate={setStep}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />

          <main className="pt-20">
            <AnimatePresence mode="wait">
              {step === "landing" && (
                <div key="landing">
                  <Hero onStart={() => setStep("select")} />
                  <HowItWorks />
                  <AboutProject />
                  <ProjectShowcase />
                  <Features />
                  
                  {/* Animated Transition to Footer */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="h-px w-full bg-gradient-to-r from-transparent via-brand-green/30 to-transparent mb-20"
                  />
                </div>
              )}

              {step === "select" && (
                <DocumentSelection 
                  onBack={() => setStep("landing")}
                  onSelect={handleSelectDoc}
                  onPreview={(doc) => {
                    setSelectedDoc(doc);
                    setStep("form"); // For now, preview is just selecting
                  }}
                  searchQuery={templateSearchQuery}
                  setSearchQuery={setTemplateSearchQuery}
                />
              )}

              {step === "form" && selectedDoc && (
                <DocumentForm 
                  selectedDoc={selectedDoc}
                  onBack={() => setStep("select")}
                  onGenerate={handleGenerate}
                  formData={formData}
                  onInputChange={handleInputChange}
                  language={language}
                  onLanguageChange={setLanguage}
                  errors={errors}
                  isGenerating={isGenerating}
                />
              )}

              {step === "preview" && selectedDoc && (
                <DocumentPreview 
                  selectedDoc={selectedDoc}
                  generatedContent={generatedContent}
                  onBack={() => setStep("form")}
                  onDownload={() => downloadPDF(generatedContent, selectedDoc.title)}
                  onNew={() => setStep("select")}
                  signatureName={signatureName}
                  onSignatureChange={setSignatureName}
                />
              )}

              {step === "history" && (
                <DocumentHistory 
                  history={history}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filterTypes={filterTypes}
                  setFilterTypes={setFilterTypes}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onView={viewHistoryDoc}
                  onDownload={downloadPDF}
                  onDelete={deleteHistoryDoc}
                  onNew={() => setStep("select")}
                />
              )}
            </AnimatePresence>
          </main>

          <Footer />
          <Chatbot />
        </div>

        <HistoryViewModal 
          isOpen={isViewModalOpen}
          onOpenChange={setIsViewModalOpen}
          doc={viewingHistoryDoc}
          onDownload={downloadPDF}
        />
      </TooltipProvider>
    </ErrorBoundary>
  );
}
