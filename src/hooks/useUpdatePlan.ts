import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import useToast from './useToast';

import { api } from '@apis';
import { currentPlanIdState } from '@recoil/atoms';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PlanInfo {
  requestBody: { title: string; intro: string; invitedEmails: string[]; isPublic: boolean };
}

interface UpdatePlanInfo {
  planId: number;
  requestBody: {
    isPublic: boolean;
    ownerId: number | undefined;
    invitedEmails: string[];
    kickingMemberIds: number[];
    title: string;
    intro: string;
  };
}

interface DeleteInfo {
  planId: number;
}

export const createNewPlan = async (params: PlanInfo) => {
  const { data } = await api.post('/api/plans', params.requestBody);
  return data;
};

export const updatePlanInfo = async (params: UpdatePlanInfo) => {
  await api.put(`/api/plans/update/${params.planId}`, params.requestBody);
};

export const deletePlan = async (params: { planId: number }) => {
  await api.delete(`/api/plans/${params.planId}`);
};

export function useUpdatePlan(planId: number | null) {
  const navigate = useNavigate();
  const setCurrentPlanId = useSetRecoilState(currentPlanIdState);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate: createPlanMutate } = useMutation({
    mutationFn: async (data: PlanInfo) => {
      const response = await createNewPlan(data);
      return response;
    },

    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['allPlanTitles'] });
      showToast('플랜이 추가되었습니다.', { type: 'success' });
      setCurrentPlanId(result.id);
      navigate(`/plan/${result.id}`);
    },
  });

  const { mutate: updatePlanInfoMutate } = useMutation({
    mutationFn: (data: UpdatePlanInfo) => updatePlanInfo(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      showToast('플랜 정보가 수정되었습니다.', { type: 'success' });
    },
  });

  const { mutate: deletePlanMutate } = useMutation({
    mutationFn: (data: DeleteInfo) => deletePlan(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPlanTitles'] });
      showToast('플랜이 삭제되었습니다.', { type: 'success' });
    },
  });

  return { createPlanMutate, updatePlanInfoMutate, deletePlanMutate };
}
