"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { withBasePath } from "@/components/project-utils";
import { useLanguage } from "@/components/language-context";

interface ProjectMediaGalleryProps {
  images: string[];
  title: string;
  category: string;
}

export function ProjectMediaGallery({
  images,
  title,
  category,
}: ProjectMediaGalleryProps) {
  const { t } = useLanguage();
  const resolvedImages = images.map((img) => encodeURI(withBasePath(img)));
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const total = resolvedImages.length;
  const currentImg = resolvedImages[activeIndex] || resolvedImages[0];

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, total]);

  return (
    <>
      <div className="space-y-3">
        <div
          onClick={() => setLightboxOpen(true)}
          className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-teal-400/30 shadow-2xl bg-[#121826] group cursor-zoom-in"
        >
          <img
            src={currentImg}
            alt={`${title} - ${activeIndex + 1}`}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e16]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="rounded-full border border-teal-400/30 bg-slate-950/85 px-3 py-1 text-xs font-bold text-teal-300 backdrop-blur-md shadow-md">
              {category}
            </span>
          </div>

          <div className="absolute bottom-3.5 inset-x-3.5 flex items-center justify-between z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/40 bg-slate-950/85 px-3 py-1.5 text-xs font-bold text-teal-300 backdrop-blur-md shadow-lg">
              <ZoomIn className="h-3.5 w-3.5" />
              <span>{t("اضغط للتكبير بملء الشاشة", "Click for Fullscreen View")}</span>
            </span>
            {total > 1 && (
              <span className="rounded-full border border-white/15 bg-slate-950/85 px-3 py-1 text-xs font-mono font-bold text-white backdrop-blur-md">
                {activeIndex + 1} / {total}
              </span>
            )}
          </div>
        </div>

        {total > 1 && (
          <div className="p-3 rounded-2xl border border-white/10 bg-[#121826]/90 flex items-center justify-between gap-3">
            <span className="text-xs font-mono font-bold text-teal-300 whitespace-nowrap">
              {t(`صفحات اللوحة (${total}):`, `Dashboard Pages (${total}):`)}
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
              {resolvedImages.map((imgUrl, idx) => (
                <button
                  key={imgUrl}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative h-12 w-20 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                    idx === activeIndex
                      ? "border-teal-400 ring-2 ring-teal-400/40 scale-105"
                      : "border-white/15 opacity-65 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${title} ${idx + 1}`}
                    className="h-full w-full object-cover object-top"
                  />
                  <span className="absolute bottom-0 right-0 bg-slate-950/90 px-1.5 py-0.5 text-[10px] font-mono font-bold text-teal-300">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="w-full max-w-6xl flex items-center justify-between mb-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-teal-400/40 bg-teal-400/10 px-3 py-1 text-xs font-mono font-bold text-teal-300">
                {t(`صفحة ${activeIndex + 1} من ${total}`, `Page ${activeIndex + 1} of ${total}`)}
              </span>
              <h3 className="text-sm sm:text-base font-bold truncate max-w-md sm:max-w-xl">
                {title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2.5 rounded-full border border-white/15 bg-white/10 text-white hover:bg-rose-500/20 hover:border-rose-400/50 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative w-full max-w-6xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {total > 1 && (
              <button
                type="button"
                onClick={goPrev}
                className="absolute right-2 sm:-right-14 z-20 p-3 rounded-full border border-teal-400/40 bg-slate-900/90 text-teal-300 hover:bg-teal-400 hover:text-slate-950 transition shadow-xl cursor-pointer"
                aria-label="Previous"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            <img
              src={currentImg}
              alt={`${title} - ${activeIndex + 1}`}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl border border-teal-400/30 shadow-2xl object-contain bg-black"
            />

            {total > 1 && (
              <button
                type="button"
                onClick={goNext}
                className="absolute left-2 sm:-left-14 z-20 p-3 rounded-full border border-teal-400/40 bg-slate-900/90 text-teal-300 hover:bg-teal-400 hover:text-slate-950 transition shadow-xl cursor-pointer"
                aria-label="Next"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
          </div>

          {total > 1 && (
            <div
              className="mt-4 flex items-center gap-2 overflow-x-auto max-w-full p-2 rounded-2xl bg-slate-900/80 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {resolvedImages.map((imgUrl, idx) => (
                <button
                  key={imgUrl}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative h-14 w-24 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                    idx === activeIndex
                      ? "border-teal-400 ring-2 ring-teal-400/50 scale-105"
                      : "border-white/15 opacity-55 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Page ${idx + 1}`}
                    className="h-full w-full object-cover object-top"
                  />
                  <span className="absolute bottom-0 right-0 bg-slate-950/90 px-1.5 py-0.5 text-[10px] font-mono font-bold text-teal-300">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
