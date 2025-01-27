import { Sky, Stars } from '@react-three/drei';

const NightSky = () => {
  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[0, -1, 0]} // 태양 위치를 낮게 설정
        inclination={0}
        azimuth={0.25}
      />

      <Stars radius={100} depth={1} count={3000} factor={10} saturation={0} fade />
    </>
  );
};

export default NightSky;
