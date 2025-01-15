const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} /> {/* 기본 조명 */}
      <pointLight position={[10, 10, 10]} intensity={1} /> {/* 방향성 조명 */}
      <directionalLight position={[-10, 10, -10]} intensity={3} /> {/* 추가 조명 */}
    </>
  );
};

export default Lights;
