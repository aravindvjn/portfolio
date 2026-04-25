"use client";

import { useToggleFeaturedNpmPackage } from "@/hooks/mutations/use-npm-packages";
import { NpmPackageTableItem } from "@/hooks/tables/use-npm-packages";
import { cn } from "@/lib/utils";

type Props = {
  row: NpmPackageTableItem;
};

const FeaturedNpmPackageButton = ({ row }: Props) => {
  const { mutate, isPending } = useToggleFeaturedNpmPackage();

  const isActive = row.isFeatured;

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => mutate(row.id)}
      aria-pressed={isActive}
      className={cn(
        "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300",
        isActive ? "bg-emerald-500" : "bg-zinc-300",
        isPending && "cursor-not-allowed opacity-60",
      )}
    >
      <span
        className={cn(
          "inline-block size-5 rounded-full bg-white shadow transition-transform duration-300",
          isActive ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
};

export default FeaturedNpmPackageButton;
