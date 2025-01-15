import { Vector3 } from 'three';
import { TPlanet } from '../types';

export const planets: TPlanet[] = [
  {
    name: 'Mercury',
    mainColor: 'gray',
    planetRadius: 0.3,
    orbitalRadius: 2.5,
    orbitalSpeed: 0.02,
    rotationSpeed: 0.01,
    orbitalCenter: new Vector3(0, 0, 0),
  },
  {
    name: 'Venus',
    mainColor: 'yellow',
    planetRadius: 0.5,
    orbitalRadius: 3.5,
    orbitalSpeed: 0.015,
    rotationSpeed: 0.01,
    orbitalCenter: new Vector3(0, 0, 0),
  },
  {
    name: 'Earth',
    mainColor: 'blue',
    planetRadius: 0.7,
    orbitalRadius: 5,
    orbitalSpeed: 0.01,
    rotationSpeed: 0.01,
    orbitalCenter: new Vector3(0, 0, 0),
    satellites: [
      {
        name: 'Moon',
        mainColor: 'gray',
        planetRadius: 0.2,
        orbitalRadius: 1,
        orbitalSpeed: 0.02,
        rotationSpeed: 0.01,
      },
      {
        name: 'Mooon',
        mainColor: 'white',
        planetRadius: 0.1,
        orbitalRadius: 1.5,
        orbitalSpeed: 0.015,
        rotationSpeed: 0.01,
      },
    ],
  },
  {
    name: 'Mars',
    mainColor: 'red',
    planetRadius: 0.9,
    orbitalRadius: 7,
    orbitalSpeed: 0.008,
    rotationSpeed: 0.01,
    orbitalCenter: new Vector3(0, 0, 0),
  },
  {
    name: 'Jupiter',
    mainColor: 'pink',
    planetRadius: 1.1,
    orbitalRadius: 10,
    orbitalSpeed: 0.005,
    rotationSpeed: 0.01,
    orbitalCenter: new Vector3(0, 0, 0),
  },
];
