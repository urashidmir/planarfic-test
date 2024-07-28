import React, { useState, useRef, Suspense, useCallback, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stage, PresentationControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import MetadataView from './MetadataView';
import Model3D from './Model3D';
import CoordinatesDisplay from './CoordinatesDisplay';
import useModelDetail from '../hooks/useModelDetail';

interface Model3DViewProps {
  id: number;
}

const API_URL: string = process.env.REACT_APP_API_URL || '';
const API_TOKEN: string = process.env.REACT_APP_API_TOKEN || '';

const Model3DView: React.FC<Model3DViewProps> = ({ id }) => {
  const [clickedPoint, setClickedPoint] = useState<THREE.Vector3 | null>(null);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const orbitRef = useRef<OrbitControlsImpl>(null);

  const initialCameraPosition = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 5));
  const initialCameraRotation = useRef<THREE.Euler>(new THREE.Euler(0, 0, 0));

  const { modelDetail, error } = useModelDetail(id, API_URL, API_TOKEN);

  const handleClick = useCallback((intersection: THREE.Intersection) => {
    if (intersection && intersection.point) {
      setClickedPoint(intersection.point);
    }
  }, []);

  const toggleWireframe = useCallback(() => {
    setWireframe((prev) => !prev);
  }, []);

  const resetView = useCallback(() => {
    if (orbitRef.current) {
      orbitRef.current.object.position.copy(initialCameraPosition.current);
      orbitRef.current.object.rotation.copy(initialCameraRotation.current);
      orbitRef.current.update();
    }
    setWireframe(false);
    setClickedPoint(null);
  }, []);

  useEffect(() => {
    if (orbitRef.current) {
      initialCameraPosition.current.copy(orbitRef.current.object.position);
      initialCameraRotation.current.copy(orbitRef.current.object.rotation);
    }
  }, [modelDetail]);

  if (error) {
    return <div>Error loading model details</div>;
  }

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      <Suspense fallback={<div>Loading...</div>}>
        {modelDetail && (
          <>
            <div className="flex-1 relative">
              <Canvas camera={{ position: initialCameraPosition.current.toArray() }} className="w-full h-full" shadows style={{ position: 'absolute' }}>
                {/* eslint-disable-next-line react/no-unknown-property */}
                <color attach="background" args={['#000000']} />
                <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
                  <Stage environment="sunset">
                    <Model3D url={modelDetail.model} wireframe={wireframe} onClick={handleClick} />
                  </Stage>
                </PresentationControls>
                <OrbitControls ref={orbitRef} />
              </Canvas>
              <CoordinatesDisplay point={clickedPoint} />
              <button
                className="absolute bottom-2 right-2 bg-planarific text-white p-2 rounded"
                onClick={toggleWireframe}
              >
                {wireframe ? 'Textured' : 'Wireframe'}
              </button>
              <button
                className="absolute bottom-2 right-48 bg-planarific text-white p-2 rounded"
                onClick={resetView}
              >
                Reset View
              </button>
            </div>
            <div className="h-1/4 overflow-y-auto">
              <MetadataView modelDetail={modelDetail} />
            </div>
          </>
        )}
      </Suspense>
    </div>
  );
};

export default Model3DView;
