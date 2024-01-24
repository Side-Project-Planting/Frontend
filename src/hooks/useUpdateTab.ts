import useToast from './useToast';

import { createNewTab, updateTabTitle, deleteTab, dragTab } from '@apis/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PlanInfo {
  planId: number;
  title: string;
}

interface PlanInfoWithTab extends PlanInfo {
  tabId: number;
}

interface DeleteInfo {
  planId: number;
  tabId: number;
}

interface TabOrderInfo {
  planId: number;
  targetId: number;
  newPrevId: number | null;
}

export function useUpdateTab(planId: number) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate: createTabMutate } = useMutation({
    mutationFn: (data: PlanInfo) => createNewTab(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      showToast('탭이 추가되었습니다.', { type: 'success' });
    },
  });

  const { mutate: updateTabTitleMutate } = useMutation({
    mutationFn: (data: PlanInfoWithTab) => updateTabTitle(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      showToast('탭 이름이 변경되었습니다.', { type: 'success' });
    },
  });

  const { mutate: deleteTabMutate } = useMutation({
    mutationFn: (data: DeleteInfo) => deleteTab(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      showToast('탭이 삭제되었습니다.', { type: 'success' });
    },
  });

  const { mutate: dragTabMutate } = useMutation({
    mutationFn: (data: TabOrderInfo) => dragTab(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      showToast('탭 순서가 변경되었습니다.', { type: 'success' });
    },
  });

  return { createTabMutate, updateTabTitleMutate, deleteTabMutate, dragTabMutate };
}
