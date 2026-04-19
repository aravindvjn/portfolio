"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useCreateHeroWord,
  useUpdateHeroWord,
} from "@/hooks/mutations/use-hero-words";

type HeroWordItem = {
  id: string;
  text: string;
  priority: number | null;
};

type HeroWordFormModalProps = {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  item?: HeroWordItem | null;
};

export default function HeroWordFormModal({
  open,
  onClose,
  mode,
  item = null,
}: HeroWordFormModalProps) {
  const { mutateAsync: createHeroWord, isPending: isCreating } =
    useCreateHeroWord();
  const { mutateAsync: updateHeroWord, isPending: isUpdating } =
    useUpdateHeroWord();

  const isPending = isCreating || isUpdating;

  const [text, setText] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && item) {
      setText(item.text || "");
      setPriority(
        item.priority !== null && item.priority !== undefined
          ? String(item.priority)
          : ""
      );
    } else {
      setText("");
      setPriority("");
    }

    setError("");
  }, [open, mode, item]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const isChanged = useMemo(() => {
    if (mode === "create") {
      return text.trim() !== "" || priority.trim() !== "";
    }

    if (!item) return false;

    const originalPriority =
      item.priority !== null && item.priority !== undefined
        ? String(item.priority)
        : "";

    return text !== item.text || priority !== originalPriority;
  }, [mode, item, text, priority]);

  if (!open) return null;
  if (mode === "edit" && !item) return null;

  const handleSubmit = async () => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      setError("Text is required");
      return;
    }

    if (priority.trim() !== "" && Number.isNaN(Number(priority))) {
      setError("Priority must be a valid number");
      return;
    }

    setError("");

    const payload = {
      text: trimmedText,
      priority: priority.trim() === "" ? null : Number(priority),
    };

    const res =
      mode === "create"
        ? await createHeroWord(payload)
        : await updateHeroWord({
            id: item!.id,
            ...payload,
          });

    if (res.success) {
      onClose();
    } else {
      setError(
        res.message ||
          `Failed to ${mode === "create" ? "create" : "update"} hero word`
      );
    }
  };

  const title = mode === "create" ? "Create Hero Word" : "Edit Hero Word";
  const description =
    mode === "create"
      ? "Add a new word for the hero section."
      : "Update the text and priority for this hero word.";
  const buttonText =
    mode === "create" ? "Create Hero Word" : "Save changes";
  const loadingText = mode === "create" ? "Creating..." : "Saving...";

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
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-white/50">{description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="hero-word-text"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Text
            </label>
            <input
              id="hero-word-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter hero word"
              autoFocus
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/20 focus:bg-white/[0.07]"
            />
          </div>

          <div>
            <label
              htmlFor="hero-word-priority"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Priority
            </label>
            <input
              id="hero-word-priority"
              type="number"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              placeholder="Enter priority"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/20 focus:bg-white/[0.07]"
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending || !isChanged}
            className="inline-flex min-w-[140px] items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                {loadingText}
              </span>
            ) : (
              buttonText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}