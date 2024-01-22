import useToast from './useToast';

import { createNewTask, updateTask, deleteTask, dragTask, TaskInfo, UpdateTaskInfo, DragInfo } from '@apis/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
