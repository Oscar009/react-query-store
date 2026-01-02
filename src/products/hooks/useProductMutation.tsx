import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product, productsActions } from '..';

const useProductMutation = () => {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productsActions.createProduct,
    // onSuccess:(data) =>{
    //   console.log('Producto creado:', data);
    // },
    // onSettled: () => {
    //   console.log('Mutacion finalizada');
    // }

    onMutate: (product) => {
      console.log('Mutando optimistic update: ');

      const optimisticProduct = { id: Math.random(), ...product };

      queryClient.setQueryData<Product[]>(
        ['product', { filterKey: product.category }],
        (old) => {
          if (old) {
            return [...old, optimisticProduct];
          } else {
            return [optimisticProduct];
          }
        }
      );

      return {
        optimisticProduct,
      }
    },

    onSuccess: (data, variables, context) => {
      console.log(data, variables, context)
      // queryClient.invalidateQueries({ queryKey: ['products', { 'filteryKey': data.category }] });

      queryClient.removeQueries({
        queryKey: ['products', context?.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ['product', { filterKey: data.category }],
        (old) => {
          if (old) {
            return old.map((cacheProduct) => {
              return cacheProduct.id === context?.optimisticProduct.id ? data : cacheProduct
            });;
          } else {
            return [data];
          }
        }
      );

      // queryClient.setQueryData(['product', { id: data.id }], data);
    }, 

    onError: (error, variables, context) => {

      queryClient.removeQueries({
        queryKey: ['products', context?.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ['product', { filterKey: variables.category }],
        (old) => {
          if (old) {
            return old.filter((cacheProduct) => {
              return cacheProduct.id !== context?.optimisticProduct.id
            });
          } else {
            return [];
          }
        }
      );

      return error;

    }
  })

  return mutation;
}

export default useProductMutation
