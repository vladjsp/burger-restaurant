import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem } from '../redux/slices/cartSlice';

const BurgerCard = ({ id, title, price, sizes, types, imageUrl }) => {
  const dispatch = useDispatch();
  const itemAmount = useSelector((state) => state.cart.items.find((obj) => obj.id === id));
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const typesNames = ['звичайний', 'подвійний'];

  const addedAmount = itemAmount ? itemAmount.amount : 0;

  const handleBurgerAdd = (obj) => {
    const selectedBurger = {
      id,
      title,
      price,
      imageUrl,
      type: typesNames[activeType],
      size: activeSize,
    };

    dispatch(addItem(selectedBurger));
  };

  return (
    <div className='burger-card'>
      <Link to={`/burger/${id}`}>
        <img className='burger-card__image' src={imageUrl} alt='burger' />
        <h4 className='burger-card__title'>{title}</h4>
      </Link>
      <div className='burger-card__selector'>
        <ul>
          {types.map((type, index) => (
            <li
              key={index}
              className={activeType === type ? 'active' : ''}
              onClick={() => setActiveType(type)}>
              {typesNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              className={activeSize === index ? 'active' : ''}
              onClick={() => setActiveSize(index)}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className='burger-card__bottom'>
        <div className='burger-card__price'>від {price} ₴</div>
        <button onClick={handleBurgerAdd} className='button button--outline button--add'>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span> Додати</span>
          {addedAmount > 0 && <i>{addedAmount}</i>}
        </button>
      </div>
    </div>
  );
};

export default BurgerCard;
