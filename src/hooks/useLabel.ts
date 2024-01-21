import useToast from './useToast';

import { api } from '@apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LabelInfo {
  planId: number;
  name: string;
}

export const createNewLabel = async (params: { planId: number; name: string }): Promise<void> => {
  await api.post('/api/labels', params);
};

export function useLabel(planId: number) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate: createLabelMutate } = useMutation({
    mutationFn: (data: LabelInfo) => createNewLabel(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      showToast('라벨이 추가되었습니다.', { type: 'success' });

      //   TODO: 응답 헤더에서 라벨 id 가져올지 고민
      //   if (headers && headers.location) {
      //     const splitLocation = headers.location.split('/');
      //     const labelId = splitLocation[splitLocation.length - 1];
      //     return labelId;
      //   }
      //   return -1;
    },
  });

  return { createLabelMutate };
}
