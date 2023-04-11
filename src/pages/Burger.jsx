import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Burger = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [burgerInfo, setBurgerInfo] = useState({});

  useEffect(() => {
    async function fetchBurger(id) {
      try {
        const res = await fetch(`https://642be6fad7081590f92ca383.mockapi.io/items/${id}`);
        const data = await res.json();
        setBurgerInfo(data);
      } catch (error) {
        alert('Виникла помилка при запиті до серверу. Спробуйте пізніше.');
        navigate('/');
      }
    }
    fetchBurger(id);
  }, []);

  if (burgerInfo.length === 0) {
    return 'Завантаження...';
  }

  return (
    <div className='container'>
      <img src={burgerInfo.imageUrl} alt='' />
      <h2 style={{ 'margin-bottom': '3rem' }}>{burgerInfo.title}</h2>
      <h3>{burgerInfo.price} грн.</h3>
    </div>
  );
};

export default Burger;
