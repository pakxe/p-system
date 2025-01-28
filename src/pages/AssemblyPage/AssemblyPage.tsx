import { OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Part from './components/Part';
import { useState } from 'react';
import desk from '../../datas/desk';
import { css } from '@emotion/react';
import StepCamera from './components/StepCamera';
import PreloadModelsWithProgress from '../../components/PreloadModelsWithProgress';
import useCountInRange from '../../hooks/useCountInRange';

const AssemblyPage = () => {
  const [triggerMove, setTriggerMove] = useState(false);
  const { count: curStep, increase, decrease } = useCountInRange({ min: 0, max: desk.length - 1 });
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
        <Sky />

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
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          padding: 10px;

          display: flex;
          flex-direction: column;

          gap: 10px;
        `}>
        <button
          onClick={() => {
            decrease();
            setTriggerMove(false);
          }}>
          prev
        </button>
        <button
          onClick={() => {
            increase();
            setTriggerMove(false);
          }}>
          next
        </button>
        <button onClick={handleMove}>assembly</button>
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
