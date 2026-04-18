"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    if (!email.trim()) { toast.error("Please enter your email"); return; }
    const toastId = toast.loading("Sending OTP...");
    try {
      const res = await axios.post("http://localhost:5050/user/send-otp", { email });
      toast.dismiss(toastId);
      if (res.data.success) { toast.success("OTP sent to your email 📩"); setStep(2); }
      else { toast.error(res.data.message); }
    } catch (err) { toast.dismiss(toastId); toast.error(err.response?.data?.message || "Error sending OTP"); }
  };

  const verifyOtp = async () => {
    if (!otp.trim()) { toast.error("Please enter the OTP"); return; }
    const toastId = toast.loading("Verifying OTP...");
    try {
      const res = await axios.post("http://localhost:5050/user/verify-otp", { email, otp });
      toast.dismiss(toastId);
      if (res.data.success) { toast.success("OTP Verified ✅"); setStep(3); }
      else { toast.error(res.data.message); }
    } catch (err) { toast.dismiss(toastId); toast.error(err.response?.data?.message || "Error verifying OTP"); }
  };

  const resetPassword = async () => {
    if (!newPassword.trim()) { toast.error("Please enter a new password"); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
    const toastId = toast.loading("Updating password...");
    try {
      const res = await axios.post("http://localhost:5050/user/reset-password", { email, password: newPassword });
      toast.dismiss(toastId);
      if (res.data.success) { toast.success("Password updated successfully! 🎉"); setTimeout(() => router.push("/login"), 1500); }
      else { toast.error(res.data.message); }
    } catch (err) { toast.dismiss(toastId); toast.error(err.response?.data?.message || "Error updating password"); }
  };

  const stepInfo = [
    { num: 1, label: "Email" },
    { num: 2, label: "Verify" },
    { num: 3, label: "Reset" },
  ];

  return (
    <div
      id="forgot-password-page"
      className="min-h-screen flex items-center justify-center pt-[calc(var(--nav-height)+16px)] sm:pt-[calc(var(--nav-height)+24px)] px-4 sm:px-6 pb-8 sm:pb-10 relative"
    >
      {/* Background glows */}
      <div className="absolute w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12),transparent_70%)] top-[15%] right-[15%] sm:right-[25%] blur-[60px] pointer-events-none" />
      <div className="absolute w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[radial-gradient(ellipse,rgba(168,85,247,0.1),transparent_70%)] bottom-[20%] left-[10%] sm:left-[20%] blur-[60px] pointer-events-none" />

      <div className="glass-card animate-fade-in-up w-full max-w-[440px] py-8 sm:py-12 px-6 sm:px-9 relative">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-accent-indigo to-accent-purple inline-flex items-center justify-center mb-4 sm:mb-5 shadow-[0_8px_32px_rgba(99,102,241,0.3)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h3 id="forgot-password-heading" className="text-xl sm:text-[1.75rem] font-extrabold tracking-tight mb-1.5 sm:mb-2">
            Reset Password
          </h3>
          <p className="text-sm sm:text-[0.9375rem] text-txt-secondary">
            {step === 1 && "Enter your email to receive a verification code"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Create a new secure password"}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          {stepInfo.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-[0.8125rem] font-bold transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    step >= s.num
                      ? "bg-linear-to-br from-accent-indigo to-accent-purple text-white border-none"
                      : "bg-bg-glass text-txt-muted border border-border-default"
                  } ${step === s.num ? "shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-110" : ""}`}
                >
                  {step > s.num ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : ( s.num )}
                </div>
                <span className={`text-[0.5625rem] sm:text-[0.6875rem] font-medium uppercase tracking-[0.05em] transition-colors duration-300 ${step >= s.num ? "text-txt-primary" : "text-txt-muted"}`}>
                  {s.label}
                </span>
              </div>
              {i < stepInfo.length - 1 && (
                <div className={`w-8 sm:w-[60px] h-0.5 mx-2 sm:mx-3 mb-5 sm:mb-[22px] rounded-full transition-all duration-500 ${
                  step > s.num ? "bg-linear-to-r from-accent-indigo to-accent-purple" : "bg-border-default"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <div className="animate-fade-in flex flex-col gap-4 sm:gap-5">
            <div>
              <label htmlFor="forgot-email" className="input-label">Email Address</label>
              <input type="email" id="forgot-email" placeholder="you@example.com" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendOtp()} />
            </div>
            <button id="send-otp-btn" onClick={sendOtp} className="btn-primary w-full py-3 sm:py-3.5 text-sm sm:text-[0.9375rem]">
              <span className="relative z-[1] flex items-center justify-center gap-2">
                Send Verification Code
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </span>
            </button>
          </div>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <div className="animate-fade-in flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center gap-2 py-2 sm:py-2.5 px-3 bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.15)] rounded-lg text-xs sm:text-[0.8125rem] text-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="truncate">Code sent to <strong className="text-link-hover">{email}</strong></span>
            </div>
            <div>
              <label htmlFor="forgot-otp" className="input-label">Verification Code</label>
              <input type="text" id="forgot-otp" placeholder="Enter 6-digit code" className="input-field tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-center text-base sm:text-lg" value={otp} onChange={(e) => setOtp(e.target.value)} onKeyDown={(e) => e.key === "Enter" && verifyOtp()} />
            </div>
            <div className="flex gap-2.5 sm:gap-3">
              <button onClick={() => setStep(1)} className="btn-secondary flex-1 py-3 sm:py-3.5 text-sm">Back</button>
              <button id="verify-otp-btn" onClick={verifyOtp} className="btn-primary flex-[2] py-3 sm:py-3.5 text-sm sm:text-[0.9375rem]">
                <span className="relative z-[1]">Verify Code</span>
              </button>
            </div>
            <p className="text-center text-xs sm:text-[0.8125rem] text-txt-muted">
              Didn&apos;t receive the code?{" "}
              <span onClick={sendOtp} className="text-link cursor-pointer font-semibold transition-colors duration-200 hover:text-link-hover">Resend</span>
            </p>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div className="animate-fade-in flex flex-col gap-4 sm:gap-5">
            <div>
              <label htmlFor="new-password" className="input-label">New Password</label>
              <input type="password" id="new-password" placeholder="••••••••" className="input-field" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="confirm-password" className="input-label">Confirm Password</label>
              <input type="password" id="confirm-password" placeholder="••••••••" className="input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && resetPassword()} />
            </div>
            <div className="flex items-center gap-2 text-[0.6875rem] sm:text-xs text-txt-muted">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Use at least 8 characters with a mix of letters and numbers
            </div>
            <button id="reset-password-btn" onClick={resetPassword} className="btn-primary w-full py-3 sm:py-3.5 text-sm sm:text-[0.9375rem]">
              <span className="relative z-[1] flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Update Password
              </span>
            </button>
          </div>
        )}

        {/* Back to login */}
        <p className="text-center text-[0.8125rem] sm:text-sm text-txt-secondary mt-5 sm:mt-7">
          Remember your password?{" "}
          <Link href="/login" id="back-to-login-link" className="text-link font-semibold no-underline transition-colors duration-200 hover:text-link-hover">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}