import { productsClient } from "../api/productsAPI";
import { type Product } from "../interfaces/product";

interface GetProductsOptions {
  filterkey?: string;
}

interface GetProductOptions {
  id: number;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async ({ filterkey }: GetProductsOptions): Promise<Product[]> => {

  await sleep(2000);

  const filterUrl = (filterkey) ? `category=${filterkey}` : "";

  const { data } = await productsClient.get<Product[]>(`/products?${filterUrl}`);

  return data;
}

export const getProduct = async ({ id }: GetProductOptions): Promise<Product> => {

  await sleep(2000);

  const { data } = await productsClient.get<Product>(`/products/${id}`);

  return data;
}

type ProductLike = Omit<Product, 'id'>;

export const createProduct = async (product: ProductLike) => {
  await sleep(5000);

  const { data } = await productsClient.post<Product>(`/products`, product);
  return data;
}