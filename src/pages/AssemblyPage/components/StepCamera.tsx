import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Vector3 } from 'three';
import { VECTOR_3 } from '../../../types';
import { OrbitControls } from '@react-three/drei';

type Props = {
  cameraPosition: VECTOR_3;
};

const StepCamera = ({ cameraPosition }: Props) => {
  const [isCameraMoving, setIsCameraMoving] = useState(false);

  const { camera }: { camera: PerspectiveCamera } = useThree();
  const targetPos = useRef(new Vector3(...cameraPosition));

  const lerpSpeed = 0.04;
  const threshold = 0.1;

  useEffect(() => {
    setIsCameraMoving(true);
    targetPos.current.set(...cameraPosition);
  }, [cameraPosition]);

  useFrame(() => {
    if (!isCameraMoving) return;

    // 카메라 위치 업데이트
    camera.position.lerp(targetPos.current, lerpSpeed);

    // 카메라 시선 업데이트
    const target = camera.clone();
    target.lookAt(0, 0, 0);

    camera.quaternion.slerp(target.quaternion, 0.9);

    // 목표 위치에 근접하면 이동 중단
    if (camera.position.distanceTo(targetPos.current) < threshold) {
      camera.position.copy(targetPos.current);
      // camera.lookAt(0, 0, 0);

      setIsCameraMoving(false);
    }
  });

  // TODO: 시선도 변화시킬거면 target을 ref로 저장하여 수정한다.
  return <>{!isCameraMoving && <OrbitControls target={new Vector3(0, 0, 0)} />}</>;
};

export default StepCamera;
