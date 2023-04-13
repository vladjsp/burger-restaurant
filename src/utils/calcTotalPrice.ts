import { TCartItem } from '../redux/slices/cart/types';

export const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => sum + obj.price * obj.amount, 0);
};
