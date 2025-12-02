import clientEnv from "@/utils/clientEnv";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = clientEnv.NEXT_PUBLIC_URL;

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/auth/login`, lastModified: new Date() },
    { url: `${base}/auth/signup`, lastModified: new Date() },
    { url: `${base}/dashboard`, lastModified: new Date() },
    { url: `${base}/tasks`, lastModified: new Date() },
    { url: `${base}/tasks/create`, lastModified: new Date() },
    { url: `${base}/settings`, lastModified: new Date() },
    { url: `${base}/verify-email`, lastModified: new Date() },
    { url: `${base}/plans`, lastModified: new Date() },
    { url: `${base}/services`, lastModified: new Date() },
    { url: `${base}/onboarding`, lastModified: new Date() },
  ];
}
