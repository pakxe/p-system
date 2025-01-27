import { VECTOR_3 } from '../types';

type Part = {
  name: string;
  id: number;
  position?: VECTOR_3;
  targetPosition?: VECTOR_3;
  direction?: VECTOR_3;
  length?: number;
  rotation?: VECTOR_3;
};

type Step = {
  title: string;
  description?: string;
  caution?: string;
  id: number;
  requiredParts: Part[];
};

const desk: Step[] = [
  {
    title: '책상 본판 조립하기',
    description: '책상을 뒤집고 작업하면 편해요!',
    id: 1,
    requiredParts: [
      {
        name: 'plane',
        id: 1,
      },
      {
        name: 'main_frame',
        id: 2,
        position: [0, -2, 0],
        targetPosition: [0, 0, 0],
      },
      {
        name: 'bolt',
        id: 3,
        position: [26, -6, 12],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [26, -1, 12],
        rotation: [Math.PI, 0, 0],
      },
      {
        name: 'bolt',
        id: 4,
        position: [-27.5, -6, 12],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-27.5, -1, 12],
        rotation: [Math.PI, 0, 0],
      },
      {
        name: 'bolt',
        id: 5,
        position: [26, -6, -12],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [26, -1, -12],
        rotation: [Math.PI, 0, 0],
      },
      {
        name: 'bolt',
        id: 6,
        position: [-27.5, -6, -12],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-27.5, -1, -12],
        rotation: [Math.PI, 0, 0],
      },
    ],
  },
  {
    title: '책상 오른쪽 다리 조립하기',
    description: '책상을 뒤집고 작업하면 편해요!',
    caution: '반드시 책상과 나사의 방향을 정확히 수평으로 맞춰주세요!\n그렇지 않으면 책상 합판에 구멍이 날 수 있어요.',
    id: 2,
    requiredParts: [
      {
        name: 'right_frame',
        id: 1,
        position: [3, 0, 0],
        targetPosition: [0, 0, 0],
      },
      {
        name: 'bolt',
        id: 2,
        position: [34, -1, 12],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [28, -1, 12],
        rotation: [0, 0, -Math.PI / 2],
      },
      {
        name: 'bolt',
        id: 3,
        position: [34, -1, -12],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [28, -1, -12],
        rotation: [0, 0, -Math.PI / 2],
      },
    ],
  },
  {
    title: '책상 왼쪽 서랍 조립하기 (1/3)',
    description: '책상을 뒤집고 작업하면 편해요!',
    id: 3,
    requiredParts: [
      {
        name: 'left_frame',
        id: 1,
        position: [0, -3, 0],
        targetPosition: [0, 0, 0],
      },
      {
        name: 'bolt',
        id: 2,
        position: [-26, -10, 12],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-26, -2.5, 12],
        rotation: [Math.PI, 0, 0],
      },
      {
        name: 'bolt',
        id: 3,
        position: [-26, -10, -12],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-26, -2.5, -12],
        rotation: [Math.PI, 0, 0],
      },
      {
        name: 'bolt',
        id: 4,
        position: [-17, -10, 12],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-17, -2.5, 12],
        rotation: [Math.PI, 0, 0],
      },
      {
        name: 'bolt',
        id: 5,
        position: [-17, -10, -12],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-17, -2.5, -12],
        rotation: [Math.PI, 0, 0],
      },
    ],
  },
  {
    title: '책상 왼쪽 서랍 조립하기 (2/3)',
    description: '',
    id: 4,
    requiredParts: [
      {
        name: 'drawer_plane_1',
        id: 1,
        position: [-10, 0, 0],
        targetPosition: [0, 0, 0],
        direction: [1, 0, 0],
        length: 15,
      },
      {
        name: 'drawer_plane_2',
        id: 2,
        position: [-10, 0, 0],
        targetPosition: [0, 0, 0],
        direction: [1, 0, 0],
        length: 15,
      },
    ],
  },
  {
    title: '책상 왼쪽 서랍 조립하기 (3/3)',
    id: 5,
    requiredParts: [
      {
        name: 'bolt',
        id: 1,
        position: [-27.5, -24.2, 17],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-27.5, -24.2, 12.3],
        rotation: [Math.PI / 2, 0, 0],
      },
      {
        name: 'bolt',
        id: 2,
        position: [-15.5, -24.2, 17],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-15.5, -24.2, 12.3],
        rotation: [Math.PI / 2, 0, 0],
      },
      {
        name: 'bolt',
        id: 3,
        position: [-15.5, -13.5, 17],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-15.5, -13.5, 12.3],
        rotation: [Math.PI / 2, 0, 0],
      },
      {
        name: 'bolt',
        id: 4,
        position: [-27.5, -13.5, 17],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-27.5, -13.5, 12.3],
        rotation: [Math.PI / 2, 0, 0],
      },
      {
        name: 'bolt',
        id: 5,
        position: [-27.5, -24.2, -17],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-27.5, -24.2, -12.3],
        rotation: [-Math.PI / 2, 0, 0],
      },
      {
        name: 'bolt',
        id: 6,
        position: [-15.5, -24.2, -17],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-15.5, -24.2, -12.3],
        rotation: [-Math.PI / 2, 0, 0],
      },
      {
        name: 'bolt',
        id: 7,
        position: [-15.5, -13.5, -17],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-15.5, -13.5, -12.3],
        rotation: [-Math.PI / 2, 0, 0],
      },
      {
        name: 'bolt',
        id: 8,
        position: [-27.5, -13.5, -17],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-27.5, -13.5, -12.3],
        rotation: [-Math.PI / 2, 0, 0],
      },
    ],
  },
  {
    title: '책상 본판 흔들림 저감 부품 조립하기(1/2)',
    id: 6,
    requiredParts: [
      {
        name: 'main_anti_shake_1',
        id: 1,
        position: [0, 0, -3],
        targetPosition: [0, 0, 0],
      },
      {
        name: 'main_anti_shake_2',
        id: 2,
        position: [0, 0, -6],
        targetPosition: [0, 0, 0],
      },
      {
        name: 'bolt',
        id: 3,
        position: [6.3, -13.9, -22],
        direction: [0, -1, 0],
        length: 8,
        targetPosition: [6.3, -13.7, -12.5],
        rotation: [-Math.PI / 2, 0, 0],
      },
    ],
  },
  {
    title: '책상 본판 흔들림 저감 부품 조립하기(2/2)',
    id: 7,
    requiredParts: [
      {
        name: 'bolt',
        id: 1,
        position: [-15.5, -26, -17],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-15.5, -26, -12.2],
        rotation: [-Math.PI / 2, 0, 0],
      },
      {
        name: 'bolt',
        id: 2,
        position: [-15.5, -2, -17],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-15.5, -2, -12.2],
        rotation: [-Math.PI / 2, 0, 0],
      },
      {
        name: 'bolt',
        id: 3,
        position: [27.7, -26, -17],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [27.7, -26, -12.2],
        rotation: [-Math.PI / 2, 0, 0],
      },
      {
        name: 'bolt',
        id: 4,
        position: [27.7, -2, -17],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [27.7, -2, -12.2],
        rotation: [-Math.PI / 2, 0, 0],
      },
    ],
  },
  {
    title: '책상 서랍 흔들림 저감 부품 조립하기(1/2)',
    id: 8,
    requiredParts: [
      {
        name: 'drawer_anti_shake_1',
        id: 1,
        position: [-3, 0, 0],
        targetPosition: [0, 0, 0],
      },
      {
        name: 'drawer_anti_shake_2',
        id: 2,
        position: [-6, 0, 0],
        targetPosition: [0, 0, 0],
      },

      {
        name: 'bolt',
        id: 3,
        position: [-38, -13.6, 0.1],
        direction: [0, -1, 0],
        length: 8,
        targetPosition: [-28, -13.6, 0.1],

        rotation: [0, 0, Math.PI / 2],
      },
    ],
  },
  {
    title: '책상 서랍 흔들림 저감 부품 조립하기(2/2)',
    id: 9,
    requiredParts: [
      {
        name: 'bolt',
        id: 1,
        position: [-32, -1, -12.2],
        direction: [0, -1, 0],
        length: 7.5,
        targetPosition: [-28, -1, -12.2],
        rotation: [0, 0, Math.PI / 2],
      },
      {
        name: 'bolt',
        id: 2,
        position: [-32, -1, 12.2],
        direction: [0, -1, 0],
        length: 8,
        targetPosition: [-28, -1, 12.2],
        rotation: [0, 0, Math.PI / 2],
      },
      {
        name: 'bolt',
        id: 3,
        position: [-32, -26, 12.2],
        direction: [0, -1, 0],
        length: 8,
        targetPosition: [-28, -26, 12.2],
        rotation: [0, 0, Math.PI / 2],
      },
      {
        name: 'bolt',
        id: 4,
        position: [-32, -26, -12.2],
        direction: [0, -1, 0],
        length: 8,
        targetPosition: [-28, -26, -12.2],
        rotation: [0, 0, Math.PI / 2],
      },
    ],
  },
];

export default desk;
