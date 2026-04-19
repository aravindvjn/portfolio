"use client";

import type { ElementType, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Loader2,
  Pencil,
  PhoneCall,
  Plus,
  Power,
  Search,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import { useContactOptions } from "@/hooks/query/use-contact-options";
import {
  useCreateContactOption,
  useDeleteContactOption,
  useToggleContactOptionStatus,
  useUpdateContactOption,
} from "@/hooks/mutations/use-contact-options";
import type {
  ContactOptionItem,
  ContactOptionPayload,
  UpdateContactOptionPayload,
} from "@/types/admin.type";
import {
  CONTACT_ICON_MAP,
  CONTACT_ICON_OPTIONS,
  type ContactIconKey,
} from "@/utils/contact-icons";

type FormState = {
  label: string;
  link: string;
  icon: string;
  priority: string;
  isActive: boolean;
};

const defaultForm: FormState = {
  label: "",
  link: "",
  icon: "",
  priority: "",
  isActive: true,
};

const columnHelper = createColumnHelper<ContactOptionItem>();

export default function ContactOptionsPanel() {
  const { data, isLoading, isError } = useContactOptions();

  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContactOptionItem | null>(
    null,
  );

  const items = useMemo(() => data?.data ?? [], [data?.data]);

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return items;

    return items.filter((item) => {
      return (
        item.label.toLowerCase().includes(query) ||
        item.link.toLowerCase().includes(query) ||
        (item.icon ?? "").toLowerCase().includes(query) ||
        String(item.priority ?? "").includes(query)
      );
    });
  }, [items, search]);

  const activeCount = useMemo(
    () => items.filter((item) => item.isActive).length,
    [items],
  );

  const inactiveCount = useMemo(
    () => items.filter((item) => !item.isActive).length,
    [items],
  );

  const handleCreate = () => {
    setSelectedItem(null);
    setFormOpen(true);
  };

  const handleEdit = (item: ContactOptionItem) => {
    setSelectedItem(item);
    setFormOpen(true);
  };

  const handleDelete = (item: ContactOptionItem) => {
    setSelectedItem(item);
    setDeleteOpen(true);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("label", {
        header: "Contact",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div>
              <p className="text-sm font-medium text-white">{item.label}</p>
              <p className="mt-1 text-xs text-white/40">
                ID: {item.id.slice(0, 8)}...
              </p>
            </div>
          );
        },
      }),
      columnHelper.accessor("link", {
        header: "Link",
        cell: ({ getValue }) => {
          const link = getValue();
          return (
            <div className="flex items-center gap-2">
              <span className="max-w-[280px] truncate text-sm text-white/65">
                {link}
              </span>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-white/60 transition hover:bg-white/[0.08] hover:text-white"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          );
        },
      }),
      columnHelper.accessor("icon", {
        header: "Icon",
        cell: ({ row }) => {
          const iconKey = row.original.icon as ContactIconKey | null;
          const Icon = iconKey ? CONTACT_ICON_MAP[iconKey] : null;

          return iconKey && Icon ? (
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/75">
              <Icon className="h-4 w-4" />
              <span className="capitalize">{iconKey}</span>
            </div>
          ) : (
            <span className="text-sm text-white/50">—</span>
          );
        },
      }),
      columnHelper.accessor("priority", {
        header: "Priority",
        cell: ({ getValue }) => (
          <span className="text-sm text-white/65">{getValue() ?? "—"}</span>
        ),
      }),
      columnHelper.accessor("isActive", {
        header: "Status",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
                item.isActive
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                  : "border-red-500/20 bg-red-500/10 text-red-300"
              }`}
            >
              {item.isActive ? "Active" : "Inactive"}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => (
          <RowActions
            item={row.original}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            title="Contact Options"
            value={items.length}
            icon={PhoneCall}
            description="Configured contact methods"
          />
          <SummaryCard
            title="Active Contacts"
            value={activeCount}
            icon={CheckCircle2}
            description="Currently visible contacts"
          />
          <SummaryCard
            title="Inactive Contacts"
            value={inactiveCount}
            icon={XCircle}
            description="Hidden or disabled contacts"
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
          <div className="flex flex-col gap-4 border-b border-white/10 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-base font-semibold text-white">
                Contact Options
              </p>
              <p className="mt-1 text-sm text-white/50">
                Manage labels, links, icons, priority and visibility.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search contact options..."
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/20 focus:bg-white/[0.06] sm:w-[260px]"
                />
              </div>

              <button
                type="button"
                onClick={handleCreate}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] px-4 text-sm font-medium text-white transition hover:bg-white/[0.12]"
              >
                <Plus className="h-4 w-4" />
                Add Contact
              </button>
            </div>
          </div>

          {isLoading ? (
            <ContactOptionsSkeleton />
          ) : isError || !data?.success ? (
            <div className="p-5">
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-red-500/10 p-2">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      Failed to load contact options
                    </p>
                    <p className="mt-1 text-sm text-red-300/90">
                      {data?.message ||
                        "Something went wrong while fetching contact options."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="p-5">
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
                <p className="text-base font-semibold text-white">
                  {items.length === 0
                    ? "No contact options found"
                    : "No matching contact options"}
                </p>
                <p className="mt-2 text-sm text-white/50">
                  {items.length === 0
                    ? "Create your first contact option to show it here."
                    : "Try another search term."}
                </p>

                {items.length === 0 && (
                  <button
                    type="button"
                    onClick={handleCreate}
                    className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] px-4 text-sm font-medium text-white transition hover:bg-white/[0.12]"
                  >
                    <Plus className="h-4 w-4" />
                    Create Contact
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="min-w-full">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr
                        key={headerGroup.id}
                        className="border-b border-white/10"
                      >
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className={`px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-white/40 ${
                              header.id === "actions" ? "text-right" : ""
                            }`}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-white/5 transition hover:bg-white/[0.03]"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className={`px-5 py-4 align-middle ${
                              cell.column.id === "actions" ? "text-right" : ""
                            }`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 p-4 lg:hidden">
                {filteredData.map((item) => (
                  <MobileContactCard
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <ContactOptionFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedItem(null);
        }}
        initialData={selectedItem}
      />

      <DeleteContactOptionModal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />
    </>
  );
}

function RowActions({
  item,
  onEdit,
  onDelete,
}: {
  item: ContactOptionItem;
  onEdit: (item: ContactOptionItem) => void;
  onDelete: (item: ContactOptionItem) => void;
}) {
  const { mutate, isPending } = useToggleContactOptionStatus();

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={() => onEdit(item)}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm font-medium text-white/75 transition hover:bg-white/[0.08] hover:text-white"
      >
        <Pencil className="h-4 w-4" />
      </button>

      <button
        type="button"
        disabled={isPending}
        onClick={() => mutate(item.id)}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm font-medium text-white/75 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Power className="h-4 w-4" />
        )}
        {item.isActive ? "Disable" : "Enable"}
      </button>

      <button
        type="button"
        onClick={() => onDelete(item)}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 text-sm font-medium text-red-300 transition hover:bg-red-500/15"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function MobileContactCard({
  item,
  onEdit,
  onDelete,
}: {
  item: ContactOptionItem;
  onEdit: (item: ContactOptionItem) => void;
  onDelete: (item: ContactOptionItem) => void;
}) {
  const { mutate, isPending } = useToggleContactOptionStatus();
  const iconKey = item.icon as ContactIconKey | null;
  const Icon = iconKey ? CONTACT_ICON_MAP[iconKey] : null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-white">{item.label}</p>
          <p className="mt-1 text-xs text-white/40">ID: {item.id.slice(0, 8)}...</p>
        </div>

        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
            item.isActive
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/20 bg-red-500/10 text-red-300"
          }`}
        >
          {item.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/35">
            Link
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span className="truncate text-sm text-white/65">{item.link}</span>
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-white/60 transition hover:bg-white/[0.08] hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">
              Icon
            </p>
            <div className="mt-1">
              {Icon && iconKey ? (
                <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/75">
                  <Icon className="h-4 w-4" />
                  <span className="capitalize">{iconKey}</span>
                </div>
              ) : (
                <span className="text-sm text-white/50">—</span>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">
              Priority
            </p>
            <p className="mt-1 text-sm text-white/65">{item.priority ?? "—"}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => onEdit(item)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm font-medium text-white/75 transition hover:bg-white/[0.08] hover:text-white"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={() => mutate(item.id)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm font-medium text-white/75 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Power className="h-4 w-4" />
          )}
          {item.isActive ? "Disable" : "Enable"}
        </button>

        <button
          type="button"
          onClick={() => onDelete(item)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 text-sm font-medium text-red-300 transition hover:bg-red-500/15"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
}

function ContactOptionFormModal({
  open,
  onClose,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  initialData?: ContactOptionItem | null;
}) {
  const isEditMode = !!initialData;

  const { mutateAsync: createContact, isPending: isCreating } =
    useCreateContactOption();
  const { mutateAsync: updateContact, isPending: isUpdating } =
    useUpdateContactOption();

  const isPending = isCreating || isUpdating;

  const [form, setForm] = useState<FormState>(defaultForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setForm({
        label: initialData.label ?? "",
        link: initialData.link ?? "",
        icon: initialData.icon ?? "",
        priority:
          initialData.priority === null || initialData.priority === undefined
            ? ""
            : String(initialData.priority),
        isActive: initialData.isActive ?? true,
      });
    } else {
      setForm(defaultForm);
    }

    setError("");
  }, [open, initialData]);

  if (!open) return null;

  const handleChange = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.label.trim()) return "Label is required.";
    if (!form.link.trim()) return "Link is required.";

    if (form.icon) {
      const valid = CONTACT_ICON_OPTIONS.some((item) => item.value === form.icon);
      if (!valid) return "Please select a valid icon.";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      if (isEditMode && initialData) {
        const payload: UpdateContactOptionPayload = {
          id: initialData.id,
          label: form.label.trim(),
          link: form.link.trim(),
          icon: (form.icon.trim() || null) as ContactIconKey | null,
          priority: form.priority.trim() ? Number(form.priority) : null,
          isActive: form.isActive,
        };

        const res = await updateContact(payload);

        if (!res.success) {
          setError(res.message);
          return;
        }
      } else {
        const payload: ContactOptionPayload = {
          label: form.label.trim(),
          link: form.link.trim(),
          icon: (form.icon.trim() || null) as ContactIconKey | null,
          priority: form.priority.trim() ? Number(form.priority) : null,
          isActive: form.isActive,
        };

        const res = await createContact(payload);

        if (!res.success) {
          setError(res.message);
          return;
        }
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const selectedIcon = form.icon
    ? CONTACT_ICON_MAP[form.icon as ContactIconKey]
    : null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0b0b0d] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
          <div>
            <h2 className="text-base font-semibold text-white">
              {isEditMode ? "Edit Contact Option" : "Create Contact Option"}
            </h2>
            <p className="mt-1 text-sm text-white/50">
              Manage how contact methods appear in your portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white/70 transition hover:bg-white/[0.08] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldWrapper label="Label">
              <input
                value={form.label}
                onChange={(e) => handleChange("label", e.target.value)}
                placeholder="WhatsApp"
                className={inputClass}
              />
            </FieldWrapper>

            <FieldWrapper label="Priority">
              <input
                type="number"
                value={form.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
                placeholder="1"
                className={inputClass}
              />
            </FieldWrapper>

            <div className="md:col-span-2">
              <FieldWrapper label="Link">
                <input
                  value={form.link}
                  onChange={(e) => handleChange("link", e.target.value)}
                  placeholder="https://wa.me/..."
                  className={inputClass}
                />
              </FieldWrapper>
            </div>

            <div className="md:col-span-2">
              <FieldWrapper label="Icon">
                <div className="relative">
                  <select
                    value={form.icon}
                    onChange={(e) => handleChange("icon", e.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-10 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/[0.06]"
                  >
                    <option value="" className="bg-[#0b0b0d] text-white">
                      Select icon
                    </option>
                    {CONTACT_ICON_OPTIONS.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-[#0b0b0d] text-white"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                </div>

                {selectedIcon ? (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/75">
                    {(() => {
                      const Icon = selectedIcon;
                      return <Icon className="h-4 w-4" />;
                    })()}
                    Preview
                  </div>
                ) : null}
              </FieldWrapper>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => handleChange("isActive", e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-transparent accent-white"
                />
                <span className="text-sm text-white/75">
                  Active and visible on the portfolio
                </span>
              </label>
            </div>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          ) : null}

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-white/10 px-4 text-sm font-medium text-white/70 transition hover:bg-white/[0.06] hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] px-4 text-sm font-medium text-white transition hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  {isEditMode ? "Save Changes" : "Create Contact"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteContactOptionModal({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: ContactOptionItem | null;
}) {
  const { mutateAsync, isPending } = useDeleteContactOption();
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setConfirmText("");
      setError("");
    }
  }, [open]);

  if (!open || !item) return null;

  const handleDelete = async () => {
    if (confirmText.trim().toLowerCase() !== "delete") {
      setError('Type "delete" to confirm.');
      return;
    }

    setError("");

    try {
      const res = await mutateAsync(item.id);

      if (!res.success) {
        setError(res.message);
        return;
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item.");
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0b0b0d] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
          <div>
            <h2 className="text-base font-semibold text-white">
              Delete Contact Option
            </h2>
            <p className="mt-1 text-sm text-white/50">
              This action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white/70 transition hover:bg-white/[0.08] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm text-white/70">
              You are deleting{" "}
              <span className="font-semibold text-white">{item.label}</span>.
            </p>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-white/75">
              Type <span className="text-white">delete</span> to confirm
            </label>
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="delete"
              className={inputClass}
            />
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          ) : null}

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-white/10 px-4 text-sm font-medium text-white/70 transition hover:bg-white/[0.06] hover:text-white"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={handleDelete}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 text-sm font-medium text-red-300 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: number;
  icon: ElementType;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white/70">{title}</p>
          <p className="mt-1 text-xs text-white/45">{description}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5 transition-colors group-hover:border-white/20 group-hover:bg-white/[0.08]">
          <Icon className="h-4 w-4 text-white/70" />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-3xl font-semibold tracking-tight text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function FieldWrapper({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/75">
        {label}
      </label>
      {children}
    </div>
  );
}

function ContactOptionsSkeleton() {
  return (
    <div className="p-5">
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="col-span-2 h-4 animate-pulse rounded bg-white/10" />
            <div className="col-span-4 h-4 animate-pulse rounded bg-white/10" />
            <div className="col-span-2 h-4 animate-pulse rounded bg-white/10" />
            <div className="col-span-1 h-4 animate-pulse rounded bg-white/10" />
            <div className="col-span-1 h-4 animate-pulse rounded bg-white/10" />
            <div className="col-span-2 h-4 animate-pulse rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/20 focus:bg-white/[0.06]";