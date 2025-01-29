import { TPlanet, TStar } from '../types';

// const DEFAULT_ORBITAL_CENTER = new Vector3(0, 0, 0);

type System = {
  star: TStar;
  planets: TPlanet[];
};

export const system: System = {
  star: {
    name: '썬',
    mainColor: 'white',
    objectRadius: 0.8,
    rotationSpeed: 0.01,
    axialTilt: 14,
  },
  planets: [
    {
      name: '익명이',
      mainColor: 'lightGreen',
      objectRadius: 0.3,
      orbitalRadius: 2.5,
      orbitalSpeed: 0.02,
      rotationSpeed: 0.01,
      axialTilt: 0,
    },
    {
      name: '빙글뱅글 조리립 플래닛',
      description: '3d 조립 설명서',
      path: '/assembly',
      fileName: 'assembly',
      mainColor: 'royalblue',
      objectRadius: 0.5,
      orbitalRadius: 3.5,
      orbitalSpeed: 0.015,
      rotationSpeed: 0.01,
      axialTilt: 120,
    },
    {
      name: '눈눈이 플래닛',
      description: '데굴데굴 눈덩이 굴리기',
      fileName: 'snosnow',
      mainColor: 'lightBlue',
      objectRadius: 0.5,
      orbitalRadius: 5,
      orbitalSpeed: 0.01,
      rotationSpeed: 0.01,
      axialTilt: 0,
      satellites: [
        {
          name: 'Moon',
          mainColor: 'gray',
          objectRadius: 0.2,
          orbitalRadius: 1,
          orbitalSpeed: 0.02,
          rotationSpeed: 0.01,
          axialTilt: 6.68,
        },
      ],
    },
    // {
    //   name: 'Mars',
    //   mainColor: 'red',
    //   objectRadius: 0.9,
    //   orbitalRadius: 7,
    //   orbitalSpeed: 0.008,
    //   rotationSpeed: 0.01,
    //   axialTilt: 25.19,
    // },
    // {
    //   name: 'Jupiter',
    //   mainColor: 'pink',
    //   objectRadius: 1.1,
    //   orbitalRadius: 10,
    //   orbitalSpeed: 0.005,
    //   rotationSpeed: 0.01,
    //   axialTilt: 3.13,
    // },
  ],
};
