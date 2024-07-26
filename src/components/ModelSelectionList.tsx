import React, { memo } from 'react';
import ModelSelectionItem from './ModelSelectionItem';
import { Model } from '../types';


interface ModelSelectionListProps {
  models: Model[];
  onSelect: (id: number) => void;
}

const ModelSelectionList: React.FC<ModelSelectionListProps> = ({ models, onSelect }) => {
  return (
    <div className="w-full overflow-y-auto p-4 bg-gray-100">
      {models.map((model) => (
        <ModelSelectionItem key={model.id} model={model} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default memo(ModelSelectionList);
