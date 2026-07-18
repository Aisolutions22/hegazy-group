import { useCallback, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitRfq } from "./submit.functions";
import {
  INITIAL_RFQ,
  type RfqData,
  type RfqErrors,
  type RfqStatus,
  type RfqStep,
  type Timeline,
} from "./types";
import { useLanguage } from "@/lib/i18n/language-context";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Messages = {
  required: string;
  invalidEmail: string;
  fallbackError: string;
};

/**
 * Encapsulates every piece of stateful RFQ behavior: field values, per-step
 * validation, step navigation, and the server-fn submission handshake.
 * Components stay presentational; this hook is the single source of truth.
 */
export function useRfqForm(messages: Messages) {
  const { lang } = useLanguage();
  const submit$ = useServerFn(submitRfq);

  const [step, setStep] = useState<RfqStep>(0);
  const [data, setData] = useState<RfqData>(INITIAL_RFQ);
  const [errors, setErrors] = useState<RfqErrors>({});
  const [status, setStatus] = useState<RfqStatus>("idle");
  const [reference, setReference] = useState("");
  const [submitError, setSubmitError] = useState("");

  const set = useCallback(
    <K extends keyof RfqData>(key: K, value: RfqData[K]) => {
      setData((d) => ({ ...d, [key]: value }));
      setErrors((e) => ({ ...e, [key]: undefined }));
    },
    [],
  );

  const validateStep = useCallback(
    (s: number): boolean => {
      const next: RfqErrors = {};
      if (s === 0) {
        if (!data.category) next.category = messages.required;
        if (!data.alloy.trim()) next.alloy = messages.required;
      } else if (s === 1) {
        if (!data.quantity.trim() || Number(data.quantity) <= 0)
          next.quantity = messages.required;
        if (!data.timeline) next.timeline = messages.required;
      } else if (s === 2) {
        if (!data.name.trim()) next.name = messages.required;
        if (!data.company.trim()) next.company = messages.required;
        if (!data.email.trim()) next.email = messages.required;
        else if (!EMAIL_RE.test(data.email)) next.email = messages.invalidEmail;
      } else if (s === 3) {
        if (!data.consent) next.consent = messages.required;
      }
      setErrors(next);
      return Object.keys(next).length === 0;
    },
    [data, messages.required, messages.invalidEmail],
  );

  const goNext = useCallback(() => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(3, s + 1) as RfqStep);
  }, [step, validateStep]);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(0, s - 1) as RfqStep);
  }, []);

  const goTo = useCallback((target: RfqStep) => setStep(target), []);

  const submit = useCallback(async () => {
    if (!validateStep(3)) return;
    setStatus("submitting");
    setSubmitError("");
    try {
      const result = await submit$({
        data: {
          category: data.category,
          product: data.product || undefined,
          form: data.form || undefined,
          alloy: data.alloy,
          temper: data.temper || undefined,
          finish: data.finish || undefined,
          dimensions: data.dimensions || undefined,
          quantity: Number(data.quantity),
          unit: data.unit,
          useCase: data.useCase || undefined,
          timeline: data.timeline as Exclude<Timeline | "", "">,
          destination: data.destination || undefined,
          name: data.name,
          company: data.company,
          role: data.role || undefined,
          email: data.email,
          phone: data.phone || undefined,
          country: data.country || undefined,
          consent: true,
          locale: lang,
        },
      });
      setReference(result.reference);
      setStatus("success");
    } catch (err) {
      // Never log the payload — it contains user PII.
      const message =
        err instanceof Error && err.message ? err.message : messages.fallbackError;
      setSubmitError(message);
      setStatus("error");
    }
  }, [data, lang, messages.fallbackError, submit$, validateStep]);

  const reset = useCallback(() => {
    setData(INITIAL_RFQ);
    setErrors({});
    setStep(0);
    setReference("");
    setStatus("idle");
    setSubmitError("");
  }, []);

  return {
    step,
    data,
    errors,
    status,
    reference,
    submitError,
    set,
    goNext,
    goBack,
    goTo,
    submit,
    reset,
  } as const;
}

export type UseRfqForm = ReturnType<typeof useRfqForm>;
