import useToast from './useToast';

import { createNewLabel, LabelInfo } from '@apis/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLabel(planId: number) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate: createLabelMutate } = useMutation({
    mutationFn: (data: LabelInfo) => createNewLabel(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      showToast('라벨이 추가되었습니다.', { type: 'success' });

      //   TODO: 응답 헤더에서 라벨 id 가져와서 setLabels,
      //   TODO: 지금 headers에서 location을 가져올 수 없다. 백에서 CORS설정이 필요한 것 같음
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
