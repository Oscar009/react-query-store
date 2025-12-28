import { useQuery } from "@tanstack/react-query"
import { productsActions } from "..";

interface Options {
  id: number;
}

const useProduct = ({ id }: Options) => {
  const { data: product, isLoading, isError, isFetching, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsActions.getProduct({ id }),
    staleTime: 60 * 60 * 1000,
  })

  return {
    product,
    isLoading,
    isError,
    isFetching,
    error,
  }
}

export default useProduct;
