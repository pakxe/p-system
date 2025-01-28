import { Canvas } from '@react-three/fiber';
import Part from './components/Part';
import { useState } from 'react';
import desk from '../../datas/desk';
import { css } from '@emotion/react';
import StepCamera from './components/StepCamera';
import PreloadModelsWithProgress from '../../components/PreloadModelsWithProgress';
import useCountInRange from '../../hooks/useCountInRange';
import Button from '../../components/Button';
import StepList from './components/StepList';

const AssemblyPage = () => {
  const [triggerMove, setTriggerMove] = useState(false);
  const { count: curStep, increase, decrease, update } = useCountInRange({ min: 0, max: desk.length - 1 });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMove = () => {
    setTriggerMove((p) => !p);
  };

  const activeSteps = desk.filter((step) => step.id <= curStep);

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
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
                isMoved={step.id < curStep ? true : triggerMove}
                rotation={part.rotation}
                direction={part.direction}
                length={part.length}
              />
            )),
          )}

        <StepCamera cameraPosition={desk[curStep].cameraInfo.position} />
      </Canvas>
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
        <Button onClick={handleMove}>assembly</Button>
        <div
          css={css`
            display: flex;
            gap: 16px;
          `}>
          <Button
            onClick={() => {
              decrease();
              setTriggerMove(false);
            }}>
            prev
          </Button>
          <Button
            onClick={() => {
              increase();
              setTriggerMove(false);
            }}>
            next
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
    </div>
  );
};

export default AssemblyPage;
