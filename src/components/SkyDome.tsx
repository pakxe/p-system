import { useMemo, useRef } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';

function SkyDome() {
  const domeRef = useRef<Mesh>(null!);

  const gradientMaterial = useMemo(() => {
    const uniforms = {
      color1: { value: new THREE.Color('#042a32') },
      color2: { value: new THREE.Color('#505050') },
      color3: { value: new THREE.Color('#0c2b7b') },
    };

    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
          varying vec3 vPosition;
          void main() {
            vPosition = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
      fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          varying vec3 vPosition;
  
          void main() {
            float mixFactor = (vPosition.y + 1.0) / 2.0;
            vec3 color;
  
            if (mixFactor < 0.5) {
              color = mix(color1, color3, mixFactor * 2.0);
            } else {
              color = mix(color3, color2, (mixFactor - 0.5) * 2.0);
            }
  
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      side: THREE.BackSide, // 천구 내부에서만 보이도록 설정
    });
  }, []);

  return (
    <mesh ref={domeRef}>
      <sphereGeometry args={[500, 64, 64]} /> {/* 큰 구체 */}
      <primitive attach='material' object={gradientMaterial} />
    </mesh>
  );
}

export default SkyDome;
