import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ModelSelectionList from './components/ModelSelectionList';
import Model3DView from './components/Model3DView';
import useModels from './hooks/useModels';

const App: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  const API_URL:string = process.env.REACT_APP_API_URL || '';
  const API_TOKEN:string = process.env.REACT_APP_API_TOKEN || '';

  const { models, error } = useModels(API_URL, API_TOKEN);

  const handleModelSelect = useCallback((id: number) => {
    setSelectedModel(id);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {models.length > 0 ? (
          <div className="w-1/4 h-full overflow-y-auto">
            <ModelSelectionList models={models} onSelect={handleModelSelect} />
          </div>
        ) : (
          <div className="w-1/4 h-full flex items-center justify-center text-gray-500">
            {error || 'Loading models...'}
          </div>
        )}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {!selectedModel && (
            <div className="flex items-center justify-center flex-1 text-center text-gray-500">
              Select the model on the left to display it here
            </div>
          )}
          {selectedModel && (
           <div className="flex flex-col flex-1 overflow-y-auto">
              <Model3DView id={selectedModel} />
            </div>
         
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
