import { Metadata } from "next";
import Link from "next/link";
import { IconChevronRight, IconScale } from "@tabler/icons-react";
import siteConfig from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Terms of Service — GGfollows",
  description:
    "Read the Terms of Service for GGfollows. Understand your rights and responsibilities when using our platform.",
  openGraph: {
    title: "Terms of Service — GGfollows",
    description: "Our platform rules and guidelines.",
    type: "website",
  },
};

export default function TermsPage() {
  const lastUpdated = "February 26, 2026";

  return (
    <div className="container mx-auto px-4 py-28 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb-like navigation */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <IconChevronRight size={14} />
          <span className="text-foreground font-medium">Terms of Service</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-12 animate-in fade-in slide-in-from-top-6 duration-700 delay-100">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit">
            <IconScale size={14} />
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Please read these terms carefully before using GGFollows. By using
            the platform, you agree to these terms.
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
                Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using GGFollows (“Website”, “Service”, “Platform”), you agree to be bound by these Terms of Service. If you do not agree with these terms, you must stop using the platform immediately.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">2</span>
                Description of Service
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                GGFollows is a digital promotion platform where users can:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Earn points by completing tasks</li>
                <li>Use points to promote their own social media profiles</li>
                <li>Purchase points or services using real money</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed pt-2">
                GGFollows does not guarantee business growth, monetization approval, partnership eligibility, or organic engagement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">3</span>
                Account Registration & Eligibility
              </h2>
              <div className="p-6 bg-muted/50 rounded-2xl border border-dashed border-primary/30">
                <h3 className="text-lg font-semibold mb-3">3.1 One Account Per User / Device</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Users are allowed to create <strong>ONLY ONE (1)</strong> account per device and per person.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Creating multiple accounts, using emulators, VPN abuse, fake identities, or bypassing system restrictions is strictly prohibited. Any attempt to create or operate multiple accounts may result in:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground font-medium">
                  <li className="text-destructive">Immediate suspension</li>
                  <li className="text-destructive">Permanent ban</li>
                  <li>Loss of all earned or purchased points</li>
                  <li>Removal of active services without compensation</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-6 italic">
                  We reserve the right to determine what qualifies as duplicate or abusive behavior.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">4</span>
                Points & Payments
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">4.1 Digital Nature of Points</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    GG Points are virtual, non-transferable, and have no real-world monetary value. Points cannot be withdrawn or converted into cash.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">4.2 Payments</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    All payments made on GGfollows are final. By purchasing, you agree that you are buying digital services and virtual credits.
                  </p>
                </div>
              </div>

              <div className="bg-destructive/5 border border-destructive/20 p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-destructive">4.3 No Refund Policy</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  All purchases are non-refundable. No refunds will be issued after successful payment processing.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  If a refund is issued due to payment processor disputes, technical issues, or forced chargebacks, GGFollows reserves the right to remove delivered services, deduct points, and permanently suspend the account.
                </p>
                <div className="pt-2">
                  <h4 className="text-sm font-bold uppercase tracking-tight text-foreground">4.4 Exceptional Refund Handling</h4>
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                    If a refund happens for any reason and is approved by GGfollows, compensation will be provided <strong>ONLY in GG Points</strong>, not cash.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">5</span>
                Nature of Followers & Services
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By using our services, you understand and agree that:
              </p>
              <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-2xl">
                <ul className="space-y-3">
                   <li className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-amber-500 shrink-0">⚠️</span>
                    <span>Followers, subscribers, views, or engagement delivered through GGfollows may not be active or organic users. They may be static accounts, inactive profiles, automated accounts, or promotional accounts.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-amber-500 shrink-0">⚠️</span>
                    <span>Engagement (likes, views, subscribers) is provided for promotional or visibility purposes only. We do not guarantee retention rates.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-amber-500 shrink-0">⚠️</span>
                    <span>Followers or engagement may drop over time. GGFollows does not claim that provided engagement represents real, active, or targeted audiences.</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm font-medium pt-2">Users understand the risks of using promotional services on social media platforms.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">6</span>
                Platform Risk & Third-Party Policies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You are solely responsible for ensuring that your use of GGfollows complies with the policies of YouTube, Instagram, TikTok, Twitch, or any other third-party platform rules.
              </p>
              <div className="p-4 bg-muted rounded-xl text-sm italic border-l-4 border-primary">
                GGfollows is not responsible for account suspensions, content removal, demonetization, shadow bans, or any penalty from social media platforms. <strong>Use at your own risk.</strong>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">7</span>
                Prohibited Activities
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Create multiple accounts",
                  "Use bots, scripts, or automation to farm points",
                  "Exploit system bugs",
                  "Attempt to reverse engineer the platform",
                  "Harass other users",
                  "Promote illegal, adult, scam, or violent content",
                  "Open payment disputes without contacting support"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-card border rounded-xl items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-destructive uppercase tracking-widest text-center pt-2">Violation may result in permanent ban without notice.</p>
            </section>

             <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">8</span>
                Suspension & Termination
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                GGfollows reserves the right to suspend or terminate accounts, remove points, or restrict access at any time without prior warning, especially in cases of fraud, abuse, chargebacks, or system manipulation.
              </p>
              <p className="font-bold text-foreground">All decisions made by GGfollows are final.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">9</span>
                Service Availability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not guarantee continuous availability, error-free operation, or fixed delivery speeds. Services may change, pause, or stop at any time without prior notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">10</span>
                Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                GGfollows shall not be liable for loss of social media accounts, loss of revenue, business damages, reputation damage, or any indirect or consequential losses. <strong>Your use of the service is at your own risk.</strong>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">11</span>
                Changes to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                GGfollows may update or modify these Terms at any time. Continued use of the platform means you accept the updated Terms.
              </p>
            </section>

            <section className="space-y-6 border-t pt-12">
              <h2 className="text-2xl font-bold">12. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For support or questions regarding these terms, please reach out via our official channels:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`mailto:${siteConfig.SUPPORT_EMAIL}`} className="flex items-center gap-3 p-4 bg-muted hover:bg-muted/80 rounded-2xl transition-all group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    📧
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-tight">Email Support</p>
                    <p className="text-sm font-semibold">{siteConfig.SUPPORT_EMAIL}</p>
                  </div>
                </a>
                <Link href="/" className="flex items-center gap-3 p-4 bg-muted hover:bg-muted/80 rounded-2xl transition-all group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    🌐
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-tight">Official Website</p>
                    <p className="text-sm font-semibold">GGfollows.com</p>
                  </div>
                </Link>
              </div>
            </section>

          </div>
        </div>

        {/* Footer help text */}
        <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
           <p className="text-sm text-balance text-muted-foreground">
             Thank you for choosing <strong>GGfollows</strong>. We are committed to providing a transparent and fair growth platform.
           </p>
        </div>
      </div>
    </div>
  );
}
