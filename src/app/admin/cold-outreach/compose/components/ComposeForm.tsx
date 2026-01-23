"use client";

import { useState } from "react";
import RecipientFields from "./RecipientFields";
import TemplateSelector from "./TemplateSelector";
import EmailPreview from "./EmailPreview";

interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  subject: string;
  body: string;
  trackOpens: boolean;
  trackClicks: boolean;
  templateId: string;
}

type SendStatus = "idle" | "sending" | "success" | "error";

export default function ComposeForm() {
  const [form, setForm] = useState<FormState>({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    subject: "",
    body: "",
    trackOpens: true,
    trackClicks: true,
    templateId: "",
  });

  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState<{
    leadId: string;
    isNewLead: boolean;
  } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleFieldChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Clear email error when user types
    if (field === "email") {
      setEmailError("");
    }
  };

  const handleTemplateSelect = (
    subject: string,
    body: string,
    templateId: string
  ) => {
    setForm((prev) => ({
      ...prev,
      subject,
      body,
      templateId,
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!form.email || !form.firstName || !form.company || !form.subject || !form.body) {
      setErrorMessage("Please fill in all required fields");
      setSendStatus("error");
      return;
    }

    if (!validateEmail(form.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setSendStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/email/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          company: form.company,
          subject: form.subject,
          body: form.body,
          trackOpens: form.trackOpens,
          trackClicks: form.trackClicks,
          templateId: form.templateId || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setSendStatus("success");
      setSuccessData({
        leadId: data.leadId,
        isNewLead: data.isNewLead,
      });

      // Reset form after short delay
      setTimeout(() => {
        setForm({
          email: "",
          firstName: "",
          lastName: "",
          company: "",
          subject: "",
          body: "",
          trackOpens: true,
          trackClicks: true,
          templateId: "",
        });
        setSendStatus("idle");
        setSuccessData(null);
      }, 5000);
    } catch (error) {
      setSendStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send email");
    }
  };

  const isFormValid =
    form.email &&
    form.firstName &&
    form.company &&
    form.subject &&
    form.body &&
    validateEmail(form.email);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Status messages */}
        {sendStatus === "success" && successData && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-green-800 font-medium">Email sent successfully!</span>
            </div>
            <p className="text-green-700 text-sm mt-1">
              {successData.isNewLead
                ? "A new lead record was created."
                : "Email recorded in existing lead."}{" "}
              <a
                href={`/admin/leads/${successData.leadId}`}
                className="underline hover:no-underline"
              >
                View lead
              </a>
            </p>
          </div>
        )}

        {sendStatus === "error" && errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="text-red-800 font-medium">Failed to send email</span>
            </div>
            <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
          </div>
        )}

        {/* From address indicator */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-text-muted">From:</span>
          <span className="text-text-primary font-medium">Grant Bender &lt;grant@databender.co&gt;</span>
        </div>

        {/* Recipient fields */}
        <RecipientFields
          email={form.email}
          firstName={form.firstName}
          lastName={form.lastName}
          company={form.company}
          onChange={handleFieldChange}
          emailError={emailError}
        />

        <hr className="border-gray-200" />

        {/* Template selector */}
        <TemplateSelector onSelect={handleTemplateSelect} />

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={form.subject}
            onChange={(e) => handleFieldChange("subject", e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
            placeholder="Quick question about {{company}}'s data strategy"
          />
        </div>

        {/* Body - Plain textarea for Grammarly compatibility */}
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Email Body <span className="text-red-500">*</span>
          </label>
          <textarea
            id="body"
            name="body"
            value={form.body}
            onChange={(e) => handleFieldChange("body", e.target.value)}
            required
            rows={12}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-y min-h-[300px] font-mono text-sm leading-relaxed"
            placeholder={`Hi {{firstName}},

I noticed {{company}} has been growing rapidly. I'd love to share how we help companies like yours...

Best,
Grant`}
          />
          <p className="mt-1 text-xs text-text-muted">
            Supports **bold** text and [link text](url) markdown. Variables:{" "}
            {"{{firstName}}"}, {"{{lastName}}"}, {"{{company}}"}, {"{{email}}"}
          </p>
        </div>

        {/* Tracking options */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.trackOpens}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, trackOpens: e.target.checked }))
              }
              className="w-4 h-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500"
            />
            <span className="text-sm text-text-primary">Add tracking pixel</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.trackClicks}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, trackClicks: e.target.checked }))
              }
              className="w-4 h-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500"
            />
            <span className="text-sm text-text-primary">Track link clicks</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            disabled={!isFormValid}
            className="px-4 py-2.5 border border-gray-200 text-text-primary font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Preview
          </button>
          <button
            type="submit"
            disabled={!isFormValid || sendStatus === "sending"}
            className="px-6 py-2.5 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {sendStatus === "sending" ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send Email
              </>
            )}
          </button>
        </div>
      </form>

      {/* Preview modal */}
      <EmailPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        subject={form.subject}
        body={form.body}
        firstName={form.firstName}
        lastName={form.lastName}
        company={form.company}
        email={form.email}
      />
    </>
  );
}
