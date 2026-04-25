"use client";

import { useState } from "react";
import { flexRender } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useNpmPackages } from "@/hooks/query/use-npm-packages";
import {
  useNpmPackagesTable,
  type NpmPackageTableItem,
} from "@/hooks/tables/use-npm-packages";
import NpmPackageEditDialog from "./NpmPackageEditDialog";
import NpmPackageDeleteDialog from "./NpmPackageDeleteDialog";

export default function NpmPackagesTable() {
  const { data, isLoading } = useNpmPackages();
  const [createOpen, setCreateOpen] = useState(false);


  const {
    table,
    columns,
    search,
    setSearch,
    editingPackage,
    setEditingPackage,
    deletingPackage,
    setDeletingPackage,
  } = useNpmPackagesTable({
    data: data?.data ?? [],
  });

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-white">NPM Packages</h2>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <input
              placeholder="Search packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 sm:w-64"
            />

            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
            >
              <Plus size={16} />
              Create Package
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md">
          <table className="w-full text-left">
            <thead className="border-b border-white/10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-xs font-medium text-white/50"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {isLoading ? (
                <NpmPackagesTableSkeleton />
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/5 hover:bg-white/[0.03]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 align-middle">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-10 text-center text-sm text-white/50"
                  >
                    No packages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NpmPackageEditDialog
        open={createOpen}
        npmPackage={null}
        onClose={() => setCreateOpen(false)}
      />

      <NpmPackageEditDialog
        open={!!editingPackage}
        npmPackage={editingPackage}
        onClose={() => setEditingPackage(null)}
      />

      <NpmPackageDeleteDialog
        open={!!deletingPackage}
        npmPackage={deletingPackage}
        onClose={() => setDeletingPackage(null)}
      />
    </>
  );
}

function NpmPackagesTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-white/5">
          <td className="px-4 py-3">
            <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
            <div className="mt-2 h-3 w-44 animate-pulse rounded bg-white/5" />
          </td>

          <td className="px-4 py-3">
            <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
          </td>

          <td className="px-4 py-3">
            <div className="flex gap-2">
              <div className="h-5 w-12 animate-pulse rounded bg-white/10" />
              <div className="h-5 w-12 animate-pulse rounded bg-white/10" />
            </div>
          </td>

          <td className="px-4 py-3">
            <div className="h-4 w-14 animate-pulse rounded bg-white/10" />
          </td>

          <td className="px-4 py-3">
            <div className="h-4 w-10 animate-pulse rounded bg-white/10" />
          </td>

          <td className="px-4 py-3">
            <div className="h-6 w-12 animate-pulse rounded-full bg-white/10" />
          </td>

          <td className="px-4 py-3">
            <div className="flex justify-end gap-2">
              <div className="h-8 w-8 animate-pulse rounded bg-white/10" />
              <div className="h-8 w-8 animate-pulse rounded bg-white/10" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
