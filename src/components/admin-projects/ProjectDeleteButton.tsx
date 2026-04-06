"use client";

import { Trash2 } from "lucide-react";
import type { ProjectTableItem } from "@/hooks/tables/use-projects";

type Props = {
  project: ProjectTableItem;
  onClick: (project: ProjectTableItem) => void;
};

export default function ProjectDeleteButton({ project, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={() => onClick(project)}
      className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
      aria-label={`Delete ${project.name}`}
    >
      <Trash2 size={16} />
    </button>
  );
}