import { useState, useEffect } from 'react';

export const useMapData = () => {
  const [data, setData] = useState({
    claims: [],
    villages: [],
    assets: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true }));
        
        // Mock data
        const mockData = {
          claims: [
            { id: 1, village: 'Balaghat Village', type: 'IFR', status: 'approved' },
            { id: 2, village: 'Khargone Settlement', type: 'CFR', status: 'pending' },
          ],
          villages: [
            { id: 1, name: 'Balaghat Village', population: 450 },
            { id: 2, name: 'Khargone Settlement', population: 320 },
          ],
          assets: [
            { id: 1, type: 'water_body', name: 'Village Pond', status: 'active' },
            { id: 2, type: 'forest', name: 'Sacred Grove', status: 'protected' },
          ],
        };

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setData({
          ...mockData,
          loading: false,
          error: null,
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch map data',
        }));
      }
    };

    fetchData();
  }, []);

  return data;
};