import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Layers,
  Sparkles,
  ZoomIn,
} from "lucide-react";
import { PageVideoShell } from "@/components/page-video-shell";
import { ProjectVisual } from "@/components/project-card";
import { getProjectImageUrl, withBasePath } from "@/components/project-utils";
import { SectionReveal } from "@/components/section-reveal";
import { projects } from "@/data/portfolio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project
    ? {
        title: `${project.title} | أيمن يحيى الشهري`,
        description: project.summary,
      }
    : {};
}

function GradientTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-l from-teal-300 via-slate-100 to-purple-300 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const imageUrl = getProjectImageUrl(project);

  return (
    <PageVideoShell className="projects-detail-shell">
      <div className="relative w-full pt-28 pb-24 text-right">
        {/* Top Back Link + Hero Header */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-300 hover:text-white transition mb-6"
          >
            <ArrowRight className="h-4 w-4" />
            <span>العودة إلى كافة المشاريع</span>
          </Link>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Project Copy */}
            <SectionReveal className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-teal-300 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                <span>لوحة Power BI · {project.category}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                <GradientTitle>{project.title}</GradientTitle>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.summary}
              </p>

              {/* Executive Value Highlight Box for Managers & HR */}
              <div className="p-4 sm:p-5 rounded-2xl border border-teal-400/30 bg-teal-400/10 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-teal-300">
                  <Briefcase className="h-4 w-4 shrink-0" />
                  <span>القيمة المباشرة للمدير ومتخذ القرار:</span>
                </div>
                <p className="text-xs sm:text-sm text-white leading-relaxed font-medium">
                  {project.impact}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-teal-400/20 bg-[#121826] px-3 py-1 font-mono text-xs font-semibold text-teal-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </SectionReveal>

            {/* Right Media Image Preview + Sub-page Thumbnails */}
            <SectionReveal className="lg:col-span-6 space-y-3">
              <div className="overflow-hidden rounded-2xl border border-teal-400/30 shadow-2xl bg-[#121826]">
                <ProjectVisual
                  imageUrl={imageUrl}
                  title={project.title}
                  category={project.category}
                  accent={project.accent}
                />
              </div>

              {project.gallery && project.gallery.length > 1 && (
                <div className="p-3 rounded-2xl border border-white/10 bg-[#121826]/90 flex items-center justify-between gap-3">
                  <span className="text-xs font-mono font-bold text-teal-300 whitespace-nowrap">
                    صفحات اللوحة ({project.gallery.length}):
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto">
                    {project.gallery.map((pageImg, idx) => (
                      <a
                        key={pageImg}
                        href={`#page-${idx + 1}`}
                        className="relative h-12 w-20 rounded-lg overflow-hidden border border-teal-400/40 hover:scale-105 transition shrink-0"
                      >
                        <img
                          src={encodeURI(withBasePath(pageImg))}
                          alt={`صفحة ${idx + 1}`}
                          className="h-full w-full object-cover object-top"
                        />
                        <span className="absolute bottom-0 right-0 bg-slate-950/85 px-1.5 py-0.5 text-[10px] font-mono font-bold text-teal-300">
                          0{idx + 1}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </SectionReveal>
          </div>
        </section>

        {/* Key Metrics Strip */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {project.metrics.map((m) => (
              <SectionReveal
                key={m.label}
                className="p-4 sm:p-5 rounded-2xl border border-teal-400/30 bg-[#121826]/85 backdrop-blur-xl shadow-xl flex flex-col justify-between text-center"
              >
                <span className="text-xl sm:text-2xl font-black text-teal-300 font-mono">
                  {m.value}
                </span>
                <span className="text-xs text-slate-300 mt-1 font-medium">
                  {m.label}
                </span>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* Concise Problem, Analytical Solution & Business Outcome */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
          <SectionReveal className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121826]/85 backdrop-blur-xl shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-6">
              ملخص دراسة الحالة (المشكلة ← الحل التحليلي ← الأثر الإداري)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl border border-rose-500/20 bg-rose-500/5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                  01 / المشكلة والتحدي
                </span>
                <h3 className="text-base font-bold text-white mt-1.5 mb-2">
                  ماذا كانت تعاني الإدارة؟
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-purple-500/20 bg-purple-500/5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                  02 / منهجية التحليل
                </span>
                <h3 className="text-base font-bold text-white mt-1.5 mb-2">
                  كيف تم بناء اللوحة والنموذج؟
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.approach}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-teal-500/20 bg-teal-500/5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                  03 / النتائج والقرارات
                </span>
                <h3 className="text-base font-bold text-white mt-1.5 mb-2">
                  أبرز الأرقام والرؤى المستخلصة
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.result}
                </p>
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* Multi-page Gallery (if project has multiple pages) */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
            <SectionReveal className="p-6 sm:p-8 rounded-3xl border border-teal-400/30 bg-[#121826]/85 backdrop-blur-xl shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-300">
                  استعراض كافة صفحات الداشبورد
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  صفحات اللوحة التحليلية ({project.gallery.length} صفحات)
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((pageImg, idx) => (
                  <div
                    id={`page-${idx + 1}`}
                    key={pageImg}
                    className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden shadow-lg group hover:border-teal-400/40 transition-all"
                  >
                    <div className="p-3 border-b border-white/10 flex items-center justify-between text-xs font-mono text-teal-300">
                      <span>الصفحة التحليلية 0{idx + 1}</span>
                      <ZoomIn className="h-4 w-4" />
                    </div>
                    <img
                      src={encodeURI(withBasePath(pageImg))}
                      alt={`الصفحة التحليلية 0${idx + 1}`}
                      className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </SectionReveal>
          </section>
        )}

        {/* Concise 2-Card Technical Summary */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionReveal className="p-6 rounded-2xl border border-white/10 bg-[#121826]/85 backdrop-blur-xl shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-teal-300">
                <CheckCircle2 className="h-4 w-4" />
                <h3 className="text-base font-bold text-white">بيانات المشروع والمعالجة (ETL &amp; DAX)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.dataset} — {project.preprocessing}
              </p>
            </SectionReveal>

            <SectionReveal className="p-6 rounded-2xl border border-white/10 bg-[#121826]/85 backdrop-blur-xl shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-teal-300">
                <Layers className="h-4 w-4" />
                <h3 className="text-base font-bold text-white">هندسة النموذج والتحقق من الدقة</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.architecture} — {project.evaluation}
              </p>
            </SectionReveal>
          </div>
        </section>
      </div>
    </PageVideoShell>
  );
}
