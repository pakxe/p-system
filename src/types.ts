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
