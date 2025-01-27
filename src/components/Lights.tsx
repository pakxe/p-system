const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} /> {/* 환경광 */}
      <pointLight position={[1, 1, 1]} intensity={100} color='white' distance={500} power={250} decay={0.5} />
      <hemisphereLight intensity={0.5} />
    </>
  );
};

export default Lights;
