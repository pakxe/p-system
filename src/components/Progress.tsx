import { Html, useProgress } from '@react-three/drei';
import { useEffect } from 'react';
import Z_INDEX from '../constants/zIndex';

const Progress = ({ setter }: { setter: () => void }) => {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setter();
    }
  }, [progress, setter]);

  return <Html zIndexRange={[Z_INDEX.FLOATING_ON_CANVAS, 0]}>{Math.round(progress)}% loaded</Html>;
};

export default Progress;
