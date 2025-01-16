import { css } from '@emotion/react';

import { Mesh } from 'three';

import { SystemObjectInfoModalStyle as style } from './SystemObjectInfoModal.style';

type Props = {
  name: string;

  planetMeshRef: React.RefObject<Mesh>;
  onExplore: () => void;
};

const SystemObjectInfoModal = ({ name, onExplore }: Props) => {
  return (
    <div css={style.modalContainerStyle}>
      <div>
        <h2
          css={css`
            font-weight: 700;
            color: #333;
          `}>
          {name}
        </h2>
        <p
          css={css`
            color: #666;
          `}>
          플래닛의 설명을 적어주세요!
        </p>
      </div>

      <button
        css={css`
          padding: 10px 20px;
          background-color: #f17086;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;

          &:hover {
            transform: scale(1.05);
            box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
          }
        `}
        onClick={onExplore}>
        탐험하기
      </button>
    </div>
  );
};

export default SystemObjectInfoModal;
