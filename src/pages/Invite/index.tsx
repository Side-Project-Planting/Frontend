import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { acceptInvitation } from '@apis';
import { Wrapper } from '@pages/Main/styles';
import { accessTokenState } from '@recoil/atoms';
import { authenticate } from '@utils/auth';

function Invite() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const { uuid } = useParams();

  useEffect(() => {
    authenticate(accessToken, setAccessToken);
  }, [accessToken]);

  return (
    <Wrapper>
      <button
        type="button"
        onClick={() => {
          if (uuid) acceptInvitation(uuid);
          //   TODO: react-query로 변경, 로그인 안했을 때 리다이렉트, uuid 기록, planTitles invalidate하기
        }}
      >
        수락하기
      </button>
    </Wrapper>
  );
}

export default Invite;
