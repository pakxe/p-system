import { css } from '@emotion/react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import Spacing from '../../../components/Spacing';
import Text from '../../../components/Text';
import desk from '../../../datas/desk';
import { Step } from '../../../types';
import { ModalProps } from '../../../types/modalType';
import RequiredPartList from './RequiredPartList';

const calcPartCount = (steps: Step[]) => {
  const map = new Map<string, number>();

  steps.forEach((step) => {
    step.requiredParts.forEach((part) => {
      map.set(part.name, (map.get(part.name) || 0) + 1);
    });
  });

  return Array.from(map).map(([name, count]) => ({ name, count }));
};

const ConfirmAllRequiredPartsModal = ({ isOpened, onClose }: ModalProps) => {
  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <div
        css={css`
          height: 100%;

          display: flex;
          flex-direction: column;

          justify-content: space-between;
        `}>
        <div>
          <Text size={30} color='white' weight={700}>
            모든 부품이 존재하는지 확인해주세요.
          </Text>
          <Text color='white' weight={700}>
            필요 시 부품을 클릭하여 상세 정보를 볼 수 있습니다.
          </Text>
          <Spacing height={16} />

          <RequiredPartList infos={calcPartCount(desk)} />
        </div>

        <Button fullWidth onClick={onClose}>
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmAllRequiredPartsModal;
