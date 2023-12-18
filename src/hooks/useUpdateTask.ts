import useToast from './useToast';

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
  const { showToast } = useToast();

  const { mutate: createTaskMutate } = useMutation({
    mutationFn: (data: TaskInfo) => createNewTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      showToast('태스크가 추가되었습니다.', { type: 'success' });
    },
  });

  const { mutate: updateTaskMutate } = useMutation({
    mutationFn: (data: UpdateTaskInfo) => updateTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      showToast('태스크가 수정되었습니다', { type: 'success' });
    },
  });

  const { mutate: deleteTaskMutate } = useMutation({
    mutationFn: (data: { taskId: number }) => deleteTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      showToast('태스크가 삭제되었습니다.', { type: 'success' });
    },
  });

  const { mutate: dragTaskMutate } = useMutation({
    mutationFn: (data: DragInfo) => dragTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      showToast('태스크 순서가 변경되었습니다.', { type: 'success' });
    },
  });

  return { createTaskMutate, updateTaskMutate, deleteTaskMutate, dragTaskMutate };
}
