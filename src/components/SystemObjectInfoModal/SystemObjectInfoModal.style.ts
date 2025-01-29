import { css, keyframes } from '@emotion/react';
import { Theme } from '@emotion/react/dist/declarations/src';

const zeroGravityShakeAnimation = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg) skewX(355deg);
  }
  10% {
    transform: translate(5px, -5px) rotate(1deg) skewX(356deg);
  }
  20% {
    transform: translate(-6px, 6px) rotate(-1.5deg) skewX(357deg);
  }
  30% {
    transform: translate(4px, -4px) rotate(2deg) skewX(355deg);
  }
  40% {
    transform: translate(-5px, 5px) rotate(-2.5deg) skewX(354deg);
  }
  50% {
    transform: translate(3px, -3px) rotate(1.5deg) skewX(355deg);
  }
  60% {
    transform: translate(-4px, 4px) rotate(-1deg) skewX(356deg);
  }
  70% {
    transform: translate(2px, -2px) rotate(0.9deg) skewX(357deg);
  }
  80% {
    transform: translate(-3px, 3px) rotate(-0.5deg) skewX(356deg);
  }
  90% {
    transform: translate(1px, -1px) rotate(0.5deg) skewX(355deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg) skewX(355deg);
  }
  `;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px); /* 약간 작고 아래에 위치 */
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0); /* 원래 크기와 위치 */
  }
  `;

const modalContainerStyle = (theme: Theme) => css`
  padding: 16px;
  font-size: 14px;
  background-color: ${theme.colors.floatWhite};
  border-radius: 10px;
  cursor: pointer;
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  animation: ${fadeInAnimation} 0.5s ease-out forwards, ${zeroGravityShakeAnimation} 5s infinite ease-in-out;

  /* 3D 효과 */
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1), 0px 6px 10px rgba(0, 0, 0, 0.05), 0px 10px 15px rgba(0, 0, 0, 0.03);
  transform-style: preserve-3d;
  transform: rotateX(5deg) rotateY(-5deg); /* 카드에 약간의 입체감을 줌 */
`;

const SystemObjectInfoModalStyle = {
  modalContainerStyle,
};

export { SystemObjectInfoModalStyle };
