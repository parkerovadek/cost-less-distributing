export type Facet = {
  [key: string]: number;
};

export type Result = {
  objectID: string;
  vendor: string;
  title: string;
};

export type ProductResults = {
  facets: {
    [key: string]: Facet;
  };
  products: Result[];
};

export type ProductSearchQuery = {
  query: string;
  facets: string[];
  facetFilters: string[];
};
