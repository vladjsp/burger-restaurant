import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import PageNotFound from "./pages/404";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

import "./scss/app.scss";

/* TODO
1. Список опцій сортування замінити на: "популярністю", "спочатку дорогі", "спочатку дешеві", "за алфіавітом"
2. Пагінація має рендерити правильну кількість сторінок, а не захаркоджено "3" (розібратись з роботою mockapi)
3. Пошук зараз шукає тільки на поточній сторінці. Тобто при пошуку серед Всіх товарів він покаже тільки ті, які є на поточній сторінці. Виправити.
*/

export const SearchContext = createContext("");

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className='wrapper'>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
