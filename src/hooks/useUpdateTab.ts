import useToast from './useToast';

import { api } from '@apis';
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

export const createNewTab = async (params: { planId: number; title: string }): Promise<void> => {
  await api.post('/api/tabs', params);
};

export const updateTabTitle = async (params: { planId: number; tabId: number; title: string }) => {
  await api.patch(`/api/tabs/${params.tabId}/title`, { planId: params.planId, title: params.title });
};

export const deleteTab = async (params: { planId: number; tabId: number }) => {
  await api.delete(`/api/tabs/${params.tabId}?planId=${params.planId}`);
};

export const dragTab = async (params: { planId: number; targetId: number; newPrevId: number | null }) => {
  await api.post('api/tabs/change-order', params);
};

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
