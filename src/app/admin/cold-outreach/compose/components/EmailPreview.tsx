"use client";

import { useEffect, useRef } from "react";

interface EmailPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  body: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
}

/**
 * Convert plain text/markdown body to HTML for preview
 */
function markdownToHtml(text: string): string {
  // Escape HTML entities first
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Convert **bold** to <strong>
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Convert markdown links [text](url) to <a> tags
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" style="color: #1A9988; text-decoration: underline;">$1</a>'
  );

  // Convert newlines to paragraphs
  const paragraphs = html.split(/\n\n+/);
  html = paragraphs
    .map((p) => {
      // Convert single newlines within paragraphs to <br>
      const withBreaks = p.replace(/\n/g, "<br>");
      return `<p style="margin: 0 0 16px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">${withBreaks}</p>`;
    })
    .join("");

  return html;
}

/**
 * Replace template variables with actual values
 */
function replaceVariables(
  text: string,
  variables: Record<string, string>
): string {
  let result = text;
  for (const [key, value] of Object.entries(variables)) {
    const pattern = new RegExp(`\\{\\{${key}\\}\\}`, "gi");
    result = result.replace(pattern, value || `[${key}]`);
  }
  return result;
}

export default function EmailPreview({
  isOpen,
  onClose,
  subject,
  body,
  firstName,
  lastName,
  company,
  email,
}: EmailPreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const variables = { firstName, lastName, company, email };
  const processedSubject = replaceVariables(subject, variables);
  const processedBody = replaceVariables(body, variables);
  const htmlBody = markdownToHtml(processedBody);

  const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              ${htmlBody}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8f9fa; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 13px; text-align: center;">
                Databender - Rethink what's possible.
              </p>
              <p style="margin: 12px 0 0; color: #9ca3af; font-size: 12px; text-align: center;">
                <a href="#" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 w-full max-w-4xl p-0 rounded-xl shadow-2xl backdrop:bg-black/50"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Email Preview
            </h2>
            <p className="text-sm text-text-muted mt-0.5">
              This is how your email will appear to the recipient
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
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
          </button>
        </div>

        {/* Subject line preview */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-muted">Subject:</span>
            <span className="text-sm text-text-primary">{processedSubject}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-text-muted">To:</span>
            <span className="text-sm text-text-primary">
              {firstName} {lastName} &lt;{email}&gt;
            </span>
          </div>
        </div>

        {/* Email body preview */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <iframe
            srcDoc={fullHtml}
            title="Email Preview"
            className="w-full h-[500px] bg-white rounded-lg border border-gray-200"
            sandbox="allow-same-origin"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-text-primary font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </dialog>
  );
}
