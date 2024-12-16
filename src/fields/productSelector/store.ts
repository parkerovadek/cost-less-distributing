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

// #region Vendor Store
interface VendorStore {
  vendor: string;
  setVendor: (vendor: string) => void;
}

export const useVendorStore = create<VendorStore>((set) => ({
  vendor: '',
  setVendor: (vendor: string) => set(() => ({ vendor })),
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
