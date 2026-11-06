"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CircleCheck, Info, LoaderCircle, Mail, Send } from "lucide-react";
import { FieldMessage, FormField, inputClasses } from "@/components/forms/FormField";
import { buttonClasses } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { siteConfig } from "@/config/site";
import { emailUrl, gmailComposeUrl, hasWhatsApp, whatsappUrl } from "@/lib/contact";
import {
  emptyInquiry,
  inquirySubject,
  inquiryToText,
  inquiryToWhatsApp,
  isServiceOption,
  validateInquiry,
  type InquiryErrors,
} from "@/lib/quote";
import { cn } from "@/lib/utils";
import { EVENT_TYPES, SERVICE_OPTIONS, type EventType, type InquiryRequest, type ServiceOption } from "@/types";

type Status = "idle" | "submitting" | "success" | "delivery-failed" | "error";

function initialValues(params: URLSearchParams): InquiryRequest {
  const values = { ...emptyInquiry, services: [] as ServiceOption[] };
  const event = params.get("event");
  if (event && EVENT_TYPES.includes(event as EventType)) values.eventType = event as EventType;
  const service = params.get("service");
  if (isServiceOption(service)) values.services = [service];
  return values;
}

/**
 * `online` is true when the server can deliver inquiries (Resend or a webhook).
 * Otherwise the form sends through the visitor's Gmail or WhatsApp instead.
 */
