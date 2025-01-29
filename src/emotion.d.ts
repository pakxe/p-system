// emotion useTheme, themeprovider를 사용하려면 이 타입 파일을 만들어야 한다.

import '@emotion/react';
import theme from './theme';

type ThemeType = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
