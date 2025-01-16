import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { css } from '@emotion/react';
import * as THREE from 'three';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import ExpandingCircle from './components/ExpandingCircle';
import Orbit from './components/Orbit';
import Planet from './components/Planet';
import CameraMover from './components/CameraMover';
import { planets } from './datas/planets';
import Lights from './components/Lights';
import SpaceBackground from './components/SpaceBackground';

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

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        position: relative;
      `}
      onWheel={clearSelectedState}>
      {/* 탐험 시작하면 페이지 전환 효과 */}
      {isExplore && <ExpandingCircle color={planets.find((planet) => planet.name === targetName)?.mainColor} />}

      <Canvas
        camera={{
          near: 1,
          far: 5000, // 먼 거리까지 렌더링
        }}>
        <SpaceBackground />
        <Lights />
        {/* 행성 렌더링 */}
        {planets.map((planet, index) => (
          <group key={index}>
            <Orbit radius={planet.orbitalRadius} />
            <Planet
              {...planet}
              mainColor={planet.mainColor}
              planetRadius={planet.planetRadius}
              orbitalSpeed={planet.orbitalSpeed}
              orbitalCenter={new THREE.Vector3(0, 0, 0)}
              orbitalRadius={planet.orbitalRadius}
              rotationSpeed={0.01}
              onExplore={() => setIsExplore(true)} // 탐험하기 버튼 클릭 처리
              onClick={(ref) => {
                setIsExplore(false);
                setSelectedSystemObjectRef(ref); // 클릭된 행성의 ref를 설정
                setTargetName(planet.name);
              }}
              targetName={targetName}
              onHover={(name) => console.log(name)}
            />
          </group>
        ))}
        <CameraMover isExplore={isExplore} selectedSystemObjectRef={selectedSystemObjectRef} />
        <EffectComposer multisampling={8}>
          <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.4} intensity={0.6} />
          <Bloom kernelSize={4} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.5} />
        </EffectComposer>
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
