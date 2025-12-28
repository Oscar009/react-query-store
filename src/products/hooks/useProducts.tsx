import { useQuery } from "@tanstack/react-query"
import { productsActions } from "..";

interface Options {
  filterkey?: string;
}

const useProducts = ({ filterkey }: Options) => {
  const { data: products = [], isLoading, isError, isFetching, error } = useQuery({
    queryKey: ['products', filterkey],
    queryFn: () => productsActions.getProducts({ filterkey }),
    staleTime: 60 * 60 * 1000,
  })

  return {
    products,
    isLoading,
    isError,
    isFetching,
    error,
  }
}

export default useProducts
