"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, X } from "lucide-react";
import { useCreateProject, useUpdateProject } from "@/hooks/mutations/use-projects";
import type { ProjectCategory, UpdateProjectPayload } from "@/types/admin.type";
import type { ProjectTableItem } from "@/hooks/tables/use-projects";

type Props = {
  open: boolean;
  project: ProjectTableItem | null;
  onClose: () => void;
};

type ProjectFormValues = {
  name: string;
  content: string;
  githubLink: string;
  image_url: string;
  priority: number | null;
  category: ProjectCategory;
  tags: string[];
};

const initialForm: ProjectFormValues = {
  name: "",
  content: "",
  githubLink: "",
  image_url: "",
  priority: null,
  category: "PERSONAL",
  tags: [],
};

export default function ProjectEditDialog({
  open,
  project,
  onClose,
}: Props) {
  const isEditMode = !!project;

  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const isPending = isCreating || isUpdating;

  const [form, setForm] = useState<ProjectFormValues>(initialForm);
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (!open) return;

    if (project) {
      setForm({
        name: project.name ?? "",
        content: project.content ?? "",
        githubLink: project.githubLink ?? "",
        image_url: project.image_url ?? "",
        priority: project.priority ?? null,
        category: project.category ?? "PERSONAL",
        tags: project.tags ?? [],
      });

      setTagsInput((project.tags ?? []).join(", "));
    } else {
      setForm(initialForm);
      setTagsInput("");
    }
  }, [open, project]);

  const parsedTags = useMemo(() => {
    return tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, [tagsInput]);

  const handleChange = <K extends keyof ProjectFormValues>(
    key: K,
    value: ProjectFormValues[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      content: form.content.trim(),
      githubLink: form.githubLink.trim(),
      image_url: form.image_url.trim() || null,
      priority: form.priority,
      category: form.category,
      tags: parsedTags,
    };

    if (isEditMode && project) {
      const updatePayload: UpdateProjectPayload = {
        id: project.id,
        ...payload,
      };

      updateProject(updatePayload, {
        onSuccess: (res) => {
          if (res?.success) {
            onClose();
          }
        },
      });

      return;
    }

    createProject(payload, {
      onSuccess: (res) => {
        if (res?.success) {
          onClose();
        }
      },
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0e0e11] p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {isEditMode ? "Edit Project" : "Create Project"}
            </h3>
            <p className="mt-1 text-sm text-white/50">
              {isEditMode ? "Update project details" : "Add a new project"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="rounded-lg border border-white/10 bg-white/[0.05] p-2 text-white/60 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Project Name">
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
                required
              />
            </Field>

            <Field label="GitHub Link">
              <input
                value={form.githubLink}
                onChange={(e) => handleChange("githubLink", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
                required
              />
            </Field>
          </div>

          <Field label="Content">
            <textarea
              value={form.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className="min-h-[110px] w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
              required
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Image URL">
              <input
                value={form.image_url}
                onChange={(e) => handleChange("image_url", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
              />
            </Field>

            <Field label="Priority">
              <input
                type="number"
                value={form.priority ?? ""}
                onChange={(e) =>
                  handleChange(
                    "priority",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
              />
            </Field>

            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) =>
                  handleChange("category", e.target.value as ProjectCategory)
                }
                className="w-full rounded-xl border border-white/10 bg-[#17171b] px-3 py-2.5 text-sm text-white outline-none"
              >
                <option value="PERSONAL">PERSONAL</option>
                <option value="PROFESSIONAL">PROFESSIONAL</option>
              </select>
            </Field>
          </div>

          <Field label="Tags (comma separated)">
            <input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="React, Next.js, TypeScript"
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
            />
          </Field>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-60"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {isPending
                ? isEditMode
                  ? "Saving..."
                  : "Creating..."
                : isEditMode
                ? "Save Changes"
                : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-white/70">{label}</span>
      {children}
    </label>
  );
}