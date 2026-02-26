import { Metadata } from "next";
import Link from "next/link";
import { IconChevronRight, IconShieldCheck } from "@tabler/icons-react";
import siteConfig from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy — GGfollows",
  description:
    "Read the Privacy Policy for GGfollows. Learn how we collect, use, and protect your information.",
  openGraph: {
    title: "Privacy Policy — GGfollows",
    description: "How we protect your data.",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "February 26, 2026";

  return (
    <div className="container mx-auto px-4 py-28 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb-like navigation */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <IconChevronRight size={14} />
          <span className="text-foreground font-medium">Privacy Policy</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-12 animate-in fade-in slide-in-from-top-6 duration-700 delay-100">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit">
            <IconShieldCheck size={14} />
            Privacy
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Your privacy is important to us. This policy explains how we handle your data and protect your rights.
          </p>
          <div className="h-1 w-20 bg-primary rounded-full mt-2" />
        </div>

        {/* Content Card */}
        <div className="bg-card border rounded-3xl p-8 md:p-12 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
            
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <span className="text-sm font-medium text-muted-foreground italic">
                  Effective Date: {lastUpdated}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  Website: GGFollows
                </span>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">1</span>
                Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy explains how GGFollows ("we", "our", "us") collects, uses, and protects your information when you use our website and services. By using GGFollows, you agree to this Privacy Policy.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">2</span>
                Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may collect the following types of information to provide and improve our services:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-muted/30 rounded-2xl border">
                  <h3 className="text-lg font-semibold mb-3">2.1 Information You Provide</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>Email address</li>
                    <li>Username</li>
                    <li>Social media profile links</li>
                    <li>Payment-related details (processed by third-party providers)</li>
                    <li>Support messages</li>
                  </ul>
                  <p className="text-xs font-bold text-primary mt-4 uppercase tracking-tighter">
                    We do NOT store full credit card details.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/30 rounded-2xl border">
                  <h3 className="text-lg font-semibold mb-3">2.2 Automatically Collected Information</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>IP address</li>
                    <li>Device information</li>
                    <li>Browser type & Operating system</li>
                    <li>Pages visited & Time spent</li>
                    <li>Referral source</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-4 italic leading-tight">
                    This information helps us improve security and user experience.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">3</span>
                How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use collected information for the following purposes:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Create and manage your account",
                  "Detect multiple accounts (1 account per device)",
                  "Prevent fraud and abuse",
                  "Process payments",
                  "Deliver services",
                  "Improve website performance",
                  "Respond to support requests"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-secondary/5 rounded-xl border border-secondary/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-muted-foreground leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">4</span>
                Legal Basis (EU/UK Users – GDPR)
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you are located in the European Union or United Kingdom, we process your data based on your <strong>consent</strong>, the <strong>performance of a contract</strong>, our <strong>legitimate interests</strong> (such as security and fraud prevention), and our <strong>legal obligations</strong>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">5</span>
                Data Sharing
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We do NOT sell your personal data. We may share information with payment processors, hosting providers, analytics services, and legal authorities if required by law. All third parties are required to protect your data.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">6</span>
                Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your information as long as your account is active, as required by law, or for fraud prevention purposes. We may retain minimal records even after account deletion for security reasons.
              </p>
            </section>

            <section className="p-6 bg-primary/5 rounded-2xl border border-primary/20 space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">7</span>
                Account Suspension & Fraud Monitoring
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To enforce our “one account per device” rule and prevent abuse, we may track IP addresses, monitor device identifiers, and analyze suspicious activity. This is necessary to maintain fair usage and platform integrity.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">8</span>
                Your Rights (EU/UK Users)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {["Access data", "Direct correction", "Request deletion", "Restrict processing", "Object to processing", "Data portability"].map((right, i) => (
                  <div key={i} className="p-4 bg-muted/50 rounded-xl text-center border">
                    <span className="text-xs font-semibold text-muted-foreground">{right}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground pt-3">  
                To exercise these rights, please contact us at: <a href={`mailto:${siteConfig.SUPPORT_EMAIL}`} className="text-primary font-bold hover:underline">{siteConfig.SUPPORT_EMAIL}</a>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">9</span>
                Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement reasonable technical and organizational measures to protect your data. However, no online platform is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">10</span>
                Children's Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                GGFollows is not intended for users under 18 years old. We do not knowingly collect data from minors.
              </p>
            </section>

            <section className="space-y-4 border-t pt-10">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">11</span>
                Changes to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy at any time. Continued use of the website means you accept the updated policy.
              </p>
            </section>

          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 bg-primary rounded-3xl p-8 text-primary-foreground text-center space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500 shadow-lg">
          <h2 className="text-2xl font-bold">Have questions about your data?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Our support team is here to help you understand how we protect your information. 
          </p>
          <a href="mailto:ggfollows.officiel@gmail.com" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-all shadow-md active:scale-95">
             Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
