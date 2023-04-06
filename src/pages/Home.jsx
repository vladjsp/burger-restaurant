import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/Skeleton';
import BurgerCard from '../components/BurgerCard';
import Pagination from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter); //в store є filter, який імпортований з filterSlice. У filterSlice всередині при створенні за допомогою createSlice є inintialState і от з нього ми і дістали цей categoryId
  const sortType = sort.sortProperty;

  const { searchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);
  const [burgersList, setBurgersList] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  //const [currentPage, setCurrentPage] = useState(1);

  const limitPerPage = 4;

  const onCategorySelection = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType;
    //const search = searchValue ? `search=${searchValue}` : ""; for backend search

    /* fetch(
    //   `https://642be6fad7081590f92ca383.mockapi.io/items?page=${currentPage}&limit=${limitPerPage}&${category}&sortBy=${sortBy}&order=${sortOrder}`
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     //console.log(data);
    //     setBurgersList(data);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     alert('Сталася помилка при запиті до серверa.');
    //   });*/

    axios
      .get(
        `https://642be6fad7081590f92ca383.mockapi.io/items?page=${currentPage}&limit=${limitPerPage}&${category}&sortBy=${sortBy}&order=${sortOrder}`
      )
      .then((response) => {
        setBurgersList(response.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortOrder, currentPage]);

  const burgersRedner = burgersList
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj, index) => <BurgerCard key={obj.id} {...obj} />);
  const skeletonsRender = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onCategorySelection={onCategorySelection} />
        <Sort onSortOrderSelection={(value) => setSortOrder(value)} />
      </div>
      <h2 className='content__title'>Всі бургери</h2>
      <div className='content__items'>{isLoading ? skeletonsRender : burgersRedner}</div>
      <Pagination value={currentPage} onPageChange={onChangePage} pagesAmount={3} />
    </div>
  );
};

export default Home;
