import { css, keyframes } from '@emotion/react';

const warpAnimation = keyframes`
  0% {
    transform: scale(0.1);
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
`;

const WarpEffect = () => {
  const containerStyle = css`
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const lineStyle = (index: number) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 100%;
    background: cyan;
    opacity: 0.7;
    transform-origin: center top;
    transform: rotate(${index * 36}deg) scale(${0.1 + index * 0.1});
    animation: ${warpAnimation} 1.5s infinite;
    animation-delay: ${index * 0.1}s;
  `;

  return (
    <div css={containerStyle}>
      {[...Array(10)].map((_, index) => (
        <div key={index} css={lineStyle(index)} />
      ))}
    </div>
  );
};

export default WarpEffect;
