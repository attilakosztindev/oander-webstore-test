import { ref } from 'vue';

const filterType = ref({ label: 'NO FILTER', val: 'no-filter'});

export function useFilterType() {
  const setFilterType = (type) => {
    filterType.value = type;
  };

  return { filterType, setFilterType };
}