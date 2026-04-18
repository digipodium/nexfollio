"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = ["Home", "Dashboard", "Login", "Signup"];

const FEATURES = [
  {
    icon: "🧠",
    title: "AI Resume Parsing",
    desc: "Our advanced AI reads and understands every section of your resume — work experience, skills, projects, and education — with 95% accuracy.",
  },
  {
    icon: "⚡",
    title: "Instant Generation",
    desc: "Portfolio websites generated in under 30 seconds. No waiting, no queues. Your professional online presence, ready immediately.",
  },
  {
    icon: "🎨",
    title: "Beautiful Themes",
    desc: "Choose from dozens of stunning, recruiter-approved portfolio themes. Each one optimized for ATS systems and human eyes alike.",
  },
  {
    icon: "🚀",
    title: "One-Click Deploy",
    desc: "Your portfolio goes live on a custom subdomain the moment it's generated. Share the link directly from the dashboard.",
  },
];

const STEPS = [
  { num: "01", title: "Upload Resume", desc: "Drop your PDF or DOCX resume into our secure uploader." },
  { num: "02", title: "AI Extracts Data", desc: "Our model identifies skills, roles, projects, and achievements." },
  { num: "03", title: "Portfolio Generated", desc: "A tailored portfolio website is built for you automatically." },
  { num: "04", title: "Go Live Instantly", desc: "Share your unique URL with recruiters and the world." },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Software Engineer @ Google", text: "I landed 3 interviews in a week after sharing my NexFollio portfolio. The AI captured my work better than I ever could.", avatar: "PS" },
  { name: "James O'Brien", role: "UX Designer @ Figma", text: "Took me 60 seconds to generate. My portfolio looks like I spent months on it. Recruiters keep complimenting it.", avatar: "JO" },
  { name: "Aisha Rahman", role: "Data Scientist @ Meta", text: "The AI narrative for my projects was spot-on. It even highlighted achievements I had undersold in my resume.", avatar: "AR" },
];

