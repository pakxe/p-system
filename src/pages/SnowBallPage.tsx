import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PCFSoftShadowMap } from 'three';
import CameraRig from '../components/CameraRig';
import Button from '../components/Button';
import { css } from '@emotion/react';
import Snowfall from '../components/Snowfall';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import Snowball from './SnoSnowPage/components/Snowball';
import SnowPlane from './SnoSnowPage/components/SnowPlane';

const SnowBallPage = () => {
  const [triggerReset, setTriggerReset] = useState(false); // 값을 바꿀 때마다 초기화한다

  return (
    <>
      <Canvas
        shadows={{ type: PCFSoftShadowMap }}
        camera={{ position: [0, 5, 5.5], fov: 50 }}
        style={{ height: '100vh', width: '100vw' }}>
        <ambientLight intensity={0.2} /> {/* 주변 조명을 어둡게 */}
        <directionalLight
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-mapSize={2048}
          castShadow
          position={[-1, 50, 20]}
          intensity={1.2}
          color={'#84a4e5'}
        />
        {/* 주변을 은은하게 비추는 조명 */}
        <pointLight position={[0, 30, 0]} intensity={10} color={'#f88a72'} distance={100} decay={0.8} />
        <fog attach='fog' args={['#0a0a1a', 10, 80]} />
        <Snowball triggerReset={triggerReset} />
        <SnowPlane />
        <Snowfall />
        <CameraRig />
        {/*   <EffectComposer selectionLayer={1} >
          <Bloom selectionLayer={1}  kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.1} intensity={0.8} />
        </EffectComposer> */}
      </Canvas>
      <div
        css={css`
          position: absolute;
          right: 0;
          bottom: 0;

          margin: 16px;
        `}>
        <Button onClick={() => setTriggerReset((p) => !p)}>눈덩이 초기화</Button>
      </div>
    </>
  );
};

export default SnowBallPage;
