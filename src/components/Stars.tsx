import { useEffect, useRef } from 'react';
import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from 'three';

function Stars() {
  const pointsRef = useRef<Points>(null);

  useEffect(() => {
    const starCount = 10000; // 별의 개수
    const starRange = 2000; // 별이 생성될 범위

    // 별의 위치 배열 생성
    const stars = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      stars[i] = (Math.random() - 0.5) * starRange; // x
      stars[i + 1] = (Math.random() - 0.5) * starRange; // y
      stars[i + 2] = (Math.random() - 0.5) * starRange; // z
    }

    // Geometry와 PointsMaterial 설정
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(stars, 3));

    const material = new PointsMaterial({
      size: 1.5, // 별 크기
      sizeAttenuation: true, // 원근 효과
      color: 'white', // 별 색상
    });

    if (pointsRef.current) {
      pointsRef.current.geometry = geometry;
      pointsRef.current.material = material;
    }
  }, []);

  return <points ref={pointsRef} />;
}

export default Stars;
