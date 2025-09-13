import { useState } from 'react';

export const useFilters = () => {
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    status: '',
    dateRange: '',
    search: '',
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      state: '',
      district: '',
      status: '',
      dateRange: '',
      search: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  };
};