import React from 'react';
import { ModelDetail } from '../types';

interface MetadataViewProps {
  modelDetail: ModelDetail
}

const MetadataView: React.FC<MetadataViewProps> = ({ modelDetail }) => {

  return (
    <div className="p-4 overflow-y-auto bg-gray-100 h-48 md:h-auto">
      {modelDetail && (
        <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50">Description</th>
            <th className="px-6 py-3 bg-gray-50">Address 1</th>
            <th className="px-6 py-3 bg-gray-50">City</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            <tr key={modelDetail.id}>
              <td className="px-6 py-4 whitespace-nowrap">{modelDetail.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{modelDetail.address1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{modelDetail.city}</td>
            </tr>
        </tbody>
      </table>) }

    </div>
  );
};

export default MetadataView;

