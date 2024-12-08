import { create } from 'zustand';

// #region Collection Store
interface CollectionStore {
  collection: string;
  setCollection: (collection: string) => void;
}

export const useCollectionStore = create<CollectionStore>((set) => ({
  collection: '',
  setCollection: (collection: string) => set(() => ({ collection })),
}));

// #endregion

// #region Company Store
interface CompanyStore {
  company: string;
  setCompany: (company: string) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  company: '',
  setCompany: (company: string) => set(() => ({ company })),
}));

// #endregion

// #region Product Store
interface ProductStore {
  product: string;
  setProduct: (product: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  product: '',
  setProduct: (product: string) => set(() => ({ product })),
}));

// #endregion
