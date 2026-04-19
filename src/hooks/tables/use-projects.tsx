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

export type ProjectTableItem = {
  id: string;
  name: string;
  content: string;
  githubLink: string;
  image_url: string | null;
  priority: number | null;
  category: "PERSONAL" | "PROFESSIONAL";
  tags: string[];
};

type UseProjectsTableProps = {
  data: ProjectTableItem[];
};

export function useProjectsTable({ data }: UseProjectsTableProps) {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingProject, setEditingProject] = useState<ProjectTableItem | null>(
    null,
  );
  const [deletingProject, setDeletingProject] =
    useState<ProjectTableItem | null>(null);

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return data;

    return data.filter((project) => {
      const text = [
        project.name,
        project.content,
        project.githubLink,
        project.category,
        ...(project.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(query);
    });
  }, [data, search]);

  const columns = useMemo<ColumnDef<ProjectTableItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-2"
          >
            Project
            <ArrowUpDown size={14} />
          </button>
        ),
        cell: ({ row }) => (
          <div className="w-[180px] sm:w-[240px] lg:w-[320px]">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-white">
              {row.original.name}
            </p>

            <p className="mt-1 overflow-hidden text-xs text-white/50 line-clamp-2">
              {row.original.content}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
          const category = row.original.category;

          return (
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                category === "PROFESSIONAL"
                  ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                  : "border-purple-500/20 bg-purple-500/10 text-purple-400"
              }`}
            >
              {category}
            </span>
          );
        },
      },
      {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
          const tags = row.original.tags || [];
          const visibleTags = tags.slice(0, 1);
          const remainingCount = tags.length - visibleTags.length;

          return (
            <div className="flex min-w-[180px]  gap-2">
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
        accessorKey: "githubLink",
        header: "Link",
        cell: ({ row }) => (
          <a
            href={row.original.githubLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-400 hover:underline"
          >
            <ExternalLink size={14} />
          </a>
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
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditingProject(row.original)}
              className="rounded-lg border border-white/10 bg-white/[0.05] p-2 text-white/70 transition hover:bg-white/[0.1] hover:text-white"
              aria-label={`Edit ${row.original.name}`}
            >
              <Pencil size={16} />
            </button>

            <button
              type="button"
              onClick={() => setDeletingProject(row.original)}
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
    editingProject,
    setEditingProject,
    deletingProject,
    setDeletingProject,
  };
}
