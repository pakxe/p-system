import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

const NUM_SNOWFLAKES = 200; // 눈송이 개수

function Snowfall() {
  const snowRef = useRef();
  const positions = useRef(new Float32Array(NUM_SNOWFLAKES * 3));
  const speeds = useRef(new Float32Array(NUM_SNOWFLAKES));

  useEffect(() => {
    for (let i = 0; i < NUM_SNOWFLAKES; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 20;
      positions.current[i * 3 + 1] = Math.random() * 10 + 5;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speeds.current[i] = Math.random() * 0.02 + 0.01;
    }
  }, []);

  useFrame(() => {
    for (let i = 0; i < NUM_SNOWFLAKES; i++) {
      positions.current[i * 3 + 1] -= speeds.current[i];

      if (positions.current[i * 3 + 1] < -2) {
        positions.current[i * 3 + 1] = Math.random() * 10 + 5;
        positions.current[i * 3] = (Math.random() - 0.5) * 20;
        positions.current[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
    }
    snowRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={snowRef}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' array={positions.current} count={NUM_SNOWFLAKES} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color='white' transparent opacity={0.9} />
    </points>
  );
}

export default Snowfall;
