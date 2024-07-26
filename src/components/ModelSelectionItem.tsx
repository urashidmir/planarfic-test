import React, { memo } from 'react';

interface ModelSelectionItemProps {
  model: { id: number; thumbnail: string };
  onSelect: (id: number) => void;
}

const ModelSelectionItem: React.FC<ModelSelectionItemProps> = ({ model, onSelect }) => {
  const { id, thumbnail } = model;

  return (
    <div 
      className="p-2 cursor-pointer hover:bg-gray-300 border-b"
      onClick={() => onSelect(id)}
    >
      <img src={thumbnail} alt={`Model ${id}`} className="w-full h-auto" />
    </div>
  );
};

export default memo(ModelSelectionItem);
