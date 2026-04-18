"use client";

import { useId, useMemo, useState } from "react";

export type InquiryFieldType = "text" | "email" | "textarea" | "select";

export interface InquiryField {
  name: string;
  label: string;
  type?: InquiryFieldType;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  options?: string[];
}

export interface InquiryHiddenField {
  name: string;
  label: string;
  value?: string;
}

interface StructuredInquiryFormProps {
  title: string;
  context: string;
  subject: string;
  fields: InquiryField[];
  hiddenFields?: InquiryHiddenField[];
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  errorMessage: string;
  onSubmitSuccess?: () => void;
  className?: string;
}

export default function StructuredInquiryForm({
  title,
  context,
  subject,
  fields,
  hiddenFields = [],
  submitLabel,
  sendingLabel,
  successMessage,
  errorMessage,
  onSubmitSuccess,
  className = "",
}: StructuredInquiryFormProps) {
  const formPrefix = useId();
  const initialData = useMemo(() => {
    return fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {});
  }, [fields]);

  const [formData, setFormData] = useState<Record<string, string>>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setSubmitStatus("idle");
  };

  const buildMessage = () => {
    const lines = fields.map((field) => {
      const value = formData[field.name]?.trim() || "-";
      return `${field.label}: ${value}`;
    });

    const hiddenLines = hiddenFields
      .filter((field) => field.value?.trim())
      .map((field) => `${field.label}: ${field.value}`);

    return [
      `${context}`,
      "",
      ...lines,
      ...(hiddenLines.length > 0 ? ["", "Estimator:", ...hiddenLines] : []),
    ].join("\n");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const nameField = fields.find((field) => field.name === "name") || fields[0];
    const emailField = fields.find((field) => field.name === "email");
    const name = formData[nameField?.name || "name"]?.trim() || context;
    const email = emailField ? formData[emailField.name]?.trim() : "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message: buildMessage(),
        }),
      });

      if (!response.ok) {
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");
      setFormData(initialData);
      onSubmitSuccess?.();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`fm-panel ${className}`}>
      <h3 className="text-2xl font-bold text-white mb-6 font-orbitron">{title}</h3>

      {submitStatus === "success" && (
        <div role="status" aria-live="polite" className="mb-6 border border-green-500/70 bg-green-950/30 p-4 text-sm text-green-200 font-rajdhani">
          {successMessage}
        </div>
      )}

      {submitStatus === "error" && (
        <div role="alert" aria-live="assertive" className="mb-6 border border-red-500/70 bg-red-950/35 p-4 text-sm text-red-200 font-rajdhani">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-5">
        {fields.map((field) => {
          const inputId = `${formPrefix}-${field.name}`;
          const fieldType = field.type || "text";

          if (fieldType === "textarea") {
            return (
              <div key={field.name}>
                <label htmlFor={inputId} className="block text-sm font-bold text-white mb-2 font-orbitron tracking-wide">
                  {field.label}{field.required ? " *" : ""}
                </label>
                <textarea
                  id={inputId}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                  rows={field.rows || 4}
                  placeholder={field.placeholder}
                  className="w-full bg-black/55 border border-zinc-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400"
                />
              </div>
            );
          }

          if (fieldType === "select") {
            return (
              <div key={field.name}>
                <label htmlFor={inputId} className="block text-sm font-bold text-white mb-2 font-orbitron tracking-wide">
                  {field.label}{field.required ? " *" : ""}
                </label>
                <select
                  id={inputId}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full bg-black/55 border border-zinc-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400"
                >
                  <option value="">{field.placeholder || field.label}</option>
                  {(field.options || []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          return (
            <div key={field.name}>
              <label htmlFor={inputId} className="block text-sm font-bold text-white mb-2 font-orbitron tracking-wide">
                {field.label}{field.required ? " *" : ""}
              </label>
              <input
                id={inputId}
                type={fieldType}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full bg-black/55 border border-zinc-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400"
              />
            </div>
          );
        })}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-700 hover:bg-red-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white px-6 py-3 font-orbitron font-bold transition-colors border border-red-500"
        >
          {isSubmitting ? sendingLabel : submitLabel}
        </button>
      </form>
    </div>
  );
}
