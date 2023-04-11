import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import PageNotFound from './pages/404';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Burger from './pages/Burger';

import './scss/app.scss';

/* TODO
1. Список опцій сортування замінити на: "популярністю", "спочатку дорогі", "спочатку дешеві", "за алфіавітом"
2. Пагінація має рендерити правильну кількість сторінок, а не захаркоджено "3" (розібратись з роботою mockapi)
3. Пошук зараз шукає тільки на поточній сторінці. Тобто при пошуку серед Всіх товарів він покаже тільки ті, які є на поточній сторінці.
*/

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/burger/:id' element={<Burger />}></Route>
          <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
