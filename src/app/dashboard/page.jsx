"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";

export default function Dashboard() {
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 17) setGreeting("Good Evening");
    else if (hour >= 12) setGreeting("Good Afternoon");
  }, []);

  const stats = [
    { title: "Resumes Uploaded", value: "3", icon: "📄", color: "#6366f1", trend: 12, trendLabel: "this month" },
    { title: "Skills Extracted", value: "24", icon: "⚡", color: "#a855f7", trend: 8, trendLabel: "new skills" },
    { title: "Portfolio Views", value: "142", icon: "👁️", color: "#ec4899", trend: 24, trendLabel: "vs last week" },
    { title: "Match Score", value: "87%", icon: "🎯", color: "#22c55e", trend: 5, trendLabel: "improvement" },
  ];

  const quickActions = [
    { label: "Upload Resume", href: "/resumeupload", icon: "📤", desc: "Upload a new PDF resume" },
    { label: "View Portfolio", href: "/portfolio", icon: "🌐", desc: "See your live portfolio" },
    { label: "Analyze Skills", href: "/dashboard", icon: "🔍", desc: "Deep-dive into your skills" },
  ];

  const activities = [
    { action: "Resume uploaded", detail: "resume_v3.pdf • 2.4 MB", time: "2h ago", icon: "📄" },
    { action: "Portfolio generated", detail: "Template: Developer Pro", time: "3h ago", icon: "🎨" },
    { action: "Skills analyzed", detail: "24 skills extracted", time: "3h ago", icon: "⚡" },
    { action: "Profile updated", detail: "Added bio and social links", time: "1d ago", icon: "✏️" },
    { action: "Account created", detail: "Welcome to NexFollio!", time: "2d ago", icon: "🎉" },
  ];

  const skills = [
    { name: "React", level: 92 },
    { name: "JavaScript", level: 88 },
    { name: "Node.js", level: 85 },
    { name: "TypeScript", level: 78 },
    { name: "Python", level: 72 },
    { name: "MongoDB", level: 68 },
  ];

  return (
    <div className="min-h-screen pt-[var(--nav-height)]">
      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 xl:p-12 pb-20">
          <div className="max-w-7xl mx-auto w-full">
            {/* Welcome Header */}
            <div className="mb-8 lg:mb-12 animate-fade-in-up">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-1.5">
              {greeting}, Developer 👋
            </h1>
            <p className="text-txt-secondary text-sm sm:text-[0.9375rem]">
              Here&apos;s what&apos;s happening with your portfolio today.
            </p>
          </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8 lg:mb-12 animate-fade-in-up [animation-delay:0.1s]">
            {stats.map((stat, i) => (
              <Card key={i} {...stat} />
            ))}
          </div>

            {/* Quick Actions + Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
            {/* Quick Actions */}
            <div className="lg:col-span-1 animate-fade-in-up [animation-delay:0.15s]">
              <h2 className="text-base lg:text-lg font-bold mb-3 lg:mb-4 flex items-center gap-2">
                <span className="w-1 h-4 lg:h-5 rounded-full bg-linear-to-b from-accent-indigo to-accent-purple" />
                Quick Actions
              </h2>
              <div className="flex flex-col gap-2.5">
                {quickActions.map((action, i) => (
                  <Link
                    key={i}
                    href={action.href}
                    className="glass-card-sm flex items-center gap-3 px-4 py-3 lg:py-3.5 no-underline transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.06)] hover:border-border-active cursor-pointer group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300 shrink-0">{action.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold text-txt-primary group-hover:text-white transition-colors duration-200 truncate">
                        {action.label}
                      </span>
                      <span className="block text-[0.6875rem] text-txt-muted mt-0.5 truncate">{action.desc}</span>
                    </div>
                    <svg
                      className="w-4 h-4 text-txt-muted group-hover:text-txt-primary group-hover:translate-x-0.5 transition-all duration-300 shrink-0"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2 animate-fade-in-up [animation-delay:0.2s]">
              <h2 className="text-base lg:text-lg font-bold mb-3 lg:mb-4 flex items-center gap-2">
                <span className="w-1 h-4 lg:h-5 rounded-full bg-linear-to-b from-accent-purple to-accent-pink" />
                Recent Activity
              </h2>
              <div className="glass-card p-4 sm:p-5">
                <div className="flex flex-col">
                  {activities.map((activity, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 py-3 ${
                        i < activities.length - 1 ? "border-b border-border-default" : ""
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.04)] border border-border-default flex items-center justify-center text-sm shrink-0">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.8125rem] font-semibold text-txt-primary truncate">{activity.action}</p>
                        <p className="text-[0.6875rem] text-txt-muted mt-0.5 truncate">{activity.detail}</p>
                      </div>
                      <span className="text-[0.625rem] text-txt-muted shrink-0 pt-0.5 whitespace-nowrap">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

            {/* Skills Overview */}
            <div className="animate-fade-in-up [animation-delay:0.25s]">
              <h2 className="text-base lg:text-lg font-bold mb-4 lg:mb-5 flex items-center gap-2">
                <span className="w-1 h-4 lg:h-5 rounded-full bg-linear-to-b from-accent-pink to-warning" />
                Top Skills
              </h2>
              <div className="glass-card p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
                  {skills.map((skill, i) => (
                    <div
                      key={i}
                      className="group text-center p-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-border-default hover:border-border-active hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 cursor-default"
                    >
                      <p className="text-[0.8125rem] font-bold text-txt-primary mb-2.5">{skill.name}</p>
                      <div className="w-full h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                        <div
                          className="progress-fill"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <p className="text-[0.6875rem] text-txt-muted mt-2 group-hover:text-accent-indigo transition-colors duration-300">
                        {skill.level}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
