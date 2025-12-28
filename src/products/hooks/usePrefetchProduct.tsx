import { useQueryClient } from '@tanstack/react-query'
import { productsActions } from '..';

const usePrefetchProduct = () => {

  const queryClient = useQueryClient();

  const preFetch = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ['product', id],
      queryFn: () => productsActions.getProduct({ id }),
    });
  }

  return preFetch;
}

export default usePrefetchProduct
