import { RefObject, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { css } from '@emotion/react';
import * as THREE from 'three';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import Planet from './components/Planet';
import CameraMover from './components/CameraMover';
import { system } from './datas/system';
import Lights from './components/Lights';
import SpaceBackground from './components/SpaceBackground';
import Star from './components/Star';

// App 컴포넌트
function App() {
  const [selectedSystemObjectRef, setSelectedSystemObjectRef] = useState<React.RefObject<THREE.Mesh> | null>(null);
  const [targetName, setTargetName] = useState<string | null>(null); // 클릭된 행성 이름
  const [isExplore, setIsExplore] = useState(false);

  const clearSelectedState = () => {
    setSelectedSystemObjectRef(null);
    setTargetName(null);
    setIsExplore(false);
  };

  const onExplore = () => {
    setIsExplore(true);
  };

  const onSelect = (ref: RefObject<THREE.Mesh>, name: string) => {
    setIsExplore(false);
    setSelectedSystemObjectRef(ref); // 클릭된 행성의 ref를 설정
    setTargetName(name);
  };

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        position: relative;
      `}
      onWheel={clearSelectedState}>
      {/* 탐험 시작하면 페이지 전환 효과 */}
      {isExplore && <ExpandingCircle color={system.planets.find((planet) => planet.name === targetName)?.mainColor} />}

      <Canvas
        camera={{
          near: 1,
          far: 5000, // 먼 거리까지 렌더링
        }}>
        <SpaceBackground />
        <Lights />
        {/* 행성 렌더링 */}
        <Star {...system.star} axialTilt={20} modelName='s' onClick={onSelect} onExplore={onExplore} />
        {system.planets.map((planet, index) => (
          <group key={index}>
            <Planet
              {...planet}
              mainColor={planet.mainColor}
              objectRadius={planet.objectRadius}
              orbitalSpeed={planet.orbitalSpeed}
              orbitalRadius={planet.orbitalRadius}
              rotationSpeed={0.01}
              onExplore={onExplore}
              onClick={onSelect}
              targetName={targetName}
            />
          </group>
        ))}
        {/* <mesh ref={ref}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial
            emissive='#ffffff' // 발광 색상
            emissiveIntensity={0.2} // 발광 강도
          />
        </mesh> */}
        <CameraMover isExplore={isExplore} selectedSystemObjectRef={selectedSystemObjectRef} />
        <EffectComposer autoClear={false}>
          <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.1} intensity={0.6} />
          <Bloom kernelSize={5} luminanceThreshold={0} luminanceSmoothing={0} intensity={1} />
          {/* <Outline
            // selection={ref}
            visibleEdgeColor={0xfaa000} // the color of visible edges
            edgeThickness={1}
            edgeStrength={10}
            blur={true}
            kernelSize={4}
          /> */}
        </EffectComposer>
        <axesHelper args={[5]} />
      </Canvas>
      <button
        css={css`
          position: absolute;
          top: 20px;
          right: 20px;

          z-index: 100;
        `}
        onClick={clearSelectedState}>
        system으로 돌아가기
      </button>
    </div>
  );
}

export default App;
