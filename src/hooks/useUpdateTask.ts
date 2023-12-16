import { api } from '@apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface TaskInfo {
  planId: number;
  tabId: number;
  assigneeId: number | undefined;
  title: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  labels: number[];
}
interface UpdateTaskInfo extends TaskInfo {
  taskId: number;
}

interface DragInfo {
  planId: number;
  targetTabId: number;
  targetId: number;
  newPrevId: number | null;
}

export const createNewTask = async (params: TaskInfo): Promise<void> => {
  await api.post('/api/tasks', params);
};

export const updateTask = async (params: UpdateTaskInfo) => {
  await api.put(`/api/tasks/${params.taskId}`, {
    planId: params.planId,
    tabId: params.tabId,
    assigneeId: params.assigneeId,
    title: params.title,
    description: params.description,
    startDate: params.startDate,
    endDate: params.endDate,
    labels: params.labels,
  });
};

export const deleteTask = async (params: { taskId: number }) => {
  await api.delete(`/api/tasks/${params.taskId}`);
};

export const dragTask = async (params: DragInfo) => {
  const response = await api.put('api/tasks/change-order', params);
  return response;
};

export function useUpdateTask(planId: number) {
  const queryClient = useQueryClient();

  const { mutate: createTaskMutate } = useMutation({
    mutationFn: (data: TaskInfo) => createNewTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
    },
  });

  const { mutate: updateTaskMutate } = useMutation({
    mutationFn: (data: UpdateTaskInfo) => updateTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
    },
  });

  const { mutate: deleteTaskMutate } = useMutation({
    mutationFn: (data: { taskId: number }) => deleteTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
    },
  });

  const { mutate: dragTaskMutate } = useMutation({
    mutationFn: (data: DragInfo) => dragTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
    },
  });

  return { createTaskMutate, updateTaskMutate, deleteTaskMutate, dragTaskMutate };
}
