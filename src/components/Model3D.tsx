import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Model3DProps {
  url: string;
  wireframe: boolean;
  onClick: (e: THREE.Intersection) => void;
}

const Model3D: React.FC<Model3DProps> = ({ url, wireframe, onClick }) => {
  const { scene } = useGLTF(url);
  // eslint-disable-next-line 
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material.wireframe = wireframe;
    }
  });

  return (
    <primitive 
      // eslint-disable-next-line react/no-unknown-property
      object={scene} 
      // eslint-disable-next-line
      onClick={(event: any) => {
        event.stopPropagation();
        onClick(event.intersections[0]);
      }} 
    />
  );
};

export default Model3D;
