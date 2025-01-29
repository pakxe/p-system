import { Suspense } from 'react';
import PreloadModel from './PreloadModel';
import Progress from './Progress';

type Props = {
  names: string[];
  setter: () => void;
};

const PreloadModelsWithProgress = ({ names, setter }: Props) => {
  return (
    <Suspense fallback={<Progress setter={setter} />}>
      {names.map((name) => (
        <PreloadModel name={name} />
      ))}
    </Suspense>
  );
};

export default PreloadModelsWithProgress;
