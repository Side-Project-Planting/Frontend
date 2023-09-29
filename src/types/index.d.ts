// Image
declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const value: string;
  export default value;
}

// Fonts
declare module '*.ttf';
