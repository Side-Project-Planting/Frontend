import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import Itim from '@assets/fonts/Itim-Regular.ttf';

export default createGlobalStyle`

  @font-face {
    font-family: "Itim";
    font-style: normal;
    font-weight: normal;
    src: url(${Itim}) format("truetype");
  }
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard-Bold';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  ${reset}

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #ececec;
    border-radius: 1rem;
  }

  ::-webkit-scrollbar-track {
    background: #fff;
  }

  /* 여기에 추가적인 전역 스타일을 설정할 수 있습니다 */
  body {
    font-family: "Pretendard-Regular",'itim', sans-serif;;
    line-height: 1.5;
  }

  *{
    box-sizing: border-box;
  }

  input{
    border: none;
    font-family: inherit;
    font-size: inherit;
  }

  textarea {
    border: none;
    font-size: inherit;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: inherit;
    &:focus{
      outline: none;
    }
  }

  ul,li{
    list-style: none;
  }
`;
