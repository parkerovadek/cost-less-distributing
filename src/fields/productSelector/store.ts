import { create } from 'zustand';

interface CompanyStore {
  company: string;
  setCompany: (company: string) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  company: '',
  setCompany: (company: string) => set((_) => ({ company: company })),
}));
