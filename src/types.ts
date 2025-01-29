import { Vector3 } from 'three';

type OrbitalCenter = Vector3;

// 항성 | 생성 = 시스템 내 객체 = system object
export type TSystemObject = {
  name: string;
  mainColor: string;
  objectRadius: number;
  orbitalRadius: number; // 타원 궤도는 이 계에 없다고 가정한다.. 따라서 장, 단 반지름이 아닌 하나의 반지름만 사용한다.
  orbitalSpeed: number; // radian per frame
  rotationSpeed: number;
  axialTilt: number; // 각도. 라디안 아님
  path?: string;
  fileName?: string;
  description?: string;
};

export type TStar = Omit<TSystemObject, 'orbitalRadius' | 'satellites' | 'orbitalSpeed'>;

export type TPlanet = TSystemObject & {
  satellites?: TSatellite[];
};

export type TSatellite = Omit<TPlanet, 'satellites'>;

export type TOrbit = {
  orbitalCenter: OrbitalCenter;
  orbitalRadius: number;
};

export type VECTOR_3 = [number, number, number];

export type Part = {
  name: string;
  id: number;
  position: VECTOR_3;
  targetPosition: VECTOR_3;
  direction?: VECTOR_3;
  length?: number;
  rotation?: VECTOR_3;
};

export type Step = {
  title: string;
  description?: string;
  caution?: string;
  id: number;
  requiredParts: Part[];
  cameraInfo: CameraInfo;
};

type CameraInfo = {
  position: VECTOR_3;
  quaternion?: VECTOR_3;
};
