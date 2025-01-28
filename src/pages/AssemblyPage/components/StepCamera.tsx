import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Vector3 } from 'three';

const StepCamera = ({ cameraPosition }: { cameraPosition: [number, number, number] }) => {
  const { camera }: { camera: PerspectiveCamera } = useThree();
  const [isCameraMoving, setIsCameraMoving] = useState(false);
  const targetPos = useRef(new Vector3(...cameraPosition));
  const lerpSpeed = 0.04;
  const threshold = 0.1;

  useEffect(() => {
    setIsCameraMoving(true);
    targetPos.current.set(...cameraPosition);
  }, [cameraPosition]);

  useFrame(() => {
    if (!isCameraMoving) return;

    camera.position.copy(camera.position.lerp(targetPos.current, lerpSpeed));

    if (camera.position.distanceTo(targetPos.current) < threshold) {
      camera.position.copy(targetPos.current);
      setIsCameraMoving(false);
    }
  });

  return null;
};

export default StepCamera;
