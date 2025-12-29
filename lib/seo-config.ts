/**
 * SEO Configuration for Target Group PLC
 *
 * This file contains all SEO-related configuration.
 * Update these values with actual client information before deployment.
 */

export const siteConfig = {
  // Basic Site Info
  name: "Target Group General Trading PLC",
  shortName: "Target Group PLC",
  tagline: "Building Tomorrow's Solutions",
  description:
    "Target Group PLC is a diversified Ethiopian conglomerate delivering excellence in construction materials, agro-industry, import/export, education, and IT services. Trusted partner for sustainable growth.",

  // Domain (update when going live)
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://target-group-plc.com",

  // Company Information (update with actual info from client)
  company: {
    legalName: "Target Group PLC",
    foundedYear: "2022", // UPDATE: Ask client
    registrationNumber: "", // UPDATE: Ask client for company registration number
    vatNumber: "", // UPDATE: Ask client if applicable
  },

  // Contact Information (UPDATE ALL with actual client info)
  contact: {
    email: "info@target-group-plc.com",
    phone: "+251 11 XXX XXXX", // UPDATE: Ask client
    phoneFormatted: "+251-11-XXX-XXXX",
    address: {
      street: "", // UPDATE: Ask client
      city: "Addis Ababa",
      region: "Addis Ababa",
      postalCode: "", // UPDATE: Ask client
      country: "Ethiopia",
      countryCode: "ET",
    },
    // Google Maps coordinates (for structured data)
    geo: {
      latitude: "9.0054", // UPDATE: Get exact coordinates
      longitude: "38.7636",
    },
  },

  // Social Media Links (UPDATE with actual client profiles)
  social: {
    facebook:
      "https://facebook.com/targetgroupplc", // UPDATE
    linkedin:
      "https://linkedin.com/company/target-group-plc", // UPDATE
    twitter: "", // UPDATE if they have one
    youtube: "", // UPDATE if they have one
    instagram: "", // UPDATE if they have one
  },

  // SEO Keywords (primary keywords for the business)
  // Including Amharic keywords helps capture local search traffic
  keywords: [
    // English keywords
    "Target Group PLC",
    "Ethiopian conglomerate",
    "construction materials Ethiopia",
    "agro-industry Ethiopia",
    "import export Ethiopia",
    "education services Ethiopia",
    "IT services Addis Ababa",
    "business solutions Ethiopia",
    "manufacturing Ethiopia",
    "Ethiopian business group",
    "building materials supplier",
    "agricultural products Ethiopia",
    // Amharic keywords (ቁልፍ ቃላት)
    "ታርጌት ግሩፕ",
    "የግንባታ ቁሳቁሶች",
    "የግብርና ኢንዱስትሪ",
    "ኢምፖርት ኤክስፖርት",
    "የትምህርት አገልግሎት",
    "የአይቲ አገልግሎት",
    "የንግድ መፍትሄዎች ኢትዮጵያ",
    "አዲስ አበባ",
  ],

  // Open Graph defaults
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Target Group PLC",
  },

  // Twitter Card defaults
  twitter: {
    card: "summary_large_image",
    creator: "@targetgroupplc", // UPDATE if they have Twitter
  },

  // Google Analytics (UPDATE with actual GA4 Measurement ID)
  analytics: {
    googleAnalyticsId:
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
      "", // Format: G-XXXXXXXXXX
  },

  // Google Search Console verification (UPDATE after setting up GSC)
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION || "", // Get from Google Search Console
  },
};

// Helper to get full URL
export function getFullUrl(
  path: string = ""
): string {
  const baseUrl = siteConfig.url.replace(
    /\/$/,
    ""
  );
  const cleanPath = path.startsWith("/")
    ? path
    : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

// Default OG Image path
export const defaultOgImage =
  "/images/og-default.jpg";
