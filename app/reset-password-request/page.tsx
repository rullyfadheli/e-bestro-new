"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Mail,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";

const supabase = createClient();

const SupabaseRequestReset: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      // Supabase API call
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        throw error;
      }

      // If successful, Supabase sends the email. We update UI to notify the user.
      setStatus("success");
    } catch (error: unknown) {
      console.error("Error sending reset email:", error);

      // Handle specific Supabase error codes if needed, or default to generic message
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to send reset email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive a password reset link via Supabase.
          </p>
        </div>

        {/* Success State */}
        {status === "success" ? (
          <div className="rounded-md bg-green-50 p-4 animate-fade-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Check your email
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    We&apos;ve sent a reset link to <strong>{email}</strong>.
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Note: If the email isn&apos;t registered, you might not
                    receive a message (security measure).
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-sm font-medium text-green-600 hover:text-green-500"
                  >
                    Try another email
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Input Form */
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Error Feedback */}
            {status === "error" && (
              <div className="flex items-center text-red-600 text-sm mt-2 bg-red-50 p-2 rounded border border-red-100">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white 
                ${
                  isLoading
                    ? "bg-primary cursor-not-allowed"
                    : "bg-secondary  focus:outline-none focus:ring-2 focus:ring-offset-2"
                }
                transition duration-150 ease-in-out`}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>
          </form>
        )}

        {/* Back to Login Link */}
        <div className="text-center">
          <a
            href="/login"
            className="font-medium text-secondary  flex justify-between items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
            <span></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupabaseRequestReset;
