"use client";

import Script from "next/script";
import { siteConfig } from "@/lib/seo-config";

/**
 * Google Analytics 4 Component
 * 
 * To set up Google Analytics:
 * 1. Go to https://analytics.google.com
 * 2. Create a new property for target-group-plc.com
 * 3. Get the Measurement ID (starts with G-)
 * 4. Add it to your .env file as NEXT_PUBLIC_GA_MEASUREMENT_ID
 * 
 * Example: NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */
export default function GoogleAnalytics() {
  const gaId = siteConfig.analytics.googleAnalyticsId;

  // Don't render anything if no GA ID is set
  if (!gaId) {
    return null;
  }

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

/**
 * Track custom events in Google Analytics
 * Use this to track specific user actions
 * 
 * Example usage:
 * trackEvent('contact_form', 'submit', 'Contact Page');
 * trackEvent('service_click', 'click', 'Construction Materials');
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

