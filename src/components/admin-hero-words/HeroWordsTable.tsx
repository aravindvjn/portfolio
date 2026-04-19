"use client";

import { flexRender } from "@tanstack/react-table";
import { useHeroWords } from "@/hooks/query/use-hero-words";
import { useHeroWordsTable } from "@/hooks/tables/use-hero-words";
import { useMemo, useState } from "react";

import HeroWordFormModal from "./HeroWordFormModal";
import DeleteHeroWordModal from "./DeleteHeroWordModal";

type HeroWordItem = {
  id: string;
  text: string;
  priority: number | null;
};

function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <div className="h-5 w-36 animate-pulse rounded bg-white/10" />
          <div className="mt-2 h-4 w-52 animate-pulse rounded bg-white/5" />
        </div>
        <div className="h-10 w-28 animate-pulse rounded-xl bg-white/10" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              {Array.from({ length: 3 }).map((_, i) => (
                <th key={i} className="px-5 py-4 text-left">
                  <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, row) => (
              <tr key={row} className="border-b border-white/5">
                <td className="px-5 py-4">
                  <div className="h-4 w-36 animate-pulse rounded bg-white/10" />
                </td>
                <td className="px-5 py-4">
                  <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <div className="h-9 w-16 animate-pulse rounded-lg bg-white/10" />
                    <div className="h-9 w-16 animate-pulse rounded-lg bg-white/10" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 text-center backdrop-blur-xl">
      <div className="mb-3 text-4xl">📝</div>
      <h3 className="text-lg font-semibold text-white">No hero words found</h3>
      <p className="mt-2 max-w-md text-sm text-white/55">
        There are no hero words to show right now. Add a new one to start
        managing your hero section content.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="mt-5 inline-flex items-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
      >
        + Add Hero Word
      </button>
    </div>
  );
}

export default function HeroWordsTable() {
  const { data, isLoading, isFetching } = useHeroWords();

  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<HeroWordItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<HeroWordItem | null>(null);

  const heroWords = useMemo<HeroWordItem[]>(() => {
    if (!data?.success || !Array.isArray(data?.data)) return [];
    return data.data;
  }, [data]);

  const table = useHeroWordsTable({
    data: heroWords,
    onEdit: setEditItem,
    onDelete: setDeleteItem,
  });

  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Hero Words</h2>
            <p className="mt-1 text-sm text-white/55">
              Manage the words displayed in the hero section.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              + Add
            </button>

            <div className="flex items-center gap-2 text-xs text-white/50">
              {isFetching ? (
                <>
                  <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                  Refreshing...
                </>
              ) : (
                <>
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-white/20" />
                  {heroWords.length} item{heroWords.length === 1 ? "" : "s"}
                </>
              )}
            </div>
          </div>
        </div>

        {table.getRowModel().rows.length === 0 ? (
          <div className="p-4">
            <EmptyState onCreate={() => setCreateOpen(true)} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr
                    key={hg.id}
                    className="border-b border-white/10 bg-white/[0.03]"
                  >
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white/55"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
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
                    className="border-b border-white/5 transition-colors hover:bg-white/[0.04]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-5 py-4 align-middle text-sm text-white"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <HeroWordFormModal
        open={createOpen}
        mode="create"
        onClose={() => setCreateOpen(false)}
      />

      <HeroWordFormModal
        open={!!editItem}
        mode="edit"
        item={editItem}
        onClose={() => setEditItem(null)}
      />

      <DeleteHeroWordModal
        open={!!deleteItem}
        item={deleteItem}
        onClose={() => setDeleteItem(null)}
      />
    </>
  );
}