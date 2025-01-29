import { css } from '@emotion/react';
import Text from '../../../components/Text';
import RequiredPart from './RequiredPart';

type Props = {
  infos: { name: string; count: number }[];
};

const RequiredPartList = ({ infos }: Props) => {
  return (
    <ol
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}>
      {infos.map(({ name, count }) => (
        <li
          key={name}
          css={css`
            position: relative;

            width: 100px;
          `}>
          <RequiredPart name={name} />
          <Text
            color='white'
            cssProp={css`
              position: absolute;
              right: 0;
              bottom: 0;
            `}>
            x{count}
          </Text>
        </li>
      ))}
    </ol>
  );
};

export default RequiredPartList;
