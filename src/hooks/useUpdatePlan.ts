import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import useToast from './useToast';

import { createNewPlan, updatePlanInfo, deletePlan, PlanInfo, UpdatePlanInfo, DeleteInfo } from '@apis/index';
import { currentPlanIdState } from '@recoil/atoms';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
