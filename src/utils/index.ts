import { ITaskInfo, IPlanTitle } from 'types';

import { getAllPlanTitles } from '@apis';
import { queryClient } from '@components/react-query/queryClient';

export const parseTasksByStatus = (tasks: ITaskInfo[], statusName: string[]) => {
  const parsedTasks = [];

  tasks.sort((a, b) => {
    if (a.deadline === b.deadline && a.deadline.length === 0) return 0;
    if (a.deadline.length === 0 && b.deadline.length > 0) return 1;
    if (b.deadline.length === 0 && a.deadline.length > 0) return -1;
    if (a.deadline < b.deadline) return -1;
    if (a.deadline === b.deadline) return 0;
    return 1;
  });

  for (let i = 0; i < statusName.length - 1; i += 1) {
    parsedTasks.push(tasks.filter((task) => task.status === i));
  }
  return parsedTasks;
};

export const hashStringToColor = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    // TODO: 가중치를 이용해 색상 조정 로직 보완
    const code = id.charCodeAt(i);
    let weight = 1;
    if (code >= '0'.charCodeAt(0) && code <= '9'.charCodeAt(0)) weight += 500;
    hash = code * weight + ((hash << 5) - hash); // eslint-disable-line no-bitwise
  }

  // range: 90 ~ 219
  const hue = 90 + (hash % 120);
  // range: 30 ~ 59
  const saturation = 30 + (hash % 30);
  // range: 50 ~ 69
  const lightness = 50 + ((hash >> 1) % 20); // eslint-disable-line no-bitwise

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// TODO: 어느 파일에 둬야할지 고민
export const prefetchAndSetPlanId = async (
  setCurrentPlanId: (value: number | ((currVal: number) => number)) => void,
) => {
  // 프리패치
  await queryClient.prefetchQuery({ queryKey: ['allPlanTitles'], queryFn: getAllPlanTitles });

  // 프리패치가 완료된 후에 데이터를 가져와서 처리
  const allPlanTitles = queryClient.getQueryData<IPlanTitle[]>(['allPlanTitles']);
  if (allPlanTitles && allPlanTitles.length > 0) {
    setCurrentPlanId(allPlanTitles[0].id);
  }
};
