import React from 'react';
import * as THREE from 'three';

interface CoordinatesDisplayProps {
  point: THREE.Vector3 | null;
}

const CoordinatesDisplay: React.FC<CoordinatesDisplayProps> = ({ point }) => {
  return (
    <div className="absolute right-2 bg-planarific bg-opacity-70 text-white p-2 rounded">
      {point ? (
        <p>
          X: {point.x.toFixed(2)}, Y: {point.y.toFixed(2)}, Z: {point.z.toFixed(2)}
        </p>
      ) : (
        <p>Click on the model to get coordinates</p>
      )}
    </div>
  );
};

export default CoordinatesDisplay;
