import { OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Part from './components/Part';
import { useState } from 'react';
import desk from '../../datas/desk';
import { css } from '@emotion/react';

const AssemblyPage = () => {
  const [triggerMove, setTriggerMove] = useState(false);
  const [curStep, setCurStep] = useState(1);

  const handleMove = () => {
    setTriggerMove((p) => !p);
  };

  return (
    <>
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <Sky />

        {desk.map(
          (step) =>
            step.id <= curStep &&
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

        <OrbitControls />
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
            setCurStep((prev) => prev - 1);
            setTriggerMove(false);
          }}>
          prev
        </button>
        <button
          onClick={() => {
            setCurStep((prev) => prev + 1);
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
    </>
  );
};

export default AssemblyPage;
