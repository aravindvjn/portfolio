"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, X } from "lucide-react";
import {
  useCreateNpmPackage,
  useUpdateNpmPackage,
} from "@/hooks/mutations/use-npm-packages";
import type { NpmPackageTableItem } from "@/hooks/tables/use-npm-packages";
import type {
  NpmPackagePayload,
  UpdateNpmPackagePayload,
} from "@/actions/npm-package.action";

type Props = {
  open: boolean;
  npmPackage: NpmPackageTableItem | null;
  onClose: () => void;
};

type NpmPackageFormValues = {
  name: string;
  packageName: string;
  description: string;
  npmUrl: string;
  githubUrl: string;
  demoUrl: string;
  image_url: string;
  version: string;
  priority: number | null;
  tags: string[];
};

const initialForm: NpmPackageFormValues = {
  name: "",
  packageName: "",
  description: "",
  npmUrl: "",
  githubUrl: "",
  demoUrl: "",
  image_url: "",
  version: "",
  priority: null,
  tags: [],
};

export default function NpmPackageEditDialog({
  open,
  npmPackage,
  onClose,
}: Props) {
  const isEditMode = !!npmPackage;

  const { mutate: createPackage, isPending: isCreating } =
    useCreateNpmPackage();
  const { mutate: updatePackage, isPending: isUpdating } =
    useUpdateNpmPackage();

  const isPending = isCreating || isUpdating;

  const [form, setForm] = useState<NpmPackageFormValues>(initialForm);
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (!open) return;

    if (npmPackage) {
      setForm({
        name: npmPackage.name ?? "",
        packageName: npmPackage.packageName ?? "",
        description: npmPackage.description ?? "",
        npmUrl: npmPackage.npmUrl ?? "",
        githubUrl: npmPackage.githubUrl ?? "",
        demoUrl: npmPackage.demoUrl ?? "",
        image_url: npmPackage.image_url ?? "",
        version: npmPackage.version ?? "",
        priority: npmPackage.priority ?? null,
        tags: npmPackage.tags ?? [],
      });

      setTagsInput((npmPackage.tags ?? []).join(", "));
    } else {
      setForm(initialForm);
      setTagsInput("");
    }
  }, [open, npmPackage]);

  const parsedTags = useMemo(() => {
    return tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, [tagsInput]);

  const handleChange = <K extends keyof NpmPackageFormValues>(
    key: K,
    value: NpmPackageFormValues[K],
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

    const payload: NpmPackagePayload = {
      name: form.name.trim(),
      packageName: form.packageName.trim(),
      description: form.description.trim(),
      npmUrl: form.npmUrl.trim() || null,
      githubUrl: form.githubUrl.trim() || null,
      demoUrl: form.demoUrl.trim() || null,
      image_url: form.image_url.trim() || null,
      version: form.version.trim() || null,
      priority: form.priority,
      tags: parsedTags,
    };

    if (isEditMode && npmPackage) {
      const updatePayload: UpdateNpmPackagePayload = {
        id: npmPackage.id,
        ...payload,
      };

      updatePackage(updatePayload, {
        onSuccess: (res) => {
          if (res?.success) onClose();
        },
      });

      return;
    }

    createPackage(payload, {
      onSuccess: (res) => {
        if (res?.success) onClose();
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
              {isEditMode ? "Edit NPM Package" : "Create NPM Package"}
            </h3>
            <p className="mt-1 text-sm text-white/50">
              {isEditMode ? "Update package details" : "Add a new package"}
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
            <Field label="Package Title">
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
                required
              />
            </Field>

            <Field label="Package Name">
              <input
                value={form.packageName}
                onChange={(e) => handleChange("packageName", e.target.value)}
                placeholder="@username/package-name"
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
                required
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="min-h-[110px] w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
              required
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="NPM URL">
              <input
                value={form.npmUrl}
                onChange={(e) => handleChange("npmUrl", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
              />
            </Field>

            <Field label="GitHub URL">
              <input
                value={form.githubUrl}
                onChange={(e) => handleChange("githubUrl", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
              />
            </Field>

            <Field label="Demo URL">
              <input
                value={form.demoUrl}
                onChange={(e) => handleChange("demoUrl", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Image URL">
              <input
                value={form.image_url}
                onChange={(e) => handleChange("image_url", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
              />
            </Field>

            <Field label="Version">
              <input
                value={form.version}
                onChange={(e) => handleChange("version", e.target.value)}
                placeholder="1.0.0"
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
                    e.target.value === "" ? null : Number(e.target.value),
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
              />
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
                  : "Create Package"}
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
