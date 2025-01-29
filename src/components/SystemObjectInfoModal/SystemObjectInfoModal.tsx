import { Mesh } from 'three';

import { SystemObjectInfoModalStyle as style } from './SystemObjectInfoModal.style';
import Button from '../Button';
import Text from '../Text';

type Props = {
  name: string;
  path?: string;
  description?: string;

  planetMeshRef: React.RefObject<Mesh>;
  onExplore: () => void;
};

const SystemObjectInfoModal = ({ path, name, onExplore, description }: Props) => {
  const clickHandler = async () => {
    onExplore();

    if (!path) return;

    await new Promise((res) => setTimeout(() => res(null), 3000));

    location.href = path;
  };

  return (
    <div css={style.modalContainerStyle}>
      <div>
        <Text weight={600} size={20}>
          {name}
        </Text>
        <Text>{description}</Text>
      </div>

      <Button onClick={clickHandler} disabled={!path}>
        {path ? '탐험하기' : '아직 원시 행성이라 탐험할 수 없어요.'}
      </Button>
    </div>
  );
};

export default SystemObjectInfoModal;
