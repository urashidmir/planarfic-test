import { useState, useEffect } from 'react';
import axios from 'axios';
import { ModelDetail } from '../types';

const useModelDetail = (id: number, apiUrl: string, apiToken: string) => {
  const [modelDetail, setModelDetail] = useState<ModelDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });
        setModelDetail(response.data);
      } catch (error) {
        setError('Error fetching model details');
      }
    };

    fetchModel();
  }, [id, apiUrl, apiToken]);

  return { modelDetail, error };
};

export default useModelDetail;