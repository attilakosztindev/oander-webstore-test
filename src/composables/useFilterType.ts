import { ref, Ref } from 'vue'

interface FilterType {
  label: string
  val: string
}

const filterType = ref<Ref<FilterType>>({ label: 'NO FILTER', val: 'no-filter' });

export function useFilterType() {
  const setFilterType = (type: FilterType): void => {
    filterType.value = type
  };

  return { filterType, setFilterType }
}