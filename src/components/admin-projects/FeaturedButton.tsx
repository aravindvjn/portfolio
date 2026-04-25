"use client";

import { useToggleFeaturedProject } from "@/hooks/mutations/use-projects";
import { ProjectItem } from "@/types/admin.type";
import { cn } from "@/lib/utils";

type Props = {
  row: ProjectItem;
};

const FeaturedButton = ({ row }: Props) => {
  const { mutate, isPending } = useToggleFeaturedProject();

  const isActive = row.isFeatured;

  const handleToggle = () => {
    if (isPending) return;
    mutate(row.id);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300",
        isActive ? "bg-green-500" : "bg-gray-300",
        isPending && "opacity-50 cursor-not-allowed",
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300",
          isActive ? "translate-x-5" : "translate-x-1",
        )}
      />
    </button>
  );
};

export default FeaturedButton;
