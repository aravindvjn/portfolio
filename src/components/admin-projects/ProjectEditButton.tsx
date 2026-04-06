"use client";

import { Edit } from "lucide-react";
import type { ProjectTableItem } from "@/hooks/tables/use-projects";

type Props = {
  project: ProjectTableItem;
  onClick: (project: ProjectTableItem) => void;
};

export default function ProjectEditButton({ project, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={() => onClick(project)}
      className="rounded-lg border border-white/10 bg-white/[0.05] p-2 text-white/70 transition hover:bg-white/[0.1] hover:text-white"
      aria-label={`Edit ${project.name}`}
    >
      <Edit size={16} />
    </button>
  );
}