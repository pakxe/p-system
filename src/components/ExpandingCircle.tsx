/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

const circleExpandAnimation = keyframes`
  0% {
    width: 1px;
    height: 1px;
    opacity: 0;
  }
  100% {
    width: 300vw; /* 화면을 꽉 채우는 크기 */
    height: 300vw; /* 화면을 꽉 채우는 크기 */
    opacity: 1;
  }
`;

interface ExpandingCircleProps {
  color?: string; // 동그라미 색상을 지정
}

const ExpandingCircle: React.FC<ExpandingCircleProps> = ({ color }) => {
  const circleStyle = css`
    position: absolute;
    z-index: 1;

    width: 1px; /* 초기 크기 1px */
    height: 1px; /* 초기 크기 1px */
    background: ${color ?? 'cyan'};
    border-radius: 50%; /* 원 모양 */

    opacity: 0; /* 초기 투명도 0 */

    animation: ${circleExpandAnimation} 2s ease-in-out forwards;
    animation-delay: 1s; /* 1초 딜레이 */
  `;

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;

        display: flex;

        position: absolute;

        align-items: center;
        justify-content: center;
      `}>
      <div css={circleStyle} />
    </div>
  );
};

export default ExpandingCircle;
