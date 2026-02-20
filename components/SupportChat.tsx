"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { MessageSquare, X, Send, Headset, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import apiAxios from "@/lib/apiAxios";

export default function SupportChat() {
  const { data: user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email! }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await apiAxios.post("/support/ticket", formData);
      if (res.data.success) {
        setIsSent(true);
        toast.success("Support ticket sent successfully!");
        setFormData({ ...formData, subject: "", message: "" });
        setTimeout(() => {
          setIsSent(false);
          setIsOpen(false);
        }, 3000);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.errors?.root?.message || "Failed to send support ticket";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans pointer-events-none">
      {/* Chat Window */}
      <div
        className={cn(
          "w-[350px] max-w-[90vw] overflow-hidden transition-all duration-500 ease-out origin-bottom-right",
          isOpen 
            ? "translate-y-0 opacity-100 scale-100 pointer-events-auto" 
            : "translate-y-12 opacity-0 scale-90 pointer-events-none"
        )}
      >
        <div className="bg-card/40 backdrop-blur-xl border border-border/20 rounded-3xl shadow-2xl shadow-secondary/5 overflow-hidden ring-1 ring-secondary/20">
          {/* Header */}
          <div className="bg-linear-to-r from-secondary/20 to-secondary/10 p-6 flex items-center justify-between border-b border-border/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20">
                <Headset size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-foreground tracking-tight">GG Support</span>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Always Online</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-1">Email Address</label>
                  <Input 
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="bg-background/40 border-border/50 text-xs h-11 rounded-xl"
                    disabled={Boolean(user?.email)}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-1">Subject</label>
                  <Input 
                    required
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                    className="bg-background/40 border-border/50 text-xs h-11 rounded-xl focus-visible:ring-secondary/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-1">Message</label>
                  <Textarea 
                    required
                    placeholder="Tell us more about your request..."
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="bg-background/40 border-border/50 text-xs min-h-[120px] rounded-xl focus-visible:ring-secondary/50 resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-secondary/10 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                       <span className="animate-spin h-4 w-4 border-2 border-secondary-foreground border-t-transparent rounded-full" />
                       Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                       <Send size={16} />
                       Send Request
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <div className="py-12 flex flex-col items-center text-center space-y-4 animate-fade-up">
                 <div className="p-4 rounded-full bg-emerald-500/20 text-emerald-500 shadow-inner">
                   <CheckCircle2 size={40} />
                 </div>
                 <div className="space-y-2">
                   <h3 className="font-black text-foreground tracking-tight">Request Received!</h3>
                   <p className="text-xs text-muted-foreground leading-relaxed px-4">
                     We've received your ticket. Our team will get back to you via email shortly.
                   </p>
                 </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-white/5 border-t border-border/10 text-center">
             <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest leading-none">
               Response time: Less than 12 hours
             </p>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90 group relative overflow-hidden pointer-events-auto",
          isOpen 
            ? "bg-muted text-foreground" 
            : "bg-secondary text-secondary-foreground hover:shadow-secondary/30 hover:-translate-y-1"
        )}
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent pointer-events-none" />
        {isOpen ? (
          <X size={24} className="relative z-10 transition-transform duration-500 rotate-0" />
        ) : (
          <MessageSquare size={24} className="relative z-10 transition-transform duration-500 group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}
