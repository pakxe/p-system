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

        &:hover {
          background-color: ${theme.colors.floatHighlight};
        }
      `}>
      {children}
    </button>
  );
};

export default Button;
