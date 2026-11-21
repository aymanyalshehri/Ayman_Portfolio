import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Database,
  Layers,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { PageVideoShell } from "@/components/page-video-shell";
import { ProjectMediaGallery } from "@/components/project-media-gallery";
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

  const galleryImages =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.imageUrl];

  const primaryMetric = project.metrics[0]
    ? `${project.metrics[0].value} (${project.metrics[0].label})`
    : "تحليل بيانات تشغيلي";

  const coreTools = project.technologies.slice(0, 3).join(" · ");

  return (
    <PageVideoShell className="projects-detail-shell">
      <div className="relative w-full pt-28 pb-24 text-right">
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-300 hover:text-white transition mb-6"
          >
            <ArrowRight className="h-4 w-4" />
            <span>العودة إلى كافة المشاريع / Back to Projects</span>
          </Link>

          <SectionReveal className="mb-8 p-4 sm:p-5 rounded-2xl border border-teal-400/35 bg-gradient-to-l from-teal-500/10 via-[#121826]/95 to-purple-500/10 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-300 mb-3">
              <Zap className="h-4 w-4 text-amber-300" />
              <span>ملخص الـ 10 ثواني للـ HR والمدراء · 10-Second Executive Snapshot</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl border border-white/10 bg-slate-950/60 flex items-start gap-3">
                <Database className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[0.7rem] font-mono text-slate-100">نطاق البيانات والمؤشر الأبرز</span>
                  <span className="block text-sm font-bold text-white mt-0.5">{primaryMetric}</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-slate-950/60 flex items-start gap-3">
                <Wrench className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[0.7rem] font-mono text-slate-100">الأدوات والمنهجية الأساسية</span>
                  <span className="block text-sm font-bold text-white font-mono mt-0.5">{coreTools}</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-slate-950/60 flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[0.7rem] font-mono text-slate-100">القرار الإداري المدعوم</span>
                  <span className="block text-xs sm:text-sm font-semibold text-emerald-200 mt-0.5 line-clamp-2">
                    {project.impact}
                  </span>
                </div>
              </div>
            </div>
          </SectionReveal>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            <SectionReveal className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-teal-300 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Power BI · {project.category}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                <GradientTitle>{project.title}</GradientTitle>
              </h1>

              <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
                {project.summary}
              </p>

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

            <SectionReveal className="lg:col-span-7">
              <ProjectMediaGallery
                images={galleryImages}
                title={project.title}
                category={project.category}
              />
            </SectionReveal>
          </div>
        </section>

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
                <span className="text-xs text-slate-100 mt-1 font-medium">
                  {m.label}
                </span>
              </SectionReveal>
            ))}
          </div>
        </section>

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
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
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
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
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
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                  {project.result}
                </p>
              </div>
            </div>
          </SectionReveal>
        </section>

        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionReveal className="p-6 rounded-2xl border border-white/10 bg-[#121826]/85 backdrop-blur-xl shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-teal-300">
                <CheckCircle2 className="h-4 w-4" />
                <h3 className="text-base font-bold text-white">بيانات المشروع والمعالجة (ETL &amp; DAX)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                {project.dataset} — {project.preprocessing}
              </p>
            </SectionReveal>

            <SectionReveal className="p-6 rounded-2xl border border-white/10 bg-[#121826]/85 backdrop-blur-xl shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-teal-300">
                <Layers className="h-4 w-4" />
                <h3 className="text-base font-bold text-white">هندسة النموذج والتحقق من الدقة</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                {project.architecture} — {project.evaluation}
              </p>
            </SectionReveal>
          </div>
        </section>
      </div>
    </PageVideoShell>
  );
}
