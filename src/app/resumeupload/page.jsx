"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResumeUpload() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Only run on client
    setToken(localStorage.getItem("token"));
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      toast.error("Please upload a PDF file only");
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/portfolio/upload-pdf`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setUploadProgress(percent);
          },
        },
      );

      toast.success("Resume uploaded successfully! 🎉");
      setFile(null);
      setUploadProgress(0);
      
      // Redirect to portfolio preview
      setTimeout(() => {
        router.push("/portfolio");
      }, 1000);
    } catch (err) {
      console.log(err);

      if (err.response?.status === 503) {
        toast.error("AI service is busy. Retrying automatically...", {
          duration: 3000,
        });
        // You could add auto-retry logic here too
      } else {
        const errorMsg = err.response?.data?.error?.message || err.response?.data?.message || "Upload failed ❌";
        toast.error(errorMsg);
      }
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen pt-[var(--nav-height)]">
      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 xl:p-10">
          {/* Header */}
          <div className="mb-6 lg:mb-8 animate-fade-in-up">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-1.5">
              Upload Resume 📄
            </h1>
            <p className="text-txt-secondary text-sm sm:text-[0.9375rem]">
              Upload your PDF resume and let AI extract your skills, projects
              &amp; experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* ===== Upload Zone (Left) ===== */}
            <div className="lg:col-span-2 animate-fade-in-up [animation-delay:0.1s]">
              {/* Drop zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`glass-card relative overflow-hidden cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] p-8 sm:p-10 lg:p-14 text-center group ${
                  isDragging
                    ? "border-accent-indigo bg-[rgba(99,102,241,0.08)] scale-[1.01] shadow-[0_0_40px_rgba(99,102,241,0.15)]"
                    : "hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.02)]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Shimmer effect on drag */}
                {isDragging && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(99,102,241,0.05),transparent)]" />
                  </div>
                )}

                {/* Upload icon */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-6 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-400 ${
                    isDragging
                      ? "bg-[rgba(99,102,241,0.2)] border-accent-indigo scale-110"
                      : "bg-[rgba(99,102,241,0.1)] border-[rgba(99,102,241,0.2)] group-hover:scale-105"
                  } border`}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-400 ${isDragging ? "-translate-y-1" : "group-hover:-translate-y-0.5"}`}
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-2 text-txt-primary">
                  {isDragging
                    ? "Drop your file here"
                    : "Drag & drop your resume"}
                </h3>
                <p className="text-sm text-txt-secondary mb-3">
                  or{" "}
                  <span className="text-link font-semibold">browse files</span>{" "}
                  from your computer
                </p>
                <p className="text-xs text-txt-muted">
                  Supports PDF files up to 10MB
                </p>
              </div>

              {/* File Info Card */}
              {file && (
                <div className="glass-card-sm mt-3 sm:mt-4 p-4 flex items-center gap-3 animate-scale-in">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] flex items-center justify-center shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-txt-primary truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-txt-muted mt-0.5">
                      {formatFileSize(file.size)} • PDF
                    </p>
                  </div>
                  <button
                    onClick={removeFile}
                    className="w-8 h-8 rounded-lg bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.2)] text-error flex items-center justify-center hover:bg-[rgba(248,113,113,0.2)] transition-all duration-200 cursor-pointer shrink-0 text-sm font-bold"
                    aria-label="Remove file"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Progress Bar */}
              {uploading && (
                <div className="mt-3 sm:mt-4 glass-card-sm p-3 sm:p-4 animate-fade-in">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-txt-secondary font-medium flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-accent-indigo/30 border-t-accent-indigo rounded-full animate-spin-slow" />
                      Uploading...
                    </span>
                    <span className="text-link font-semibold">
                      {uploadProgress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                    <div
                      className="progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className={`btn-primary w-full py-3.5 text-sm sm:text-[0.9375rem] mt-4 sm:mt-5 ${
                  !file || uploading
                    ? "opacity-40 cursor-not-allowed hover:transform-none hover:shadow-none"
                    : ""
                }`}
              >
                <span className="relative z-[1] flex items-center justify-center gap-2">
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Upload & Analyze
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* ===== Tips Sidebar (Right) ===== */}
            <div className="lg:col-span-1 flex flex-col gap-3 sm:gap-4 animate-fade-in-up [animation-delay:0.2s]">
              {/* Tips card */}
              <div className="glass-card p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[rgba(168,85,247,0.1)] border border-[rgba(168,85,247,0.2)] flex items-center justify-center text-sm shrink-0">
                    💡
                  </span>
                  Upload Tips
                </h3>

                <div className="flex flex-col gap-3 sm:gap-4">
                  {[
                    {
                      title: "Use a clean format",
                      desc: "Well-structured resumes yield better AI results.",
                      icon: "✨",
                    },
                    {
                      title: "Include all sections",
                      desc: "Skills, experience, education improve accuracy.",
                      icon: "📋",
                    },
                    {
                      title: "PDF format only",
                      desc: "PDF files give the best text extraction.",
                      icon: "📎",
                    },
                    {
                      title: "Keep it updated",
                      desc: "Latest resume = most accurate portfolio.",
                      icon: "🔄",
                    },
                  ].map((tip, i) => (
                    <div
                      key={i}
                      className={`flex gap-2.5 ${i < 3 ? "pb-3 sm:pb-4 border-b border-border-default" : ""}`}
                    >
                      <span className="text-sm mt-0.5 shrink-0">
                        {tip.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.8125rem] font-semibold text-txt-primary mb-0.5">
                          {tip.title}
                        </p>
                        <p className="text-[0.6875rem] text-txt-muted leading-relaxed">
                          {tip.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What we extract */}
              <div className="glass-card-sm p-4 sm:p-5">
                <h4 className="text-[0.8125rem] sm:text-sm font-bold mb-2.5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.15)] flex items-center justify-center text-[0.625rem] shrink-0">
                    🔍
                  </span>
                  What we extract
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Skills",
                    "Projects",
                    "Experience",
                    "Education",
                    "Contact",
                    "Summary",
                  ].map((item, i) => (
                    <span key={i} className="chip text-[0.6875rem] py-1 px-2.5">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="glass-card-sm p-4 sm:p-5">
                <h4 className="text-[0.8125rem] sm:text-sm font-bold mb-2.5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.15)] flex items-center justify-center text-[0.625rem] shrink-0">
                    ✅
                  </span>
                  Requirements
                </h4>
                <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
                  {[
                    "PDF format (.pdf)",
                    "Max size: 10MB",
                    "English language",
                    "Standard layout",
                  ].map((req, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-[0.6875rem] text-txt-secondary"
                    >
                      <span className="w-1 h-1 rounded-full bg-success shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-6" />
        </main>
      </div>
    </div>
  );
}
