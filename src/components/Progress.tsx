import { Html, useProgress } from '@react-three/drei';
import { useEffect } from 'react';

const Progress = ({ setter }: { setter: () => void }) => {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setter();
    }
  }, [progress, setter]);

  return <Html center>{Math.round(progress)}% loaded</Html>;
};

export default Progress;
