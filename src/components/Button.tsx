import { css, useTheme } from '@emotion/react';
import { ComponentProps } from 'react';

type Props = ComponentProps<'button'> & {
  children: React.ReactNode;
  isClicked?: boolean;
};

const Button = ({ children, isClicked, ...rest }: Props) => {
  const theme = useTheme();

  return (
    <button
      {...rest}
      css={css`
        min-width: 42px;
        height: 42px;

        background-color: ${isClicked ? theme.colors.floatHighlight : theme.colors.float};
        color: ${theme.colors.white};

        border-radius: 12px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1rem;

        transition: background-color 0.3s ease, transform 0.3s ease;

        &:hover {
          background-color: ${theme.colors.floatHighlight};
          transform: scale(1.05);
        }

        &:active {
          transform: scale(0.95);
        }

        &:disabled {
          background-color: ${theme.colors.floatShallow};
        }
      `}>
      {children}
    </button>
  );
};

export default Button;
