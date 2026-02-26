import { Metadata } from "next";
import Link from "next/link";
import { IconChevronRight, IconCookie } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Cookie Policy — GGfollows",
  description:
    "Read the Cookie Policy for GGfollows. Learn how we use cookies to improve your experience.",
  openGraph: {
    title: "Cookie Policy — GGfollows",
    description: "How we use cookies to improve your experience.",
    type: "website",
  },
};

export default function CookiePolicyPage() {
  const lastUpdated = "February 26, 2026";

  return (
    <div className="container mx-auto px-4 py-28 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb-like navigation */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <IconChevronRight size={14} />
          <span className="text-foreground font-medium">Cookie Policy</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-12 animate-in fade-in slide-in-from-top-6 duration-700 delay-100">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit">
            <IconCookie size={14} />
            Data Usage
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Learn about how we use cookies and similar technologies to enhance your experience on GGfollows.
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
                What Are Cookies?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. They help improve user experience, website functionality, and security by remembering your preferences and recognizing you on subsequent visits.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">2</span>
                How We Use Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies for a variety of reasons, including to:
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {[
                  "Keep you logged in",
                  "Remember user preferences",
                  "Prevent multiple accounts",
                  "Track website performance",
                  "Detect fraud and abuse",
                  "Enhance security"
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2 p-4 bg-muted/40 rounded-2xl border items-center text-center group hover:bg-muted/60 transition-colors">
                     <span className="text-xs font-bold text-primary uppercase tracking-wider">{item.split(' ')[0]}</span>
                     <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">3</span>
                Types of Cookies We Use
              </h2>
              
              <div className="space-y-4">
                <div className="p-6 bg-card border rounded-2xl shadow-sm space-y-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    3.1 Essential Cookies
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    These are strictly necessary for the operation of our website. They include cookies that enable you to log into secure areas of our website, use a shopping cart, or make use of e-billing services. <strong>These cannot be disabled.</strong>
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                    <span className="px-2 py-1 bg-muted rounded-md border">Login</span>
                    <span className="px-2 py-1 bg-muted rounded-md border">Security</span>
                    <span className="px-2 py-1 bg-muted rounded-md border">Account management</span>
                  </div>
                </div>

                <div className="p-6 bg-card border rounded-2xl shadow-sm space-y-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    3.2 Analytics Cookies
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                    <span className="px-2 py-1 bg-muted rounded-md border">Traffic sources</span>
                    <span className="px-2 py-1 bg-muted rounded-md border">Platform performance</span>
                    <span className="px-2 py-1 bg-muted rounded-md border">User behavior</span>
                  </div>
                </div>

                <div className="p-6 bg-card border rounded-2xl shadow-sm space-y-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-destructive" />
                    3.3 Security & Anti-Fraud Cookies
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We use these to identify our users and prevent fraudulent use of login credentials and protect user data from unauthorized parties.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                    <span className="px-2 py-1 bg-muted rounded-md border">Multi-account detection</span>
                    <span className="px-2 py-1 bg-muted rounded-md border">Abuse prevention</span>
                    <span className="px-2 py-1 bg-muted rounded-md border">Suspicious activity</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">4</span>
                Third-Party Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Some cookies may be placed by third-party services that appear on our pages. We do not control these cookies. These third parties include payment providers, analytics tools, and hosting providers. These third parties have their own privacy policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">5</span>
                Managing Cookies
              </h2>
              <div className="p-6 bg-muted/30 rounded-2xl border space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. 
                </p>
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl text-sm italic">
                  <strong>Note:</strong> If you disable or refuse essential cookies, please note that some parts of this website may become inaccessible or not function properly.
                </div>
              </div>
            </section>

            <section className="space-y-6 border-t pt-10">
              <div className="flex flex-col gap-3">
                 <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">6</span>
                  EU Cookie Consent
                </h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-wider w-fit">
                   Important for EU/UK Traffic
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                If you are located in the EU or UK, you may see a cookie banner requesting consent before non-essential cookies are activated. You have the right to accept all cookies, reject non-essential cookies, or customize your preferences.
              </p>
            </section>

          </div>
        </div>

        {/* Footer info box */}
        <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
           <p className="text-sm text-muted-foreground max-w-2xl mx-auto italic">
             For more details on how we protect your personal data, please refer to our <Link href="/privacy-policy" className="text-primary font-bold hover:underline">Privacy Policy</Link>.
           </p>
        </div>
      </div>
    </div>
  );
}
