"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

interface MFAStatus {
  enabled: boolean;
  backupCodesRemaining: number;
  enabledAt?: string;
  lastVerifiedAt?: string;
}

interface SetupData {
  secret: string;
  qrCodeDataUrl: string;
  backupCodes: string[];
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [mfaStatus, setMfaStatus] = useState<MFAStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Setup flow
  const [setupData, setSetupData] = useState<SetupData | null>(null);
  const [setupStep, setSetupStep] = useState<"idle" | "qr" | "verify" | "backup">("idle");
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");
  const [showBackupCodes, setShowBackupCodes] = useState<string[] | null>(null);

  useEffect(() => {
    fetchMFAStatus();
  }, []);

  const fetchMFAStatus = async () => {
    try {
      const response = await fetch("/api/admin/mfa/enable");
      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await response.json();
      setMfaStatus(data);
    } catch {
      setError("Failed to load MFA status");
    } finally {
      setLoading(false);
    }
  };

  const startSetup = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/mfa/setup");
      if (!response.ok) {
        throw new Error("Failed to generate setup");
      }
      const data = await response.json();
      setSetupData(data);
      setSetupStep("qr");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Setup failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyAndEnable = async () => {
    if (!setupData || !password) return;

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/mfa/enable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: setupData.secret,
          code: verifyCode,
          backupCodes: setupData.backupCodes,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Verification failed");
      }

      setShowBackupCodes(setupData.backupCodes);
      setSetupStep("backup");
      fetchMFAStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const disableMFA = async () => {
    if (!password) {
      setError("Password required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/mfa/disable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to disable MFA");
      }

      setPassword("");
      fetchMFAStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to disable MFA");
    } finally {
      setLoading(false);
    }
  };

  const regenerateBackupCodes = async () => {
    if (!password) {
      setError("Password required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/mfa/backup-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to regenerate codes");
      }

      setShowBackupCodes(data.backupCodes);
      setPassword("");
      fetchMFAStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to regenerate codes");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !mfaStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <a href="/admin/dashboard" className="text-teal-600 hover:text-teal-700 text-sm">
            &larr; Back to Dashboard
          </a>
        </div>

        <h1 className="text-2xl font-bold mb-8">Admin Settings</h1>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* MFA Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>

          {mfaStatus?.enabled ? (
            <div>
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>MFA is enabled</span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Backup codes remaining: {mfaStatus.backupCodesRemaining} of 10
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current password (required for changes)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter password"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={regenerateBackupCodes}
                    disabled={loading || !password}
                    variant="secondary"
                  >
                    Regenerate Backup Codes
                  </Button>

                  <button
                    onClick={disableMFA}
                    disabled={loading || !password}
                    className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Disable MFA
                  </button>
                </div>
              </div>
            </div>
          ) : setupStep === "idle" ? (
            <div>
              <p className="text-gray-600 mb-4">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <Button onClick={startSetup} disabled={loading}>
                Set Up MFA
              </Button>
            </div>
          ) : setupStep === "qr" && setupData ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, 1Password, etc.)
              </p>

              <div className="flex justify-center py-4">
                <img
                  src={setupData.qrCodeDataUrl}
                  alt="QR Code"
                  className="w-48 h-48"
                />
              </div>

              <p className="text-sm text-gray-500 text-center">
                Or enter this code manually: <code className="bg-gray-100 px-2 py-1 rounded">{setupData.secret}</code>
              </p>

              <Button onClick={() => setSetupStep("verify")} className="w-full">
                Continue
              </Button>
            </div>
          ) : setupStep === "verify" ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                Enter the 6-digit code from your authenticator app and your password to enable MFA.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification code
                </label>
                <input
                  type="text"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 text-center text-xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setSetupStep("qr")}
                  variant="secondary"
                >
                  Back
                </Button>
                <Button
                  onClick={verifyAndEnable}
                  disabled={loading || verifyCode.length !== 6 || !password}
                  className="flex-1"
                >
                  {loading ? "Verifying..." : "Enable MFA"}
                </Button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Backup Codes Display */}
        {showBackupCodes && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Save Your Backup Codes</h3>
            <p className="text-sm text-yellow-700 mb-4">
              These codes can be used to access your account if you lose your authenticator app.
              Each code can only be used once. Store them securely.
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {showBackupCodes.map((code, i) => (
                <code key={i} className="bg-white px-3 py-2 rounded border text-center font-mono">
                  {code}
                </code>
              ))}
            </div>

            <Button
              onClick={() => {
                setShowBackupCodes(null);
                setSetupStep("idle");
                setSetupData(null);
                setVerifyCode("");
                setPassword("");
              }}
              className="w-full"
            >
              I&apos;ve saved my backup codes
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center">
          <a href="/admin/dashboard" className="text-gray-500 hover:text-gray-700 text-sm">
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
