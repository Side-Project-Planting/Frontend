import { ITask } from 'types';

import { getTask } from '@apis';
import { useQuery } from '@tanstack/react-query';

interface UseTask {
  task: ITask;
}

export function useTask(task: ITask): UseTask {
  const fallback = {
    id: task.id,
    title: task.title,
    tabId: task.tabId,
    labels: task.labels,
    assigneeId: task.assigneeId,
    startDate: task.startDate,
    endDate: task.endDate,
    description: task.description,
  };

  const { data: fullTask = fallback } = useQuery<ITask, Error>({
    queryKey: ['task', task.id],
    queryFn: () => getTask(task.id),
  });

  return {
    task: fullTask,
  };
}
