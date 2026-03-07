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
  IconHistory,
  IconReceipt,
  IconUsers,
  IconMessage2,
} from "@tabler/icons-react";

const siteConfig = {
  DEFAULT_LIMIT: 5,
  SUPPORT_EMAIL: "ggfollows.officiel@gmail.com",
  publicNavLinks: [
    { title: "Home", href: "/" },
    { title: "Services", href: "/services" },
    { title: "Plans", href: "/plans" },
    { title: "FAQ", href: "/#faq" },
  ],
  howItWorksSteps: [
    {
      title: "1. Join the Growth Community",
      description:
        "Create your free account and join thousands of creators in our organic social media growth community.",
      image: { src: "/images/join-illustration.svg", alt: "Join GGfollows" },
    },
    {
      title: "2. Engage with Other Creators",
      description:
        "Our follow for follow system allows you to earn points by engaging with real users on your favorite platforms.",
      image: {
        src: "/images/social-dashboard-illustration.svg",
        alt: "Follow for follow engagement",
      },
    },
    {
      title: "3. Get Real Followers & Likes",
      description:
        "Exchange your points for free Instagram followers, TikTok views, or YouTube subscribers from active accounts.",
      image: {
        src: "/images/coins-illustration.svg",
        alt: "Social media engagement exchange",
      },
    },
    {
      title: "4. Watch Your Accounts Grow",
      description:
        "Track your organic social media growth in real-time. Safe, secure, and no password required.",
      image: {
        src: "/images/social-growth-illustration.svg",
        alt: "Organic social media growth tracking",
      },
    },
  ],
  faq: [
    {
      question: "Is it safe to get free followers with GGfollows?",
      answer:
        "Absolutely. GGfollows is designed for safe social media growth. We never ask for your password, and all engagement comes from real users through our secure exchange platform, ensuring your account stays protected.",
    },
    {
      question: "How does the follower exchange work?",
      answer:
        "Our platform uses a simple follow for follow and engagement exchange model. You earn points by interacting with other creators, which you can then spend to receive followers, likes, and subscribers for your own profile.",
    },
    {
      question: "Are these real followers or bots?",
      answer:
        "GGfollows is a community of real people helping each other grow. You receive engagement from active social media users who participate in our exchange, ensuring organic and authentic growth for your accounts.",
    },
    {
      question: "What social networks do you support?",
      answer:
        "We currently support major platforms including Instagram, TikTok, YouTube, X (Twitter), and Facebook. Our social media growth platform is constantly expanding to include more engagement services.",
    },
    {
      question: "How can I grow social media followers faster?",
      answer:
        "By staying active in our engagement exchange! Follow more creators to earn points quickly, complete daily missions, and invite friends to maximize your social media engagement and reach.",
    },
  ],
  adminSidebarNavLinks: [
    {
      title: "Overview",
      icon: IconDashboard,
      href: "/admin/overview",
    },
    {
      title: "Users",
      icon: IconUsers,
      href: "/admin/users",
    },

    {
      title: "Tasks",
      icon: IconChecklist,
      href: "/admin/tasks",
    },
    {
      title: "Orders",
      icon: IconReceipt,
      href: "/admin/orders",
    },
    {
      title: "Tickets",
      icon: IconMessage2,
      href: "/admin/support",
    },
    {
      title: "Transactions",
      icon: IconHistory,
      href: "/admin/transactions",
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
    {
      title: "Orders",
      icon: IconReceipt,
      href: "/orders",
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
  TASK_DAILY_LIMITS: {
    FREE: 3,
    PREMIUM: 10,
    PRO: 50,
  },
  TASK_ACTIVE_LIMITS: {
    FREE: 5,
    PREMIUM: 20,
    PRO: 100,
  },
  plans: {
    FREE: {
      name: "FREE" as const,
      description: "Start earning points and growing with daily rewards.",
      dailyReward: 20,
      price: "0",
      features: [
        "Up to 10 active tasks",
        "Up to 3 tasks per day",
        "Free daily points",
        "Access to basic campaigns",
        "Basic analytics (points & tasks)",
        "Community support",
      ],
    },
    PREMIUM: {
      name: "PREMIUM" as const,
      description: "More tasks, more visibility, faster growth.",
      dailyReward: 50,
      price: "5",
      features: [
        "Up to 50 active tasks",
        "Up to 15 tasks per day",
        "Increased daily reward points",
        "Boosted task visibility",
        "Access to premium campaigns",
        "Advanced analytics & stats",
        "Early access to new features",
        "No ads",
      ],
    },
    PRO: {
      name: "PRO" as const,
      description: "Unlimited power for serious creators.",
      dailyReward: 70,
      price: "10",
      features: [
        "Unlimited active tasks",
        "Unlimited daily tasks",
        "Highest daily reward points",
        "Access to exclusive campaigns",
        "Auto-renew & scheduled tasks",
        "Full analytics & performance insights",
        "Priority support",
        "No ads",
        "Temporary task boost (24h)",
      ],
    },
  },
  POINTS_RATE: 200,
  SERVICES: [
    {
      code: "FB_FOLLOWERS_FACEBOOK",
      name: "Facebook Followers (Basic)",
      platform: "FACEBOOK" as const,
      pricePerUnit: 10,
      minQuantity: 1000,
      maxQuantity: 10000,
    },
    {
      code: "FB_POST_LIKE_BASIC",
      name: "Facebook Post's Likes (Basic)",
      platform: "FACEBOOK" as const,
      pricePerUnit: 10,
      minQuantity: 1000,
      maxQuantity: 10000,
    },
    {
      code: "IG_FOLLOWERS_BASIC",
      name: "Instagram Followers (Basic)",
      platform: "INSTAGRAM" as const,
      pricePerUnit: 10,
      minQuantity: 1000,
      maxQuantity: 10000,
    },
    {
      code: "YT_SUBS_BASIC",
      name: "YouTube Subscribers",
      platform: "YOUTUBE" as const,
      pricePerUnit: 20,
      minQuantity: 1000,
      maxQuantity: 10000,
    },
  ],
};

export default siteConfig;
