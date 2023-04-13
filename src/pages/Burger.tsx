import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Burger: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [burgerInfo, setBurgerInfo] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  useEffect(() => {
    async function fetchBurger() {
      try {
        const res = await fetch(`https://642be6fad7081590f92ca383.mockapi.io/items/${id}`);
        const data = await res.json();
        setBurgerInfo(data);
      } catch (error) {
        alert('Виникла помилка при запиті до серверу. Спробуйте пізніше.');
        navigate('/');
      }
    }
    fetchBurger();
  }, []);

  if (!burgerInfo) {
    return <p>'Завантаження...'</p>;
  }

  return (
    <div className='container'>
      <img src={burgerInfo.imageUrl} alt='' />
      <h2>{burgerInfo.title}</h2>
      <h3>{burgerInfo.price} грн.</h3>
    </div>
  );
};

export default Burger;
