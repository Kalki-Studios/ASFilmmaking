import { Suspense, useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Plane } from '@react-three/drei';
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Pre-define our scene images matching the HTML
const sceneImages = [
  '/haldi.png',
  '/mehendi.png',
  '/baraat.png',
  '/pheras.png',
  '/reception.png',
  '/portraits.png'
];

// Preload textures so they start downloading immediately
sceneImages.forEach(url => useTexture.preload(url));

function CinematicImage({ url, active, tintColor, ...props }) {
  const texture = useTexture(url);
  const materialRef = useRef();
  const groupRef = useRef();
  
  // Base scale (width, height)
  const baseScale = [16, 11];

  useEffect(() => {
    if (active) {
      // Fade in and slight scale up (Ken Burns effect)
      gsap.fromTo(materialRef.current, { opacity: 0 }, { opacity: 0.6, duration: 1.5, ease: 'power2.out' });
      gsap.fromTo(groupRef.current.position, { z: -5 }, { z: -2, duration: 10, ease: 'none' });
    } else {
      // Fade out
      gsap.to(materialRef.current, { opacity: 0, duration: 1.5, ease: 'power2.inOut' });
    }
  }, [active]);

  useFrame(({ clock }) => {
    if (active && groupRef.current) {
      // Slow drift
      groupRef.current.position.x = Math.sin(clock.elapsedTime * 0.1) * 0.5;
      groupRef.current.position.y = Math.cos(clock.elapsedTime * 0.1) * 0.5;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <Plane args={baseScale}>
        <meshBasicMaterial
          ref={materialRef}
          map={texture}
          transparent
          opacity={0}
          color={tintColor || '#ffffff'}
        />
      </Plane>
    </group>
  );
}

export default function Scene3D() {
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const handleSceneChange = (e) => {
      setActiveScene(e.detail.index);
    };
    window.addEventListener('scene-change', handleSceneChange);
    return () => window.removeEventListener('scene-change', handleSceneChange);
  }, []);

  const tints = ['#caa23c', '#6b5230', '#7a3018', '#5c0f14', '#1c1240', '#1a1a1a'];

  return (
    <>
      <ambientLight intensity={1} />
      
      <group position={[0, 0, -2]}>
        {sceneImages.map((url, i) => (
          <Suspense key={url} fallback={null}>
            <CinematicImage 
              url={url} 
              active={activeScene === i} 
              tintColor={tints[i]} 
            />
          </Suspense>
        ))}
      </group>

      <EffectComposer>
        <Noise opacity={0.06} />
        <Vignette eskil={false} offset={0.1} darkness={1.2} />
      </EffectComposer>
    </>
  );
}
