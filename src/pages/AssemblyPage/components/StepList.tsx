import { css } from '@emotion/react';
import { Step } from '../../../types';
import Button from '../../../components/Button';
import StepInfo from './StepInfo';

type Props = {
  steps: Step[];
  curStep: number;

  handleStep: (step: number) => void;
};

const StepList = ({ steps, curStep, handleStep }: Props) => {
  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px;

        display: flex;
        flex-direction: column;

        align-items: end;

        gap: 10px;
      `}>
      <ol
        css={css`
          position: relative;

          display: flex;
          flex-direction: column;

          gap: 0.5rem;
        `}>
        {steps.map((step) => (
          <li key={step.id}>
            <Button
              isClicked={curStep === step.id}
              onClick={() => {
                handleStep(step.id);
              }}>
              {step.id + 1}
            </Button>
            {curStep === step.id && <StepInfo step={step} />}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default StepList;