export default function Home() {
  const [uploadState, setUploadState] = useState("idle");

  const handleUpload = () => {
    setUploadState("loading");
    setTimeout(() => setUploadState("done"), 2500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0d0f1a", color: "#e8eaf6", fontFamily: "'Plus Jakarta Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --purple: #7c3aed; --purple-light: #a78bfa;
          --pink: #ec4899; --pink-light: #f9a8d4;
          --navy: #0d0f1a; --navy-2: #111320; --navy-3: #161928; --navy-4: #1e2235;
          --border: rgba(124,58,237,0.2); --text-muted: #8892b0; --text-mid: #a0aec0;
        }
        .grad-text {
          background: linear-gradient(135deg, #a78bfa 0%, #ec4899 60%, #f472b6 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .grad-btn {
          background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; border: none;
          border-radius: 100px; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600; font-size: 15px; display: inline-flex; align-items: center;
          gap: 8px; transition: transform 0.2s, box-shadow 0.2s;
        }
        .grad-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(124,58,237,0.45); }
        .ghost-btn {
          background: transparent; color: #e8eaf6;
          border: 1.5px solid rgba(255,255,255,0.15); border-radius: 100px; cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 15px;
          display: inline-flex; align-items: center; gap: 8px; transition: border-color 0.2s, background 0.2s;
        }
        .ghost-btn:hover { border-color: rgba(167,139,250,0.5); background: rgba(124,58,237,0.08); }
        .nav-link { color: var(--text-muted); font-size: 14px; font-weight: 500; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #e8eaf6; }
        .pill-badge {
          display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px;
          border-radius: 100px; background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.35); font-size: 13px; font-weight: 500; color: #a78bfa;
        }
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .feature-card {
          background: var(--navy-3); border: 1px solid var(--border); border-radius: 16px; padding: 28px;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .feature-card:hover { border-color: rgba(124,58,237,0.5); transform: translateY(-4px); box-shadow: 0 16px 48px rgba(124,58,237,0.15); }
        .step-card { background: var(--navy-3); border: 1px solid var(--border); border-radius: 16px; padding: 28px; position: relative; overflow: hidden; }
        .testimonial-card { background: var(--navy-3); border: 1px solid var(--border); border-radius: 16px; padding: 28px; transition: border-color 0.3s; }
        .testimonial-card:hover { border-color: rgba(236,72,153,0.4); }
        .upload-zone { border: 2px dashed rgba(124,58,237,0.3); border-radius: 20px; background: rgba(124,58,237,0.04); transition: border-color 0.3s, background 0.3s; cursor: pointer; text-align: center; }
        .upload-zone:hover { border-color: rgba(124,58,237,0.6); background: rgba(124,58,237,0.08); }
        .stat-num { font-family: 'Syne', sans-serif; font-size: 42px; font-weight: 800; }
        .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); }
        .avatar-circle { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #7c3aed, #ec4899); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: white; flex-shrink: 0; }
        .shimmer-bar { border-radius: 4px; background: linear-gradient(90deg, #1e2235 25%, #2a2f4a 50%, #1e2235 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease forwards; opacity: 0; }
        .d1 { animation-delay: 0.05s; } .d2 { animation-delay: 0.2s; } .d3 { animation-delay: 0.35s; } .d4 { animation-delay: 0.5s; } .d5 { animation-delay: 0.65s; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .pulse-dot { width: 7px; height: 7px; border-radius: 50%; background: #a78bfa; animation: pulseDot 2s ease-in-out infinite; }
        @keyframes pulseDot { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(167,139,250,0.4); } 50% { opacity: 0.7; box-shadow: 0 0 0 5px rgba(167,139,250,0); } }
        .section-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(32px, 4vw, 48px); line-height: 1.1; color: #e8eaf6; }
        .grid-bg { background-image: linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px); background-size: 48px 48px; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 40px", background: "rgba(13,15,26,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #7c3aed, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "white" }}>N</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18 }}>NexFollio</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {NAV_LINKS.map(l => <Link key={l} href={`/${l.toLowerCase()}`} className="nav-link">{l}</Link>)}
        </div>
        <button className="grad-btn" style={{ padding: "10px 22px" }}>Get Started →</button>
      </nav>

      {/* HERO */}
      <section className="grid-bg" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", overflow: "hidden" }}>
        <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(124,58,237,0.18)", top: "10%", left: "8%", animation: "float 8s ease-in-out infinite" }} />
        <div className="glow-orb" style={{ width: 400, height: 400, background: "rgba(236,72,153,0.12)", bottom: "10%", right: "8%", animation: "float 10s ease-in-out infinite reverse" }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "rgba(124,58,237,0.08)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 820 }}>
          <div className="pill-badge fade-up d1" style={{ marginBottom: 28 }}>
            <div className="pulse-dot" /> AI-Powered Portfolio Builder
          </div>
          <h1 className="fade-up d2" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(44px, 7vw, 88px)", lineHeight: 1.05, marginBottom: 24, color: "#ffffff" }}>
            Transform Your Resume<br />Into a <span className="grad-text">Stunning<br />Portfolio</span>
          </h1>
          <p className="fade-up d3" style={{ fontSize: 18, lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 560, margin: "0 auto 36px", fontWeight: 400 }}>
            Upload your PDF resume and let our AI extract your skills, projects & experience — then generate a professional portfolio website in seconds.
          </p>
          <div className="fade-up d4" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 56, flexWrap: "wrap" }}>
            <button className="grad-btn" style={{ padding: "14px 28px", fontSize: 16 }} onClick={() => document.getElementById("upload-section").scrollIntoView({ behavior: "smooth" })}>
              Get Started Free →
            </button>
            <button className="ghost-btn" style={{ padding: "14px 28px", fontSize: 16 }}>View Dashboard</button>
          </div>
          <div className="fade-up d5" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
            {[{ val: "10K+", label: "PORTFOLIOS GENERATED" }, { val: "95%", label: "ACCURACY RATE" }, { val: "<30s", label: "GENERATION TIME" }].map(({ val, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div className="stat-num grad-text">{val}</div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: "var(--text-muted)", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD */}
      <section id="upload-section" style={{ padding: "100px 24px", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="pill-badge" style={{ marginBottom: 16, display: "inline-flex" }}>Try It Now</div>
          <h2 className="section-title">Drop Your Resume</h2>
        </div>
        {uploadState === "idle" && (
          <div className="upload-zone" style={{ padding: "60px 40px" }} onClick={handleUpload}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
            <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Drag & drop your resume</p>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>PDF, DOCX, or TXT — max 10MB</p>
            <button className="grad-btn" style={{ padding: "12px 28px" }}>Choose File</button>
          </div>
        )}
        {uploadState === "loading" && (
          <div className="upload-zone" style={{ padding: "60px 40px" }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>🤖</div>
            <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 24, color: "#a78bfa" }}>AI is analyzing your resume...</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320, margin: "0 auto" }}>
              {["Parsing resume structure", "Extracting work experience", "Identifying key skills", "Generating portfolio"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="shimmer-bar" style={{ height: 8, width: `${55 + i * 12}%` }} />
                  <span style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {uploadState === "done" && (
          <div className="upload-zone" style={{ padding: "60px 40px", borderColor: "rgba(167,139,250,0.6)", background: "rgba(124,58,237,0.08)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Portfolio Generated!</p>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 28 }}>your-name.nexfollio.io is live and ready</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="grad-btn" style={{ padding: "12px 24px" }}>View Portfolio →</button>
              <button className="ghost-btn" style={{ padding: "12px 20px" }} onClick={() => setUploadState("idle")}>Try Again</button>
            </div>
          </div>
        )}
      </section>

      <hr className="divider" />

      {/* FEATURES */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="pill-badge" style={{ marginBottom: 16, display: "inline-flex" }}>Features</div>
            <h2 className="section-title">Everything You Need to <span className="grad-text">Stand Out</span></h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, marginTop: 16, maxWidth: 500, margin: "16px auto 0" }}>Our AI handles every detail so your portfolio always looks like it was made by a world-class designer.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="feature-card">
                <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px 24px", background: "var(--navy-2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="pill-badge" style={{ marginBottom: 16, display: "inline-flex" }}>How It Works</div>
            <h2 className="section-title">From PDF to Live Site <span className="grad-text">in 4 Steps</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="step-card">
                <div style={{ display: "inline-block", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, padding: "4px 12px", borderRadius: 100, background: "rgba(124,58,237,0.15)", color: "#a78bfa", marginBottom: 16, letterSpacing: "0.05em" }}>{num}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 19, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="pill-badge" style={{ marginBottom: 16, display: "inline-flex" }}>Testimonials</div>
            <h2 className="section-title">Loved by <span className="grad-text">Professionals</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map(({ name, role, text, avatar }) => (
              <div key={name} className="testimonial-card">
                <div style={{ fontSize: 18, color: "#ec4899", marginBottom: 16 }}>★★★★★</div>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-mid)", marginBottom: 20 }}>"{text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="avatar-circle">{avatar}</div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{name}</p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* PRICING */}
      <section style={{ padding: "100px 24px", background: "var(--navy-2)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="pill-badge" style={{ marginBottom: 16, display: "inline-flex" }}>Pricing</div>
            <h2 className="section-title">Simple, <span className="grad-text">Transparent Pricing</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { name: "Free", price: "$0", period: "/forever", highlight: false, features: ["1 portfolio", "NexFollio subdomain", "AI generation", "3 theme choices", "Basic analytics"], cta: "Start Free" },
              { name: "Pro", price: "$12", period: "/month", highlight: true, features: ["Unlimited portfolios", "Custom domain", "Premium AI writing", "All themes", "Advanced analytics", "Priority support"], cta: "Go Pro →" },
            ].map(({ name, price, period, features, cta, highlight }) => (
              <div key={name} style={{ background: highlight ? "linear-gradient(145deg, rgba(124,58,237,0.15), rgba(236,72,153,0.1))" : "var(--navy-3)", border: highlight ? "1.5px solid rgba(124,58,237,0.5)" : "1px solid var(--border)", borderRadius: 20, padding: "36px 32px", boxShadow: highlight ? "0 0 48px rgba(124,58,237,0.2)" : "none" }}>
                {highlight && <div style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "3px 12px", borderRadius: 100, background: "rgba(124,58,237,0.2)", color: "#a78bfa", marginBottom: 16, letterSpacing: "0.06em" }}>MOST POPULAR</div>}
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 500 }}>{name}</span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 6 }}>
                    <span className={highlight ? "grad-text" : ""} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 48 }}>{price}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: 14 }}>{period}</span>
                  </div>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                      <span style={{ color: "#a78bfa", fontSize: 16 }}>✓</span>
                      <span style={{ color: "var(--text-mid)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                {highlight
                  ? <button className="grad-btn" style={{ width: "100%", padding: "14px", justifyContent: "center" }}>{cta}</button>
                  : <button className="ghost-btn" style={{ width: "100%", padding: "14px", justifyContent: "center" }}>{cta}</button>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="glow-orb" style={{ width: 600, height: 400, background: "rgba(124,58,237,0.12)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "rgba(236,72,153,0.1)", top: "20%", right: "15%" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="pill-badge" style={{ marginBottom: 24, display: "inline-flex" }}>Ready to start?</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.1, marginBottom: 20 }}>
            Build Your Portfolio<br /><span className="grad-text">In Under 30 Seconds</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 17, maxWidth: 480, margin: "0 auto 36px" }}>
            Join 10,000+ professionals who landed their dream jobs with a NexFollio portfolio.
          </p>
          <button className="grad-btn" style={{ padding: "16px 36px", fontSize: 17 }}>Get Started Free →</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "28px 40px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg, #7c3aed, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, color: "white" }}>N</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15 }}>NexFollio</span>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>© 2025 NexFollio. All rights reserved.</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}