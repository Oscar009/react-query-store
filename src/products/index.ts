
export { productsClient } from './api/productsAPI';

export { ProductCard } from './components/ProductCard';
export { ProductList } from './components/ProductList';

export { default as useProducts } from './hooks/useProducts';
export { default as useProduct } from './hooks/useProduct';
export { default as usePrefetchProduct } from './hooks/usePrefetchProduct';

export type { Product } from './interfaces/product';

export { StoreLayout } from './layout/StoreLayout';

export { CompleteListPage } from './pages/CompleteListPage';
export { MensPage } from './pages/MensPage';
export { NewProduct } from './pages/NewProduct';
export { WomensPage } from './pages/WomensPage';
export { ProductById } from './pages/ProductById';

export * as productsActions from './services/actions';