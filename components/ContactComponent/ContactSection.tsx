// components/ContactComponent/ContactSection.tsx
"use client";

import { useLocale } from "@/lib/i18n/context";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const avatars = [
  "/images/avatar1.png",
  "/images/avatar2.png",
  "/images/avatar3.png",
  "/images/avatar4.png",
  "/images/avatar5.png",
];

interface ContactPageData {
  formTitle: string;
  formDescription: string;
  happyCustomersText: string;
  reviewsRating: string;
  reviewsText: string;
  reviewsLink: string;
  addressLabel: string;
  addressText: string;
  addressLink: string;
  phoneLabel: string;
  phoneText: string;
  phoneLink: string;
  hoursLabel: string;
  hoursText: string;
  formTitleBox: string;
  formSubtitle: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  submitButtonText: string;
  submittingButtonText: string;
  successMessage: string;
  errorMessage: string;
}

export default function ContactSection() {
  const { locale } = useLocale();
  const [data, setData] = useState<ContactPageData | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/contact?locale=${locale}`);
        if (res.ok) {
          const contactData = await res.json();
          setData(contactData);
        }
      } catch (error) {
        console.error("Contact section fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          locale,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !data) {
    return (
      <section className="container py-12">
        <div className="animate-pulse flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="h-10 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
          </div>
          <div className="flex-1 bg-gray-300 rounded-2xl h-96"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {data.formTitle}
          </h2>
          <p className="mb-6 text-muted-foreground">{data.formDescription}</p>
          <div className="flex items-center gap-2 mb-4 flex-col lg:flex-row">
            <div className="flex -space-x-2">
              {avatars.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt="Doktor"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white shadow"
                />
              ))}
            </div>
            <span className="ml-4 bg-secondary px-4 py-2 rounded-full font-medium text-foreground">
              {data.happyCustomersText}
            </span>
          </div>
          <Link
            href={data.reviewsLink}
            target="_blank"
            className="flex items-center mb-2"
          >
            <span className="text-yellow-400 text-xl mr-2">★</span>
            <span className="font-bold">{data.reviewsRating}</span>
            <span className="ml-2 text-muted-foreground">
              {data.reviewsText}
            </span>
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <Link
              href={data.addressLink}
              target="_blank"
              className="stats-card"
            >
              <span className="text-cyan-500 text-2xl mr-3">📍</span>
              <div>
                <div className="font-semibold">{data.addressLabel}</div>
                <div className="text-sm text-muted-foreground">
                  {data.addressText}
                </div>
              </div>
            </Link>
            <Link href={data.phoneLink} className="stats-card">
              <span className="text-cyan-500 text-2xl mr-3">📞</span>
              <div>
                <div className="font-semibold">{data.phoneLabel}</div>
                <div className="text-sm text-muted-foreground">
                  {data.phoneText}
                </div>
              </div>
            </Link>
            <div className="stats-card">
              <span className="text-cyan-500 text-2xl mr-3">⏰</span>
              <div>
                <div className="font-semibold">{data.hoursLabel}</div>
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {data.hoursText}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg flex flex-col justify-center relative overflow-hidden">
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>

          {/* Header */}
          <div className="mb-8 text-center relative">
            <h3 className="text-foreground text-2xl md:text-3xl font-bold mb-3 font-playfair">
              {data.formTitleBox}
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              {data.formSubtitle}
            </p>

            {/* Decorative element */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 hidden md:flex items-center gap-2 opacity-40">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-6 h-[1px] bg-primary"></div>
            </div>
          </div>

          {/* Success Message */}
          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-3 animate-fadeIn">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.707 4.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L7 9.586l5.293-5.293a1 1 0 011.414 0z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">{data.successMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-3 animate-shake">
              <div className="w-6 h-6 bg-red-100 dark:bg-red-800/30 rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 16A8 8 0 108 0a8 8 0 000 16zM6.707 5.293a1 1 0 00-1.414 1.414L6.586 8l-1.293 1.293a1 1 0 101.414 1.414L8 9.414l1.293 1.293a1 1 0 001.414-1.414L9.414 8l1.293-1.293a1 1 0 00-1.414-1.414L8 6.586 6.707 5.293z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">{data.errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-foreground text-sm font-semibold">
                  {data.firstNamePlaceholder}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3.5 bg-input border-2 border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-background outline-none transition-all duration-200 hover:border-primary/60"
                  placeholder=" "
                />
              </div>
              <div className="space-y-2">
                <label className="text-foreground text-sm font-semibold">
                  {data.lastNamePlaceholder}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3.5 bg-input border-2 border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-background outline-none transition-all duration-200 hover:border-primary/60"
                  placeholder=" "
                />
              </div>
            </div>

            {/* Contact Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-foreground text-sm font-semibold">
                  {data.emailPlaceholder}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3.5 bg-input border-2 border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-background outline-none transition-all duration-200 hover:border-primary/60"
                  placeholder=" "
                />
              </div>
              <div className="space-y-2">
                <label className="text-foreground text-sm font-semibold">
                  {data.phonePlaceholder}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3.5 bg-input border-2 border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-background outline-none transition-all duration-200 hover:border-primary/60"
                  placeholder=" "
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="text-foreground text-sm font-semibold">
                {data.messagePlaceholder}
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full p-3.5 bg-input border-2 border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 focus:bg-background outline-none transition-all duration-200 hover:border-primary/60 resize-y min-h-[120px]"
                placeholder=" "
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group bg-primary hover:bg-primary/90 active:bg-primary/80 disabled:bg-muted disabled:text-muted-foreground text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-2 min-w-[160px] justify-center hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              >
                {isSubmitting && (
                  <div className="w-4 h-4 animate-spin">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="31.416"
                        strokeDashoffset="31.416"
                        className="animate-spin"
                      />
                    </svg>
                  </div>
                )}
                <span
                  className={`transition-opacity duration-200 ${
                    isSubmitting ? "opacity-80" : "opacity-100"
                  }`}
                >
                  {isSubmitting
                    ? data.submittingButtonText
                    : data.submitButtonText}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
