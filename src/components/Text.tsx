import { css, SerializedStyles } from '@emotion/react';
import { ComponentProps } from 'react';

type Props = ComponentProps<'p'> & {
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  lineLimit?: number;
  cssProp?: SerializedStyles;
  children: React.ReactNode;
  size?: number;
  weight?: number;
};

const Text = ({ size, color, textAlign, lineLimit, children, cssProp, weight }: Props) => {
  return (
    <p
      css={css`
        /* ${TYPOGRAPHY[type]} */
        font-size: ${size ?? 16}px;
        font-weight: ${weight ?? 400};
        color: ${color ?? 'black'};
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
