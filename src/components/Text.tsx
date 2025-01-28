import { css, SerializedStyles, useTheme } from '@emotion/react';
import { ComponentProps } from 'react';
import theme from '../theme';

type Props = ComponentProps<'p'> & {
  textAlign?: 'left' | 'center' | 'right';
  color?: keyof typeof theme.colors;
  lineLimit?: number;
  cssProp?: SerializedStyles;
  children: React.ReactNode;
  size?: number;
  weight?: number;
};

const Text = ({ size, color, textAlign, lineLimit, children, cssProp, weight }: Props) => {
  const theme = useTheme();

  return (
    <p
      css={css`
        font-size: ${size ?? 16}px;
        font-weight: ${weight ?? 400};
        color: ${color ? theme.colors[color] : 'black'};
        text-align: ${textAlign || 'left'};

        display: flex;
        ${cssProp}

        ${lineLimit &&
        css`
          overflow: hidden; /* 줄임표 사용하려면 모든 속성이 필요하다. */
          -webkit-line-clamp: ${lineLimit};
          -webkit-box-orient: vertical;
          display: -webkit-box;
        `}
      `}>
      {children}
    </p>
  );
};

export default Text;
