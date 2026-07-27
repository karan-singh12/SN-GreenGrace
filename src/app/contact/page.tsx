"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-[80vh] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-4">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <span className="font-semibold text-primary">Contact Us</span>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-leaf-green/10 text-leaf-green font-bold text-[10px] uppercase tracking-wider border border-leaf-green/20">
          Get In Touch
        </span>
        <h1 className="font-literata text-2xl sm:text-3xl text-forest-deep tracking-tight">
          We'd Love to Hear From You
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
          Have a question about our organic certification, farm tours, bulk orders, or custom delivery requests? Drop us a line below.
        </p>
      </div>

      {/* Main Grid: Info, Form, Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        
        {/* Left Side: Contact Information Cards */}
        <div className="space-y-4">
          <div className="paper-card rounded-3xl border border-outline-variant/30 p-6 space-y-6 shadow-sm">
            <h3 className="font-literata text-base text-forest-deep border-b border-outline-variant/20 pb-3">
              Corporate Office
            </h3>

            <div className="space-y-4 text-xs sm:text-sm font-medium">
              {/* Address */}
              <div className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-leaf-green text-[20px] shrink-0 mt-0.5">location_on</span>
                <div>
                  <h4 className="font-literata text-forest-deep">Farm Address</h4>
                  <p className="text-on-surface-variant mt-0.5 leading-relaxed">
                    Fresh Corporate Farm,<br />
                    Sector 142, Noida Expressway,<br />
                    Delhi NCR, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3 items-start border-t border-outline-variant/10 pt-4">
                <span className="material-symbols-outlined text-leaf-green text-[20px] shrink-0 mt-0.5">call</span>
                <div>
                  <h4 className="font-literata text-forest-deep">Phone Sourcing Desk</h4>
                  <p className="text-on-surface-variant mt-0.5 leading-relaxed">
                    +91 98765 43210 <br />
                    <span className="text-[10px] text-outline font-semibold">Mon-Sun, 6 AM - 9 PM</span>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-start border-t border-outline-variant/10 pt-4">
                <span className="material-symbols-outlined text-leaf-green text-[20px] shrink-0 mt-0.5">mail</span>
                <div>
                  <h4 className="font-literata text-forest-deep">Email Support</h4>
                  <p className="text-on-surface-variant mt-0.5 leading-relaxed">
                    support@freshdelivery.com <br />
                    partner@freshdelivery.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Styled Map Placeholder */}
          <div className="paper-card rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm h-[200px] relative flex flex-col justify-center items-center p-6 group cursor-pointer">
            {/* Grid graphic */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#2d6a4f08_1px,transparent_1px),linear-gradient(to_bottom,#2d6a4f08_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
            <span className="material-symbols-outlined text-[36px] text-leaf-green group-hover:scale-110 transition-transform duration-300">map</span>
            <h4 className="font-literata text-sm text-forest-deep mt-2 relative z-10 text-center">Interactive Farm Location Map</h4>
            <p className="text-[10px] text-on-surface-variant mt-0.5 relative z-10 text-center font-semibold">Click to open coordinates in Google Maps</p>
          </div>
        </div>

        {/* Right Side: Interactive Form Container */}
        <div className="lg:col-span-2">
          <div className="paper-card rounded-3xl border border-outline-variant/30 p-6 md:p-8 shadow-sm">
            {isSubmitted ? (
              /* Success Panel */
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-leaf-green/10 border border-leaf-green/20 flex items-center justify-center text-leaf-green shadow-sm">
                  <span className="material-symbols-outlined text-[32px] font-bold">check</span>
                </div>
                <div>
                  <h3 className="font-literata text-lg md:text-xl text-forest-deep">Message Sent Successfully!</h3>
                  <p className="text-xs md:text-sm text-on-surface-variant max-w-sm mt-1 leading-relaxed">
                    Thank you for reaching out to Fresh. Our team will review your inquiry and get back to your email within the next 12-24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-forest-deep/10 text-forest-deep border border-forest-deep/20 font-bold text-xs hover:bg-forest-deep/20 transition-all active:scale-95"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-literata text-base text-forest-deep border-b border-outline-variant/20 pb-3 mb-4">
                  Send A Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-plus-jakarta">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      Your Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-white border border-outline-variant focus:ring-2 focus:ring-forest-deep focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      Email Address <span className="text-error">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-white border border-outline-variant focus:ring-2 focus:ring-forest-deep focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5 font-plus-jakarta">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Sourcing details, partnership query"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-white border border-outline-variant focus:ring-2 focus:ring-forest-deep focus:border-transparent transition-all outline-none"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5 font-plus-jakarta">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Your Message <span className="text-error">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can help you..."
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-white border border-outline-variant focus:ring-2 focus:ring-forest-deep focus:border-transparent transition-all outline-none resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-forest-deep text-white font-bold text-xs hover:bg-primary active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 font-plus-jakarta"
                >
                  <span className="material-symbols-outlined text-[14px]">send</span>
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
