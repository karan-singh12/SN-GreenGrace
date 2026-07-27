"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-[80vh] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-4">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <span className="font-semibold text-primary">Privacy Policy</span>
      </div>

      <div className="max-w-4xl mx-auto paper-card border border-outline-variant/30 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <h1 className="font-literata text-2xl md:text-3xl text-forest-deep tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-on-surface-variant font-medium mt-1">Last Updated: July 28, 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-on-surface-variant leading-relaxed font-medium">
          <section className="space-y-2">
            <h2 className="font-literata text-sm sm:text-base text-forest-deep">1. Introduction</h2>
            <p>
              Welcome to SN Greens. We are committed to protecting your personal data and respecting your privacy. This policy describes how we collect, store, share, and use personal information when you use our website, mobile application, or purchase from our organic delivery service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-literata text-sm sm:text-base text-forest-deep">2. Information We Collect</h2>
            <p>
              When you purchase or interact with our platform, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact Information:</strong> Name, delivery address, phone number, and email.</li>
              <li><strong>Order Data:</strong> Basket selections, transaction logs, dates, and order status.</li>
              <li><strong>Device Data:</strong> IP address, operating system, and tracking metadata gathered via cookies to optimize your checkout experience.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-literata text-sm sm:text-base text-forest-deep">3. How We Use Your Information</h2>
            <p>
              SN Greens uses your data to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process and deliver your fresh organic orders.</li>
              <li>Coordinate standard or Express 30-minute delivery slots with our courier partners.</li>
              <li>Provide instant notifications and tracking updates for your active orders.</li>
              <li>Optimize our farm sourcing logs based on local sales history.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-literata text-sm sm:text-base text-forest-deep">4. Data Security</h2>
            <p>
              We prioritize data safety. All transaction details, payment gateway interactions, and address fields are processed over industry-standard secure connection keys (SSL/TLS). Your credit card credentials or bank login codes are never stored on SN Greens local servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-literata text-sm sm:text-base text-forest-deep">5. Contact Us Regarding Your Data</h2>
            <p>
              If you wish to view, download, or request deletion of your personal account address history and order files, please contact our data safety division at <a href="mailto:privacy@sngreens.com" className="text-earthy-terracotta hover:underline">privacy@sngreens.com</a>.
            </p>
          </section>
        </div>
      </div>

    </div>
  );
}
