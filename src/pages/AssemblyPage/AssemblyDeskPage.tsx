import { Canvas } from '@react-three/fiber';
import Part from './components/Part';
import { useEffect, useState } from 'react';
import desk from '../../datas/desk';
import { css, keyframes } from '@emotion/react';
import StepCamera from './components/StepCamera';
import PreloadModelsWithProgress from '../../components/PreloadModelsWithProgress';
import useCountInRange from '../../hooks/useCountInRange';
import Button from '../../components/Button';
import StepList from './components/StepList';
import useConfirmRequiredPartsModal from './hooks/useConfirmRequiredPartsModal';

const animation = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const AssemblyDeskPage = () => {
  const [isAssembled, setIsAssembled] = useState(false);
  const { count: curStep, increase, decrease, update } = useCountInRange({ min: 0, max: desk.length - 1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const { open } = useConfirmRequiredPartsModal();

  const handleMove = () => {
    setIsAssembled((p) => !p);
  };

  const activeSteps = desk.filter((step) => step.id <= curStep);

  useEffect(() => {
    if (!isLoaded) return;

    open();
  }, [isLoaded]);

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;

        background: linear-gradient(-45deg, #eccac0, #f8c5d8, #bae4f4, #c4f4e9);
        background-size: 400% 400%;
        animation: ${animation} 15s ease;
      `}>
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[-10, 10, 0]} intensity={2} />

        <PreloadModelsWithProgress
          setter={() => setIsLoaded(true)}
          names={desk.flatMap((step) => step.requiredParts.map((part) => part.name))}
        />

        {isLoaded &&
          activeSteps.map((step) =>
            step.requiredParts.map((part) => (
              <Part
                key={part.id}
                name={part.name}
                position={part.position}
                targetPosition={part.targetPosition}
                isMoved={step.id < curStep ? true : isAssembled}
                rotation={part.rotation}
                direction={part.direction}
                length={part.length}
              />
            )),
          )}

        <StepCamera cameraPosition={desk[curStep].cameraInfo.position} />
      </Canvas>
      {isLoaded && (
        <>
          <StepList steps={desk} curStep={curStep} handleStep={update} />
          <div
            css={css`
              position: absolute;
              bottom: 0;
              right: 0;
              padding: 10px;

              display: flex;
              flex-direction: column;

              align-items: end;

              gap: 10px;
            `}>
            <Button onClick={handleMove}>{isAssembled ? '해체하기' : '조립하기'}</Button>
            <div
              css={css`
                display: flex;
                gap: 16px;
              `}>
              <Button
                disabled={curStep === 0}
                onClick={() => {
                  decrease();
                  setIsAssembled(false);
                }}>
                이전 스텝으로
              </Button>
              <Button
                disabled={curStep === desk.length - 1}
                onClick={() => {
                  increase();
                  setIsAssembled(false);
                }}>
                다음 스텝으로
              </Button>
            </div>
            <div
              css={css`
                position: absolute;
                padding: 10px;
              `}>
              {}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssemblyDeskPage;
