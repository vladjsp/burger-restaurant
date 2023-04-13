export type TCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  amount: number;
};

export interface ICartSliceState {
  totalPrice: number;
  items: TCartItem[];
}
