import { TaskInfo } from '../@types/Plan';

export const parseTasksByStatus = (tasks: TaskInfo[], statusName: string[]) => {
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
