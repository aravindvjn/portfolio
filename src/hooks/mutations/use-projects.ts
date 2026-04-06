import { createProjectAction, deleteProjectAction, updateProjectAction } from "@/actions/project.action";
import { ADMIN_QUERY_KEYS } from "@/lib/query-keys";
import { ProjectPayload, UpdateProjectPayload } from "@/types/admin.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProjectPayload) => createProjectAction(payload),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.projects,
        });
      }
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProjectPayload) => updateProjectAction(payload),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.projects,
        });
      }
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProjectAction(id),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.projects,
        });
      }
    },
  });
}