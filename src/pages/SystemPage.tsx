import { RefObject, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { css } from '@emotion/react';
import * as THREE from 'three';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import Lights from '../components/Lights';
import SpaceBackground from '../components/SpaceBackground';
import ExpandingCircle from '../components/ExpandingCircle';
import { system } from '../datas/system';
import Planet from '../components/Planet';
import Star from '../components/Star';
import CameraMover from '../components/CameraMover';
import Button from '../components/Button';
import Text from '../components/Text';
import Z_INDEX from '../constants/zIndex';

function SystemPage() {
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
        <Star {...system.star} axialTilt={20} modelName='s' onClick={onSelect} />
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

        <CameraMover isExplore={isExplore} selectedSystemObjectRef={selectedSystemObjectRef} />
        <EffectComposer autoClear={false}>
          <Bloom kernelSize={4} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.2} />
        </EffectComposer>
      </Canvas>
      <div
        css={css`
          position: absolute;
          top: 20px;
          right: 20px;

          z-index: ${Z_INDEX.FLOATING_ON_CANVAS};

          display: flex;
          gap: 16px;
          align-items: center;
        `}>
        <Text color='white' weight={600} size={20}>
          공전하는 행성들을 클릭해 탐험해보세요! 💫
        </Text>
        <Button onClick={clearSelectedState}>위에서 바라보기</Button>
      </div>
    </div>
  );
}

export default SystemPage;
