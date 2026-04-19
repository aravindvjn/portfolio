"use client";

import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

export type HeroWordItem = {
  id: string;
  text: string;
  priority: number | null;
};

type Props = {
  data: HeroWordItem[];
  onEdit: (item: HeroWordItem) => void;
  onDelete: (item: HeroWordItem) => void;
};

export function useHeroWordsTable({ data, onEdit, onDelete }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<HeroWordItem>[]>(
    () => [
      {
        accessorKey: "text",
        header: "Text",
        cell: ({ row }) => (
          <div className="min-w-[220px]">
            <p className="font-medium text-white">{row.original.text}</p>
          </div>
        ),
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => (
          <span className="inline-flex min-w-[56px] items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
            {row.original.priority ?? "-"}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(row.original)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(row.original)}
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onDelete, onEdit]
  );

  return useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
}