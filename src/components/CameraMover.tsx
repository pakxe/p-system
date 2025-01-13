import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Mesh, Vector3 } from 'three';

function CameraMover({
  targetRef,
  exploreTarget,
  isUserInteracting,
}: {
  targetRef: React.RefObject<Mesh>;
  exploreTarget?: Vector3;
  isUserInteracting?: boolean;
}) {
  const { camera } = useThree();
  const currentPos = useRef(camera.position.clone());
  const currentLookAt = useRef(new Vector3(0, 0, 0)); // 카메라 현재 시선
  const lerpSpeed = 0.04; // 부드러운 이동 속도
  const solarSystemViewPosition = new Vector3(-15, 15, -15); // 태양계를 보는 위치 (적절히 조정 가능)
  const solarSystemLookAt = new Vector3(0, 0, 0); // 태양계를 중심으로 시선 고정

  useEffect(() => {
    camera.position.copy(solarSystemViewPosition);
    camera.lookAt(solarSystemLookAt.x, solarSystemLookAt.y, solarSystemLookAt.z);

    // Ref도 초기 위치로 설정
    currentPos.current.copy(solarSystemViewPosition);
    currentLookAt.current.copy(solarSystemLookAt);
  }, [camera]);

  useFrame(() => {
    if (isUserInteracting) {
      if (camera.fov < 75) {
        // 초기 FOV 값으로 복원
        camera.fov += (75 - camera.fov) * lerpSpeed; // fov 부드럽게 증가
        camera.updateProjectionMatrix();
      }

      currentPos.current.lerp(solarSystemViewPosition, lerpSpeed);
      camera.position.copy(currentPos.current);

      currentLookAt.current.lerp(solarSystemLookAt, lerpSpeed);
      camera.lookAt(currentLookAt.current.x, currentLookAt.current.y, currentLookAt.current.z);
      return;
    }

    if (!targetRef?.current) return;

    const targetPosition = targetRef.current.position;

    if (exploreTarget) {
      // 최소 거리 이상일 때만 이동
      const zoomedTargetVector = new Vector3(
        targetPosition.x,
        targetPosition.y + 3,
        targetPosition.z, // 행성 표면 근처로 이동
      );

      currentPos.current.lerp(zoomedTargetVector, lerpSpeed);
      camera.position.copy(currentPos.current);

      if (camera.fov > 20) {
        camera.fov -= (camera.fov - 20) * lerpSpeed; // fov 부드럽게 감소
        camera.updateProjectionMatrix();
      }

      // 타겟 중심을 계속 바라보도록 설정
      camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);

      return;
    }

    // 카메라 위치를 타겟 궤도로 부드럽게 이동
    const targetVector = new Vector3(targetPosition.x, targetPosition.y + 5, targetPosition.z - 10);
    currentPos.current.lerp(targetVector, lerpSpeed);
    camera.position.copy(currentPos.current);

    // 정확히 타겟 중심을 바라보도록 수정
    currentLookAt.current.lerp(targetPosition, lerpSpeed);
    camera.lookAt(
      currentLookAt.current.x - 4,
      currentLookAt.current.y,
      currentLookAt.current.z, // 정확한 중심 좌표 사용
    );
  });

  return null;
}

export default CameraMover;
