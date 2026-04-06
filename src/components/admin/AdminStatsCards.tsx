"use client";

import {
  FolderKanban,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Clock3,
  AlertCircle,
} from "lucide-react";
import { useAdminStats } from "@/hooks/query/use-admin-stats";

type StatItem = {
  title: string;
  value: number;
  icon: React.ElementType;
  description: string;
};

export default function AdminStatsCards() {
  const { data, isLoading, isError } = useAdminStats();

  const stats = data?.data;

  if (isLoading) {
    return <AdminStatsCardsSkeleton />;
  }

  if (isError || !data?.success || !stats) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-red-500/10 p-2">
            <AlertCircle className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold">Failed to load stats</p>
            <p className="mt-1 text-sm text-red-300/90">
              {data?.message || "Something went wrong while fetching admin stats."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const items: StatItem[] = [
    {
      title: "Projects",
      value: stats.totalProjects,
      icon: FolderKanban,
      description: "Total portfolio projects",
    },
    {
      title: "Hero Words",
      value: stats.totalHeroWords,
      icon: Sparkles,
      description: "Words used in hero section",
    },
    {
      title: "Contact Options",
      value: stats.totalContactOptions,
      icon: PhoneCall,
      description: "Configured contact methods",
    },
    {
      title: "Active Contacts",
      value: stats.activeContactOptions,
      icon: CheckCircle2,
      description: "Currently visible contacts",
    },
    {
      title: "Inactive Contacts",
      value: stats.inactiveContactOptions,
      icon: XCircle,
      description: "Hidden or disabled contacts",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white/70">{item.title}</p>
                  <p className="mt-1 text-xs text-white/45">{item.description}</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5 transition-colors group-hover:border-white/20 group-hover:bg-white/[0.08]">
                  <Icon className="h-4 w-4 text-white/70" />
                </div>
              </div>

              <div className="mt-5">
                <p className="text-3xl font-semibold tracking-tight text-white">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <InsightCard
          title="Latest Hero Word"
          subtitle="Most recently added hero text"
          icon={<Sparkles className="h-4 w-4 text-white/70" />}
        >
          {stats.latestHeroWord ? (
            <div className="space-y-3">
              <p className="text-xl font-semibold text-white">
                {stats.latestHeroWord.text}
              </p>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/60">
                <Clock3 className="h-3.5 w-3.5" />
                Recently added
              </div>
            </div>
          ) : (
            <EmptyStateText text="No hero word found." />
          )}
        </InsightCard>

        <InsightCard
          title="Latest Contact"
          subtitle="Most recently added contact option"
          icon={<PhoneCall className="h-4 w-4 text-white/70" />}
        >
          {stats.latestContactOption ? (
            <div className="space-y-3">
              <p className="text-xl font-semibold text-white">
                {stats.latestContactOption.label}
              </p>

              <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Recent entry
              </div>
            </div>
          ) : (
            <EmptyStateText text="No contact option found." />
          )}
        </InsightCard>

        <InsightCard
          title="Top Priority Project"
          subtitle="Project shown with highest priority"
          icon={<ArrowUpRight className="h-4 w-4 text-white/70" />}
        >
          {stats.topPriorityProject ? (
            <div className="space-y-3">
              <p className="text-xl font-semibold text-white">
                {stats.topPriorityProject.name}
              </p>

              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
                Priority: {stats.topPriorityProject.priority ?? "N/A"}
              </div>
            </div>
          ) : (
            <EmptyStateText text="No project found." />
          )}
        </InsightCard>
      </div>
    </div>
  );
}

function InsightCard({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm text-white/50">{subtitle}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5">
          {icon}
        </div>
      </div>

      <div className="mt-5">{children}</div>
    </div>
  );
}

function EmptyStateText({ text }: { text: string }) {
  return <p className="text-sm text-white/50">{text}</p>;
}

function AdminStatsCardsSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-full">
                <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
                <div className="mt-2 h-3 w-32 animate-pulse rounded bg-white/5" />
              </div>
              <div className="h-10 w-10 animate-pulse rounded-xl bg-white/10" />
            </div>

            <div className="mt-5 h-8 w-16 animate-pulse rounded bg-white/10" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-full">
                <div className="h-5 w-32 animate-pulse rounded bg-white/10" />
                <div className="mt-2 h-4 w-40 animate-pulse rounded bg-white/5" />
              </div>
              <div className="h-10 w-10 animate-pulse rounded-xl bg-white/10" />
            </div>

            <div className="mt-5 space-y-3">
              <div className="h-6 w-28 animate-pulse rounded bg-white/10" />
              <div className="h-7 w-24 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}