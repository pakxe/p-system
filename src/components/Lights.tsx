const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[1, 1, 1]} intensity={4} color='white' distance={100} power={100} decay={0.2} />
      <hemisphereLight intensity={0.5} />
    </>
  );
};

export default Lights;
