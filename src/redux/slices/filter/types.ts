export type TSort = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
};

export interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: TSort;
}
