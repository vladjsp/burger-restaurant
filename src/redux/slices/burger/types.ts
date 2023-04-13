export type TBurger = {
  id: number;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  imageUrl: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IBurgerSliceState {
  burgersList: TBurger[];
  requestStatus: Status;
}
