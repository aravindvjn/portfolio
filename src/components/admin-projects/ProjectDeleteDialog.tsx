"use client";

import { Loader2, TriangleAlert, X } from "lucide-react";
import { useDeleteProject } from "@/hooks/mutations/use-projects";
import type { ProjectTableItem } from "@/hooks/tables/use-projects";

type Props = {
  open: boolean;
  project: ProjectTableItem | null;
  onClose: () => void;
};

export default function ProjectDeleteDialog({
  open,
  project,
  onClose,
}: Props) {
  const { mutate: deleteProject, isPending } = useDeleteProject();

  if (!open || !project) return null;

  const handleDelete = () => {
    deleteProject(project.id, {
      onSuccess: (res) => {
        if (res.success) {
          onClose();
        }
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
      <div
        className="absolute inset-0"
        onClick={() => !isPending && onClose()}
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-red-500/20 bg-[#0e0e11] p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-2.5 text-red-400">
              <TriangleAlert size={18} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                Delete Project
              </h3>
              <p className="mt-1 text-sm text-white/50">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg border border-white/10 bg-white/[0.05] p-2 text-white/60 transition hover:bg-white/[0.08] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm text-white/60">Are you sure you want to delete</p>
          <p className="mt-1 font-medium text-white">{project.name}?</p>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/[0.08]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-60"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}