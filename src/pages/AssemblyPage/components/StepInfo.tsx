import { css, useTheme } from '@emotion/react';
import Text from '../../../components/Text';
import { Part, Step } from '../../../types';
import RequiredPartList from './RequiredPartList';

type Props = {
  step: Step;
};

const getPartCount = (requiredPart: Part[]) => {
  //  name을 map의 키로, count를 map의 value로 하는 Map 자료구조를 반환
  const mapArr = Array.from(
    requiredPart.reduce((acc, part) => {
      acc.set(part.name, (acc.get(part.name) || 0) + 1);
      return acc;
    }, new Map<string, number>()),
  );

  const res = [];
  for (let i = 0; i < mapArr.length; i++) {
    res.push({ name: mapArr[i][0], count: mapArr[i][1] });
  }
  return res;
};

const StepInfo = ({ step }: Props) => {
  const theme = useTheme();

  return (
    <div
      css={css`
        position: absolute;
        left: 56px;
        top: 0;

        background-color: ${theme.colors.float};
        border-radius: 12px;

        width: 250px;

        padding: 16px;
      `}>
      <Text color='white' weight={700}>
        {step.title}
      </Text>
      <Text color='white'>{step.description}</Text>
      <Text color='primary'>{step?.caution}</Text>

      <RequiredPartList infos={getPartCount(step.requiredParts)} />
    </div>
  );
};

export default StepInfo;
