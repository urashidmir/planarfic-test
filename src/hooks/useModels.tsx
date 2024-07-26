import { useState, useEffect } from 'react';
import axios from 'axios';
import { Model } from '../types';

const useModels = (apiUrl: string, apiToken: string) => {
  const [models, setModels] = useState<Model[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });
        if (Array.isArray(response.data)) {
          setModels(response.data);
        } else {
          setError('API response is not an array');
        }
      } catch (error) {
        setError('Error fetching models');
      }
    };

    fetchModels();
  }, [apiUrl, apiToken]);

  return { models, error };
};

export default useModels;
