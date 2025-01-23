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
    objectRadius: 1,
    rotationSpeed: 0.01,
    axialTilt: 0,
  },
  planets: [
    {
      name: 'Mercury',
      mainColor: 'gray',
      objectRadius: 0.3,
      orbitalRadius: 2.5,
      orbitalSpeed: 0.02,
      rotationSpeed: 0.01,
      axialTilt: 0,
    },
    {
      name: 'Venus',
      mainColor: 'yellow',
      objectRadius: 0.5,
      orbitalRadius: 3.5,
      orbitalSpeed: 0.015,
      rotationSpeed: 0.01,
      axialTilt: 177.4,
    },
    {
      name: 'Earth',
      mainColor: 'blue',
      objectRadius: 0.7,
      orbitalRadius: 5,
      orbitalSpeed: 0.01,
      rotationSpeed: 0.01,
      axialTilt: 23.5,
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
        {
          name: 'Mooon',
          mainColor: 'white',
          objectRadius: 0.1,
          orbitalRadius: 1.5,
          orbitalSpeed: 0.015,
          rotationSpeed: 0.01,
          axialTilt: 1.54,
        },
      ],
    },
    {
      name: 'Mars',
      mainColor: 'red',
      objectRadius: 0.9,
      orbitalRadius: 7,
      orbitalSpeed: 0.008,
      rotationSpeed: 0.01,
      axialTilt: 25.19,
    },
    {
      name: 'Jupiter',
      mainColor: 'pink',
      objectRadius: 1.1,
      orbitalRadius: 10,
      orbitalSpeed: 0.005,
      rotationSpeed: 0.01,
      axialTilt: 3.13,
    },
  ],
};
