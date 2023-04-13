import { TCartItem } from '../redux/slices/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const dataInLS = localStorage.getItem('cart');
  const items = dataInLS ? (JSON.parse(dataInLS) as TCartItem[]) : [];
  const totalPrice = calcTotalPrice(items);
  if (items) {
    return {
      items,
      totalPrice,
    };
  } else {
    return {
      items: [],
      totalPrice: 0,
    };
  }
};
