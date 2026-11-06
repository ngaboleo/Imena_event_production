"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { FormField, inputClasses } from "@/components/forms/FormField";
import { buttonClasses } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { packages } from "@/data/packages";
import { whatsappUrl } from "@/lib/contact";
import { emptyQuote, quoteToWhatsAppMessage, validateQuote, type QuoteErrors } from "@/lib/quote";
import { cn } from "@/lib/utils";
import { EVENT_TYPES, SERVICE_OPTIONS, type EventType, type QuoteRequest } from "@/types";

type Status = "idle" | "submitting" | "success" | "error";

function initialValues(params: URLSearchParams): QuoteRequest {
  const values = { ...emptyQuote };
  const event = params.get("event");
  if (event && EVENT_TYPES.includes(event as EventType)) values.eventType = event as EventType;
  const pkg = packages.find((p) => p.id === params.get("package"));
  if (pkg) values.message = `I'm interested in the ${pkg.name} package.`;
  return values;
}

export function QuoteForm() {
  const params = useSearchParams();
  const [values, setValues] = useState<QuoteRequest>(() => initialValues(params));
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState<QuoteRequest | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const today = new Date().toISOString().split("T")[0];

  function update<K extends keyof QuoteRequest>(key: K, value: QuoteRequest[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateQuote(values);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const honeypot = (formRef.current?.elements.namedItem("company_website") as HTMLInputElement)?.value;
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company_website: honeypot }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { errors?: QuoteErrors };
        if (data.errors) setErrors(data.errors);
        throw new Error("Request failed");
      }
      setSubmitted(values);
      setStatus("success");
      setValues(emptyQuote);
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" && submitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex animate-page-in flex-col items-center rounded-panel bg-white px-6 py-16 text-center shadow-soft outline-none sm:px-12"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-brass-50 text-brass-600">
          <CircleCheck className="size-8" strokeWidth={1.6} />
        </span>
        <h2 className="mt-6 text-4xl text-pine-950">Request received</h2>
        <p className="mt-4 max-w-md text-lg text-muted">
          Thank you. We have received your event request and will contact you shortly.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          {submitted.contactViaWhatsApp && (
            <a
              href={whatsappUrl(quoteToWhatsAppMessage(submitted))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("whatsapp", "lg")}
            >
              <SocialIcon network="whatsapp" className="size-5" />
              Continue on WhatsApp
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
            Send another request
          </button>
        </div>
      </div>
    );
  }

  const describedBy = (key: keyof QuoteRequest, hint = false) =>
    errors[key] ? `${key}-error` : hint ? `${key}-hint` : undefined;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="quote-form-title"
      className="rounded-panel bg-white p-6 shadow-soft sm:p-10"
    >
      <h2 id="quote-form-title" className="text-4xl text-pine-950">
        Request a quotation
      </h2>
      <p className="mt-2 text-muted">
        Tell us about your event. Fields marked <span className="text-brass-600">*</span> are required.
      </p>

      {/* Spam trap: hidden from people, filled in by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-9 grid gap-6 sm:grid-cols-2">
        <FormField id="fullName" label="Full name" required error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
            aria-describedby={describedBy("fullName")}
            required
            className={inputClasses(!!errors.fullName)}
          />
        </FormField>

        <FormField id="phone" label="Phone / WhatsApp number" required error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            required
            className={inputClasses(!!errors.phone)}
          />
        </FormField>

        <FormField id="email" label="Email address" error={errors.email} className="sm:col-span-2">
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

        <FormField id="eventType" label="Event type" required error={errors.eventType}>
          <select
            id="eventType"
            name="eventType"
            value={values.eventType}
            onChange={(e) => update("eventType", e.target.value as EventType)}
            aria-invalid={!!errors.eventType}
            aria-describedby={describedBy("eventType")}
            required
            className={cn(inputClasses(!!errors.eventType), !values.eventType && "text-muted")}
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

        <FormField id="eventDate" label="Event date" required error={errors.eventDate}>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            min={today}
            value={values.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
            aria-invalid={!!errors.eventDate}
            aria-describedby={describedBy("eventDate")}
            required
            className={inputClasses(!!errors.eventDate)}
          />
        </FormField>

        <FormField id="location" label="Event location / venue" required error={errors.location} className="sm:col-span-2">
          <input
            id="location"
            name="location"
            value={values.location}
            onChange={(e) => update("location", e.target.value)}
            aria-invalid={!!errors.location}
            aria-describedby={describedBy("location")}
            required
            className={inputClasses(!!errors.location)}
          />
        </FormField>

        <FormField id="guests" label="Estimated number of guests" error={errors.guests} hint="An estimate is fine.">
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

        <FormField id="service" label="Service required" error={errors.service}>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={(e) => update("service", e.target.value as QuoteRequest["service"])}
            aria-invalid={!!errors.service}
            aria-describedby={describedBy("service")}
            className={cn(inputClasses(!!errors.service), !values.service && "text-muted")}
          >
            <option value="">Not sure yet</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="message" label="Message / additional information" error={errors.message} className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Programme timings, indoor or outdoor, speeches, live music…"
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
            className={cn(inputClasses(!!errors.message), "h-auto resize-y py-3")}
          />
        </FormField>

        <label className="flex cursor-pointer items-start gap-3 sm:col-span-2">
          <input
            type="checkbox"
            name="contactViaWhatsApp"
            checked={values.contactViaWhatsApp}
            onChange={(e) => update("contactViaWhatsApp", e.target.checked)}
            className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-pine-900"
          />
          <span className="text-pine-950">I would like to be contacted through WhatsApp.</span>
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          Your request could not be sent. Check the highlighted fields, or contact us directly on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClasses("primary", "lg", "mt-9 w-full sm:w-auto")}
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle className="size-5 animate-spin" /> Sending request…
          </>
        ) : (
          "Request quotation"
        )}
      </button>
    </form>
  );
}
