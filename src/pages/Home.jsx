import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchBurgers } from '../redux/slices/burgersSlice';

import { SearchContext } from '../App';
import { sortingOptions } from '../components/Sort';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/Skeleton';
import BurgerCard from '../components/BurgerCard';
import Pagination from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { burgersList, requestStatus } = useSelector((state) => state.burgers);
  const navigate = useNavigate();
  const sortType = sort.sortProperty;

  const { searchValue } = useContext(SearchContext);
  const [sortOrder, setSortOrder] = useState('desc');

  const limitPerPage = 4;

  const onCategorySelection = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortingOptions.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
    }
  }, []);

  const getBurgers = async () => {
    //setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType;

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

    // await axios
    //   .get(
    //     `https://642be6fad7081590f92ca383.mockapi.io/items?page=${currentPage}&limit=${limitPerPage}&${category}&sortBy=${sortBy}&order=${sortOrder}`
    //   )
    //   .then((response) => {
    //     setBurgersList(response.data);
    //     setIsLoading(false);
    //   }).catch(error => {
    //   console.log(error);
    // });

    dispatch(fetchBurgers({ currentPage, limitPerPage, category, sortBy, sortOrder }));

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getBurgers();
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    const queryString = qs.stringify(
      {
        sortProperty: sortType,
        categoryId: categoryId,
        currentPage: currentPage,
      },
      { addQueryPrefix: true }
    );
    //console.log('queryString', queryString);

    navigate(queryString);
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
      {requestStatus === 'error' ? (
        <div className='content__error-info'>
          <h2>Не вдалося отримати список бургерів 😕</h2>
          <p>Cталася помилка при запиті до сервера. Спробуйте повторити запит.</p>
        </div>
      ) : (
        <div className='content__items'>
          {requestStatus === 'loading' ? skeletonsRender : burgersRedner}
        </div>
      )}

      <Pagination value={currentPage} onPageChange={onChangePage} pagesAmount={3} />
    </div>
  );
};

export default Home;
