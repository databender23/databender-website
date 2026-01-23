"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type MFAMethod = "totp" | "email" | "backup";

function MFAVerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mfaToken = searchParams.get("token");

  const [code, setCode] = useState("");
  const [method, setMethod] = useState<MFAMethod>("totp");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSentTo, setEmailSentTo] = useState("");

  useEffect(() => {
    if (!mfaToken) {
      router.replace("/admin/login");
    }
  }, [mfaToken, router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mfaToken, code, method }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Verification failed");
        setCode("");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailOTP = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/mfa/email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mfaToken }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setEmailSent(true);
        setEmailSentTo(data.sentTo);
        setMethod("email");
      } else {
        setError(data.error || "Failed to send email");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mfaToken) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-2">
            Two-Factor Authentication
          </h1>
          <p className="text-gray-600 text-center mb-6">
            {method === "totp" && "Enter the code from your authenticator app"}
            {method === "email" && `Enter the code sent to ${emailSentTo}`}
            {method === "backup" && "Enter one of your backup codes"}
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder={method === "backup" ? "XXXX-XXXX" : "000000"}
                className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                autoFocus
                autoComplete="one-time-code"
                inputMode="numeric"
                maxLength={method === "backup" ? 9 : 6}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 py-2 px-4 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={loading || code.length < 6}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="space-y-3">
              {method !== "email" && (
                <button
                  onClick={handleSendEmailOTP}
                  disabled={loading}
                  className="w-full text-sm text-teal-600 hover:text-teal-700 disabled:opacity-50"
                >
                  {emailSent ? "Resend code to email" : "Send code to email instead"}
                </button>
              )}

              {method !== "backup" && (
                <button
                  onClick={() => {
                    setMethod("backup");
                    setCode("");
                    setError("");
                  }}
                  className="w-full text-sm text-gray-500 hover:text-gray-700"
                >
                  Use a backup code
                </button>
              )}

              {method !== "totp" && (
                <button
                  onClick={() => {
                    setMethod("totp");
                    setCode("");
                    setError("");
                  }}
                  className="w-full text-sm text-gray-500 hover:text-gray-700"
                >
                  Use authenticator app
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 text-center">
            <a
              href="/admin/login"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MFAVerifyLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-gray-500">Loading...</div>
    </div>
  );
}

export default function MFAVerifyPage() {
  return (
    <Suspense fallback={<MFAVerifyLoading />}>
      <MFAVerifyContent />
    </Suspense>
  );
}
