"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import toast from "react-hot-toast";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/portfolio/get-my-portfolio`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPortfolio(response.data);
    } catch (err) {
      console.error("Error fetching portfolio:", err);
      toast.error("Failed to load portfolio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-[var(--nav-height)]">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 xl:p-12 pb-20">
          <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
            <div className="mb-8 lg:mb-12 animate-fade-in-up">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-1.5">
                Your Portfolio ✨
              </h1>
              <p className="text-txt-secondary text-sm sm:text-[0.9375rem]">
                Preview your AI-generated premium portfolio.
              </p>
            </div>

            {loading ? (
              <div className="glass-card p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-accent-indigo/30 border-t-accent-indigo rounded-full animate-spin mb-4" />
                <p className="text-txt-secondary animate-pulse">Loading your masterpiece...</p>
              </div>
            ) : portfolio?.content ? (
              <div className="flex-1 min-h-[700px] glass-card overflow-hidden relative group">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                   <button 
                    onClick={() => {
                        const win = window.open("", "_blank");
                        win.document.write(portfolio.content);
                        win.document.close();
                    }}
                    className="btn-secondary py-2 px-4 text-xs flex items-center gap-2"
                   >
                     <span>Full Preview</span>
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                   </button>
                </div>
                <iframe
                  srcDoc={portfolio.content}
                  className="w-full h-full min-h-[700px] border-none"
                  title="Portfolio Preview"
                />
              </div>
            ) : (
              <div className="glass-card p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-[rgba(99,102,241,0.1)] flex items-center justify-center mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-txt-primary mb-2">No Portfolio Found</h3>
                <p className="text-sm text-txt-secondary max-w-md mb-6">
                  You haven't generated a portfolio yet. Upload your resume to get started!
                </p>
                <a href="/resumeupload" className="btn-primary px-6 py-2.5 text-sm">
                  Upload Resume
                </a>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

