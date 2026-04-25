"use client";

import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink, Pencil, Trash2 } from "lucide-react";
import FeaturedNpmPackageButton from "@/components/admin-npm-packages/FeaturedNpmPackageButton";

export type NpmPackageTableItem = {
  id: string;
  name: string;
  packageName: string;
  description: string;
  npmUrl: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  image_url: string | null;
  version: string | null;
  tags: string[];
  isFeatured: boolean;
  priority: number | null;
  createdAt: Date;
  updatedAt: Date;
};

type UseNpmPackagesTableProps = {
  data: NpmPackageTableItem[];
};

export function useNpmPackagesTable({ data }: UseNpmPackagesTableProps) {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingPackage, setEditingPackage] =
    useState<NpmPackageTableItem | null>(null);
  const [deletingPackage, setDeletingPackage] =
    useState<NpmPackageTableItem | null>(null);

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return data;

    return data.filter((item) => {
      const text = [
        item.name,
        item.packageName,
        item.description,
        item.npmUrl,
        item.githubUrl,
        item.demoUrl,
        item.version,
        ...(item.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(query);
    });
  }, [data, search]);

  const columns = useMemo<ColumnDef<NpmPackageTableItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-2"
          >
            Package
            <ArrowUpDown size={14} />
          </button>
        ),
        cell: ({ row }) => (
          <div className="max-w-[170px]">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-white">
              {row.original.name}
            </p>
            <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-white/40">
              {row.original.packageName}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "version",
        header: "Version",
        cell: ({ row }) => (
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            {row.original.version || "-"}
          </span>
        ),
      },
      {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
          const tags = row.original.tags || [];
          const visibleTags = tags.slice(0, 1);
          const remainingCount = tags.length - visibleTags.length;

          return (
            <div className="flex min-w-[180px] gap-2">
              {tags.length ? (
                <>
                  {visibleTags.map((tag, i) => (
                    <span
                      key={`${tag}-${i}`}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/70"
                    >
                      {tag}
                    </span>
                  ))}

                  {remainingCount > 0 && (
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/50">
                      +{remainingCount}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-xs text-white/40">-</span>
              )}
            </div>
          );
        },
      },
      {
        id: "links",
        header: "Links",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            {row.original.npmUrl && (
              <a
                href={row.original.npmUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-red-400 hover:underline"
                title="NPM"
              >
                NPM
                <ExternalLink size={13} />
              </a>
            )}

            {row.original.githubUrl && (
              <a
                href={row.original.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-400 hover:underline"
                title="GitHub"
              >
                GitHub
                <ExternalLink size={13} />
              </a>
            )}

            {row.original.demoUrl && (
              <a
                href={row.original.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-purple-400 hover:underline"
                title="Demo"
              >
                Demo
                <ExternalLink size={13} />
              </a>
            )}

            {!row.original.npmUrl &&
              !row.original.githubUrl &&
              !row.original.demoUrl && (
                <span className="text-xs text-white/40">-</span>
              )}
          </div>
        ),
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => (
          <span className="text-sm text-white/70">
            {row.original.priority ?? "-"}
          </span>
        ),
      },
      {
        accessorKey: "isFeatured",
        header: "Featured",
        cell: ({ row }) => <FeaturedNpmPackageButton row={row.original} />,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditingPackage(row.original)}
              className="rounded-lg border border-white/10 bg-white/[0.05] p-2 text-white/70 transition hover:bg-white/[0.1] hover:text-white"
              aria-label={`Edit ${row.original.name}`}
            >
              <Pencil size={16} />
            </button>

            <button
              type="button"
              onClick={() => setDeletingPackage(row.original)}
              className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
              aria-label={`Delete ${row.original.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return {
    table,
    columns,
    search,
    setSearch,
    sorting,
    setSorting,
    filteredData,
    editingPackage,
    setEditingPackage,
    deletingPackage,
    setDeletingPackage,
  };
}