export function InquiryForm({ online }: { online: boolean }) {
  const params = useSearchParams();
  const [values, setValues] = useState<InquiryRequest>(() => initialValues(params));
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState<InquiryRequest | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);
  const [today, setToday] = useState("");

  useEffect(() => {
    startedAt.current = Date.now();
    const d = new Date();
    setToday(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
  }, []);

  function update<K extends keyof InquiryRequest>(key: K, value: InquiryRequest[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function toggleService(option: ServiceOption, checked: boolean) {
    const next = checked ? [...values.services, option] : values.services.filter((s) => s !== option);
    update("services", next);
  }

  /** Validates and focuses the first problem. Returns true when the form is OK. */
  function check(requireContact: boolean): boolean {
    const found = validateInquiry(values, { requireContact });
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
    return !firstError;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!online) {
      // Pressing Enter: point the visitor at the send buttons.
      if (check(false)) formRef.current?.querySelector<HTMLElement>("[data-send-channel]")?.focus();
      return;
    }
    if (!check(true)) return;

    setStatus("submitting");
    try {
      const honeypot = (formRef.current?.elements.namedItem("company_website") as HTMLInputElement | null)?.value;
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company_website: honeypot, startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reason?: string; detail?: string; errors?: InquiryErrors };

      if (res.ok && data.ok) {
        setSubmitted(values);
        setStatus("success");
        setValues({ ...emptyInquiry, services: [] });
      } else if (data.reason === "not-configured" || data.reason === "delivery-failed") {
        if (data.detail) console.error("[inquiry]", data.detail);
        setSubmitted(values);
        setStatus("delivery-failed");
      } else {
        if (data.errors) setErrors(data.errors);
        setStatus("error");
      }
    } catch {
      setSubmitted(values);
      setStatus("delivery-failed");
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  if (status === "success" && submitted) {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="flex animate-page-in flex-col items-center rounded-panel border border-edge bg-night-800 px-6 py-16 text-center outline-none sm:px-12"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-electric-600/20 text-electric-300">
          <CircleCheck className="size-8" strokeWidth={1.6} />
        </span>
        <h2 className="mt-6 text-3xl">Inquiry sent</h2>
        <p className="mt-4 max-w-md text-lg text-fog">
          Thank you{submitted.fullName.trim() ? `, ${submitted.fullName.trim().split(" ")[0]}` : ""}. Your event
          inquiry has been sent to our team, and we&apos;ll get back to you at{" "}
          {submitted.email.trim() || submitted.phone.trim()}.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          {hasWhatsApp && submitted.contactViaWhatsApp && (
            <a
              href={whatsappUrl(inquiryToWhatsApp(submitted))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("whatsapp", "lg")}
            >
              <SocialIcon network="whatsapp" className="size-5" /> Continue on WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setSubmitted(null);
            }}
            className={buttonClasses("outline", "lg")}
          >
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  const describedBy = (key: keyof InquiryRequest, hint = false) =>
    errors[key] ? `${key}-error` : hint ? `${key}-hint` : undefined;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="inquiry-form-title"
      className="relative rounded-panel border border-edge bg-night-800 p-6 sm:p-10"
    >
      <h2 id="inquiry-form-title" className="text-2xl sm:text-3xl">
        Event inquiry
      </h2>
      <p className="mt-2 text-fog">
        {online
          ? "Tell us about your event. Fill in as much or as little as you like. We just need an email address or phone number to get back to you."
          : "Tell us about your event. Fill in as much or as little as you like, then send it to us with Gmail or WhatsApp."}
      </p>

      {/* Spam trap: hidden from people, filled in by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-9 grid gap-6 sm:grid-cols-2">
        <FormField id="fullName" label="Full name" error={errors.fullName} className="sm:col-span-2">
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
            aria-describedby={describedBy("fullName")}
            className={inputClasses(!!errors.fullName)}
          />
        </FormField>

        <FormField id="email" label="Email address" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={inputClasses(!!errors.email)}
          />
        </FormField>

        <FormField id="phone" label="Phone number" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+250"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            className={inputClasses(!!errors.phone)}
          />
        </FormField>

        <FormField id="eventType" label="Event type" error={errors.eventType}>
          <select
            id="eventType"
            name="eventType"
            value={values.eventType}
            onChange={(e) => update("eventType", e.target.value as EventType)}
            aria-invalid={!!errors.eventType}
            aria-describedby={describedBy("eventType")}
            className={cn(inputClasses(!!errors.eventType), !values.eventType && "text-white/45")}
          >
            <option value="" disabled>
              Choose event type
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="eventDate" label="Event date" error={errors.eventDate}>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            min={today || undefined}
            value={values.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
            aria-invalid={!!errors.eventDate}
            aria-describedby={describedBy("eventDate")}
            className={inputClasses(!!errors.eventDate)}
          />
        </FormField>

        <FormField id="location" label="Event location" error={errors.location} className="sm:col-span-2">
          <input
            id="location"
            name="location"
            placeholder="Venue and city"
            value={values.location}
            onChange={(e) => update("location", e.target.value)}
            aria-invalid={!!errors.location}
            aria-describedby={describedBy("location")}
            className={inputClasses(!!errors.location)}
          />
        </FormField>

        <FormField id="guests" label="Expected number of guests" error={errors.guests} hint="An estimate is fine.">
          <input
            id="guests"
            name="guests"
            type="number"
            inputMode="numeric"
            min={1}
            value={values.guests}
            onChange={(e) => update("guests", e.target.value)}
            aria-invalid={!!errors.guests}
            aria-describedby={describedBy("guests", true)}
            className={inputClasses(!!errors.guests)}
          />
        </FormField>

        <FormField id="budget" label="Budget range" error={errors.budget} hint="In RWF or USD, if you have one in mind.">
          <input
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
            aria-invalid={!!errors.budget}
            aria-describedby={describedBy("budget", true)}
            className={inputClasses(!!errors.budget)}
          />
        </FormField>

        <fieldset
          className="sm:col-span-2"
          aria-invalid={!!errors.services}
          aria-describedby={errors.services ? "services-error" : undefined}
        >
          <legend className="text-sm font-medium text-white">
            Services needed
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {SERVICE_OPTIONS.map((option, i) => {
              const checked = values.services.includes(option);
              return (
                <label
                  key={option}
                  className={cn(
                    "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-colors",
                    checked
                      ? "border-electric-500 bg-electric-600/15 text-white"
                      : "border-white/15 bg-night-900 text-white/85 hover:border-white/30",
                  )}
                >
                  <input
                    type="checkbox"
                    name={i === 0 ? "services" : undefined}
                    checked={checked}
                    onChange={(e) => toggleService(option, e.target.checked)}
                    className="size-4.5 shrink-0 cursor-pointer accent-electric-500"
                  />
                  {option}
                </label>
              );
            })}
          </div>
          <div className="mt-2">
            <FieldMessage id="services" error={errors.services} />
          </div>
        </fieldset>


        {hasWhatsApp && (
          <label className="flex cursor-pointer items-start gap-3 sm:col-span-2">
            <input
              type="checkbox"
              name="contactViaWhatsApp"
              checked={values.contactViaWhatsApp}
              onChange={(e) => update("contactViaWhatsApp", e.target.checked)}
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-electric-500"
            />
            <span className="text-white/90">I&apos;m happy to be contacted on WhatsApp.</span>
          </label>
        )}
      </div>

      <div ref={resultRef} tabIndex={-1} className="outline-none">
        {status === "error" && (
          <p role="alert" className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            Your inquiry could not be sent. Please check the highlighted fields and try again, or contact us directly by
            phone or email.
          </p>
        )}

        {status === "delivery-failed" && submitted && (
          <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl border border-electric-500/40 bg-electric-600/10 p-4 font-medium">
            <Info className="mt-0.5 size-5 shrink-0 text-electric-300" />
            Sorry, we couldn&apos;t send your inquiry online. Please send it with Gmail or WhatsApp below.
          </p>
        )}
      </div>

      {online && status !== "delivery-failed" ? (
        <button
          type="submit"
          disabled={status === "submitting"}
          className={buttonClasses("primary", "lg", "mt-9 w-full sm:w-auto")}
        >
          {status === "submitting" ? (
            <>
              <LoaderCircle className="size-5 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="size-4" /> Send Event Inquiry
            </>
          )}
        </button>
      ) : (
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            data-send-channel
            href={gmailComposeUrl(inquirySubject(values), inquiryToText(values))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!check(false)) e.preventDefault();
            }}
            className={buttonClasses("primary", "lg", "w-full sm:w-auto")}
          >
            <Mail className="size-4" /> Send with Gmail
          </a>
          {hasWhatsApp && (
            <a
              href={whatsappUrl(inquiryToWhatsApp(values))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!check(false)) e.preventDefault();
              }}
              className={buttonClasses("whatsapp", "lg", "w-full sm:w-auto")}
            >
              <SocialIcon network="whatsapp" className="size-5" /> Send on WhatsApp
            </a>
          )}
        </div>
      )}

      <p className="mt-5 text-sm leading-relaxed text-fog">
        We use the details you share only to respond to your inquiry and plan your event. We don&apos;t sell or share
        them with third parties. Questions? Email{" "}
        <a href={emailUrl()} className="text-electric-300 underline-offset-2 hover:underline">
          {siteConfig.contact.email}
        </a>
        .
      </p>
    </form>
  );
}
