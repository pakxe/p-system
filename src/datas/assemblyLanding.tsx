import { Step } from '../types';

type AssemblyLanding = {
  title: string;
  description?: string;
}[];

export const ASSEMBLY_LANDING: AssemblyLanding = [
  {
    title: '빙글뱅글 조리립 행성에 오신 것을 환영합니다!!',
    description: '이곳은 물건을 쉽게 조립할 수 있도록 안내하는 3D 조립 설명 페이지입니다.',
  },
  {
    title: '조립에 필요한 단계는 왼쪽 상단에 순서대로 나열됩니다.',
    description: '원하는 단계로 이동하여 해당 단계를 다시 보거나, 더 미래의 조립 방법을 확인할 수 있어요.',
  },
  {
    title: '조립에 필요한 부품은 왼쪽 상단 정보창에 나열됩니다.',
    description: '부품을 클릭하여 해당 부품의 자세한 정보와 모습을 확인할 수 있어요.',
  },
  {
    title: '조립이 완료되면 다음 단계로 넘어가기 위해 "다음 스텝으로" 버튼을 클릭하세요.',
    description: '조립이 어렵다면 어려운 부분으로 확대 후 해체와 조립을 반복해보세요.\n',
  },
  {
    title: '성공적인 조립을 기원합니다!',
  },
];

export const DUMMY_STEP: Step = {
  title: '조립해볼까요?',
  description: '부품들을 클릭해보세요.',
  id: 0,
  requiredParts: [
    {
      name: 'bolts',
      id: 0,
      position: [0, 0, 0],
      targetPosition: [0, 0, 0],
    },
    {
      name: 'left_frame',
      id: 1,
      position: [0, 0, 0],
      targetPosition: [0, 0, 0],
    },
  ],
  cameraInfo: {
    position: [0, 0, 0],
  },
};
