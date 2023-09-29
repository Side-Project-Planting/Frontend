import { createGlobalStyle } from 'styled-components';
import Itim from '../assets/fonts/Itim-Regular.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: "itim";
    font-style: normal;
    font-weight: normal;
    src: url(${Itim}) format("truetype");
  }
`;
