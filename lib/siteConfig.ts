import {
  IconAppWindow,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
  IconChecklist,
  IconClipboardPlus,
  IconCrown,
  IconDashboard,
} from "@tabler/icons-react";

const siteConfig = {
  DEFAULT_LIMIT: 5,
  publicNavLinks: [
    { title: "Home", href: "/" },
    { title: "Services", href: "/services" },
    { title: "Plans", href: "/plans" },
    { title: "FAQ", href: "/#faq" },
  ],
  howItWorksSteps: [
    {
      title: "1. Join & Get Free Points",
      description:
        "Create your free GGfollows account — you’ll get 100 points instantly to start growing.",
      image: { src: "/images/join-illustration.svg", alt: "Join Illustration" },
    },
    {
      title: "2. Follow Other Creators",
      description:
        "Spend a few minutes connecting with others. Every follow you give earns you points back.",
      image: {
        src: "/images/social-dashboard-illustration.svg",
        alt: "Follow Illustration",
      },
    },
    {
      title: "3. Earn & Spend Points",
      description:
        "Use your points to get followers, likes, or subs from real users on your selected platform.",
      image: {
        src: "/images/coins-illustration.svg",
        alt: "Earn and Spend Illustration",
      },
    },
    {
      title: "4. Track Your Growth",
      description:
        "Watch your social stats grow from your GGfollows dashboard.",
      image: {
        src: "/images/social-growth-illustration.svg",
        alt: "Track Growth Illustration",
      },
    },
  ],
  faq: [
    {
      question: "Is it safe to use GGfollows?",
      answer:
        "Yes, GGfollows is built to help creators grow organically and securely. You never need to share your password or private data. All follows and interactions happen directly on the official social media platforms, so your account stays fully under your control.",
    },
    {
      question: "Can I lose my followers after I get them?",
      answer:
        "In some cases, yes. Like any follow-for-follow system, a small percentage of users may unfollow later. GGfollows rewards trustworthy members who stay connected, and users who unfollow others lose their reputation and points. This keeps the community fair and focused on real engagement.",
    },
    {
      question: "Do I need to give my password?",
      answer:
        "No. GGfollows will never ask for your social media password. All actions such as following or liking happen directly on the platform using your own account. Your account security always comes first.",
    },
    {
      question: "What social networks do you support?",
      answer:
        "Currently, GGfollows supports Instagram, TikTok, YouTube, and X (Twitter). More platforms such as Threads and Facebook Pages will be added soon.",
    },
    {
      question: "How can I earn more points?",
      answer:
        "You can earn more points by following other users, completing daily missions, inviting friends, and staying active. Active members often receive loyalty rewards and surprise bonuses.",
    },
  ],
  privateSidebarNavLinks: [
    {
      title: "Dashboard",
      icon: IconDashboard,
      href: "/dashboard",
    },
    {
      title: "Tasks",
      icon: IconChecklist,
      href: "/tasks",
    },
    {
      title: "Create Task",
      icon: IconClipboardPlus,
      href: "/tasks/create",
    },
    {
      title: "Services",
      icon: IconAppWindow,
      href: "/services",
    },
    {
      title: "Plans",
      icon: IconCrown,
      href: "/plans",
    },
  ],
  platforms: {
    X: {
      icon: IconBrandX,
      hostnames: ["x.com", "twitter.com"],
    },
    FACEBOOK: {
      icon: IconBrandFacebook,
      hostnames: ["facebook.com"],
    },
    INSTAGRAM: {
      icon: IconBrandInstagram,
      hostnames: ["instagram.com"],
    },
    YOUTUBE: {
      icon: IconBrandYoutube,
      hostnames: ["youtube.com"],
    },
    TIKTOK: {
      icon: IconBrandTiktok,
      hostnames: ["tiktok.com"],
    },
  },
};

export default siteConfig;
