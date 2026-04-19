"use client";

import { useEffect } from "react";
import { useDeleteHeroWord } from "@/hooks/mutations/use-hero-words";

type HeroWordItem = {
  id: string;
  text: string;
  priority: number | null;
};

export default function DeleteHeroWordModal({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: HeroWordItem | null;
}) {
  const { mutateAsync, isPending } = useDeleteHeroWord();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open || !item) return null;

  const handleDelete = async () => {
    const res = await mutateAsync(item.id);

    if (res.success) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-white">Delete Hero Word</h2>
          <p className="mt-1 text-sm text-white/50">
            This action cannot be undone.
          </p>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">{item.text}</span>?
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex min-w-[110px] items-center justify-center rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}