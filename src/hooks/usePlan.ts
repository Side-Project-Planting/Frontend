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

  const fallback = {
    id: -1,
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
    // TODO: 추후 60초로 간격으로 폴링 하도록 변경할 것
    refetchInterval: 3000000,
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
  }, [plan]);

  const tasksByTab = useMemo(() => {
    const result: Record<number, ITask[]> = {};

    if (filteredPlan) {
      filteredPlan.tabs.forEach((tab) => {
        const { id } = tab;
        result[id] = [];
        tab.taskOrder!.forEach((order) => {
          const foundTask = filteredPlan.tasks.find((item) => item.id === order);
          if (foundTask) {
            result[id].push(foundTask);
          }
        });
      });
    }
    return result;
  }, [filteredPlan]);

  return {
    plan,
    tasksByTab,
  };
}
