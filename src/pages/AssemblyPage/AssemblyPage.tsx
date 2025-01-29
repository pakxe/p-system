import { css, keyframes, useTheme } from '@emotion/react';
import useCountInRange from '../../hooks/useCountInRange';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import desk from '../../datas/desk';
import StepInfo from './components/StepInfo';
import PreloadModelsWithProgress from '../../components/PreloadModelsWithProgress';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ASSEMBLY_LANDING } from '../../datas/assemblyLanding';

const animation = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;
const AssemblyPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { count: step, increase, decrease } = useCountInRange({ min: 0, max: ASSEMBLY_LANDING.length - 1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAssembled, setIsAssembled] = useState(false);
  const handleMove = () => {
    setIsAssembled((p) => !p);
  };
  return (
    <>
      <div
        css={css`
          background-color: ${theme.colors.primary};

          width: 100vw;
          height: 100vh;

          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: ${animation} 15s ease;

          display: flex;
          justify-content: center;
          align-items: center;
        `}>
        {!isLoaded && (
          <Canvas>
            <PreloadModelsWithProgress
              setter={() => setIsLoaded(true)}
              names={desk.flatMap((step) => step.requiredParts.map((part) => part.name))}
            />
          </Canvas>
        )}

        {isLoaded && (
          <>
            {step >= 1 && step < 3 && (
              <div
                css={css`
                  position: absolute;
                  left: 0;
                  top: 0;

                  display: flex;
                  flex-direction: column;
                  padding: 10px;
                  gap: 8px;
                `}>
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
              </div>
            )}
            {step === 2 && <StepInfo step={desk[2]} />}
            {step === 3 && (
              <div
                css={css`
                  position: absolute;
                  bottom: 0;
                  right: 0;
                  padding: 10px;

                  display: flex;
                  flex-direction: column;

                  align-items: end;

                  gap: 10px;
                `}>
                <Button onClick={handleMove}>{isAssembled ? '해체하기' : '조립하기'}</Button>
                <div
                  css={css`
                    display: flex;
                    gap: 16px;
                  `}>
                  <Button disabled={true} onClick={() => {}}>
                    이전 스텝으로
                  </Button>
                  <Button onClick={() => {}}>다음 스텝으로</Button>
                </div>
              </div>
            )}
          </>
        )}

        {isLoaded && (
          <div
            css={css`
              background-color: ${theme.colors.floatHighlight};

              width: 60%;
              height: 300px;

              border-radius: 16px;

              padding: 32px;

              display: flex;
              flex-direction: column;

              justify-content: space-between;
              align-items: center;
            `}>
            <div>
              <Text color='white' size={24}>
                {ASSEMBLY_LANDING[step].title}
              </Text>
              <Text color='white' size={16}>
                {ASSEMBLY_LANDING[step].description}
              </Text>
            </div>
            <div
              css={css`
                display: flex;
                gap: 16px;

                width: 100%;
              `}>
              {step !== 0 && (
                <Button fullWidth onClick={decrease}>
                  이전
                </Button>
              )}
              <Button
                fullWidth
                onClick={step === ASSEMBLY_LANDING.length - 1 ? () => (location.href = '/assembly/desk') : increase}>
                {step === ASSEMBLY_LANDING.length - 1 ? '시작하기' : '다음'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AssemblyPage;
