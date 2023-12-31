import { useEffect, useMemo } from 'react';

import { useSetRecoilState } from 'recoil';
import { IPlan, ITask } from 'types';

import { getPlanInfo } from '@apis';
import { labelsState, membersState } from '@recoil/atoms';
import { useQuery } from '@tanstack/react-query';

interface UsePlan {
  plan: IPlan;
  tasksByTab: Record<number, ITask[]>;
}

export function usePlan(planId: number, selectedLabels: number[], selectedMembers: number[]): UsePlan {
  const setMembers = useSetRecoilState(membersState);
  const setLabels = useSetRecoilState(labelsState);
  //   const queryClient = useQueryClient();

  const commonOptions = {
    staleTime: 0,
    cacheTime: 300000, // 5 minutes
  };

  const fallback = {
    id: 0,
    title: '',
    description: '',
    public: false,
    members: [],
    tabOrder: [],
    tabs: [],
    labels: [],
    tasks: [],
  };

  const { data: plan = fallback } = useQuery<IPlan, Error>({
    queryKey: ['plan', planId],
    queryFn: () => getPlanInfo(planId),
    ...commonOptions,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchInterval: 60000, // 60 seconds
  });

  const filteredPlan = useMemo(() => {
    if (!plan) {
      return fallback;
    }

    const filteredTasks = plan.tasks.filter((task: ITask) => {
      const labelFilter = selectedLabels.length === 0 || task.labels.some((label) => selectedLabels.includes(label));
      const memberFilter = selectedMembers.length === 0 || selectedMembers.includes(task.assigneeId!);

      return labelFilter && memberFilter;
    });

    return { ...plan, tasks: filteredTasks };
  }, [plan, selectedLabels, selectedMembers]);

  useEffect(() => {
    if (plan) {
      const { members, labels } = plan;
      setMembers(members);
      setLabels(labels);
    }
  }, [plan, setMembers, setLabels]);

  const tasksByTab = useMemo(() => {
    const result: Record<number, ITask[]> = {};

    if (filteredPlan) {
      filteredPlan.tasks.forEach((task) => {
        const { tabId } = task;
        result[tabId] = result[tabId] || [];
        result[tabId].push(task);
      });
    }

    return result;
  }, [filteredPlan]);

  return {
    plan: filteredPlan,
    tasksByTab,
  };
}
