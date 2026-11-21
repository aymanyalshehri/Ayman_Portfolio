"use client";

import React from "react";
import { Sparkles, Terminal } from "lucide-react";
import { cn } from "@/components/utils";
import { withBasePath } from "@/components/project-utils";

interface AymanAvatarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  glow?: boolean;
  interactive?: boolean;
}

export function AymanAvatar({
  size = "md",
  className = "",
  glow = true,
  interactive = true,
}: AymanAvatarProps) {
  const sizeClasses = {
    xs: "h-8 w-8 text-xs",
    sm: "h-10 w-10 text-sm",
    md: "h-16 w-16 text-xl",
    lg: "h-24 w-24 text-3xl",
    xl: "h-32 w-32 text-4xl",
    full: "w-full h-full text-5xl",
  }[size];

  const photoUrl = withBasePath("/ayman/ayman-photo.jpg");

  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center select-none overflow-hidden shrink-0",
        "border-2 border-teal-400/70 bg-gradient-to-br from-[#16253b] via-[#0d1624] to-[#050811]",
        glow && "shadow-[0_0_20px_rgba(45,212,191,0.35)]",
        interactive && "group transition-all duration-300 hover:scale-105 hover:border-teal-300 hover:shadow-[0_0_30px_rgba(45,212,191,0.55)]",
        sizeClasses,
        className
      )}
      title="أيمن يحيى الشهري"
      aria-label="صورة أيمن يحيى الشهري"
    >
      <img
        src={photoUrl}
        alt="أيمن يحيى الشهري"
        className="h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-teal-300/30 pointer-events-none" />
    </div>
  );
}

/**
 * High-end Executive Portrait Showcase Card
 * Used in the About page & Executive biography
 */
export function AymanExecutiveIdentityCard() {
  const photoUrl = withBasePath("/ayman/ayman-photo.jpg");

  return (
    <div className="relative w-full aspect-[4/4] rounded-2xl overflow-hidden border border-teal-400/30 shadow-2xl bg-gradient-to-br from-[#0f172a] via-[#090d16] to-[#04060d] flex flex-col items-center justify-between p-6 group">
      {/* Background Cyber Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(45,212,191,0.14),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

      {/* Top Header Pills */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/40 bg-slate-950/80 px-3 py-1 text-[0.7rem] font-mono text-teal-300 backdrop-blur-md shadow-md">
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-ping" />
          <span>متاح للفرص المهنية</span>
        </span>
        <span className="text-[0.7rem] font-mono font-medium text-teal-300 bg-slate-950/80 px-3 py-1 rounded-full border border-teal-400/30 backdrop-blur-md">
          MIS · Data Analyst
        </span>
      </div>

      {/* Center Portrait */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-4 rounded-full border border-teal-400/25 border-dashed animate-[spin_20s_linear_infinite]" />
          <div className="absolute -inset-8 rounded-full border border-sky-400/10 pointer-events-none" />

          <div className="relative h-36 w-36 sm:h-40 sm:w-40 rounded-full border-2 border-teal-400/70 bg-gradient-to-b from-[#132238] to-[#070b14] overflow-hidden shadow-[0_0_40px_rgba(45,212,191,0.35)] group-hover:shadow-[0_0_55px_rgba(45,212,191,0.55)] transition-all duration-500">
            <img
              src={photoUrl}
              alt="أيمن يحيى الشهري"
              className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Full Name Below Portrait */}
        <h3 className="mt-5 text-xl sm:text-2xl font-black text-white tracking-wide text-center drop-shadow-md">
          أيمن يحيى الشهري
        </h3>
        <p className="text-xs font-mono font-medium text-teal-300/90 mt-1 text-center">
          Ayman Yahya Alshehri · MIS &amp; BI
        </p>
      </div>

      {/* Bottom Status Footer */}
      <div className="relative z-10 w-full pt-3 border-t border-white/10 flex items-center justify-between text-[0.7rem] font-mono text-slate-100">
        <span className="flex items-center gap-1.5 text-teal-300">
          <Terminal className="h-3.5 w-3.5" />
          <span>Power BI · SQL · Excel</span>
        </span>
        <span className="flex items-center gap-1 text-slate-100">
          <Sparkles className="h-3 w-3 text-teal-400" />
          <span>Taibah Univ. (MIS)</span>
        </span>
      </div>
    </div>
  );
}
