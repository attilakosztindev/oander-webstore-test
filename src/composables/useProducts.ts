import { ref, onMounted } from 'vue';
import axios from 'axios';

export function useProducts() {
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get<Product[]>('https://63500f5078563c1d82b7d0ab.mockapi.io/oander-frontend/products');
      return response.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      loading.value = false;
    }
  };

  return {
    error,
    loading,
    fetchProducts,
  };
}
