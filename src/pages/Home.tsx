import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/filterSlice';
import { selectFilter } from '../redux/slices/filter/selectors';

import { fetchBurgers, selectBurgerData } from '../redux/slices/burger/burgersSlice';
import { TBurger } from '../redux/slices/burger/types';

import { sortingOptions } from '../components/Sort';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/Skeleton';
import BurgerCard from '../components/BurgerCard';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { burgersList, requestStatus } = useSelector(selectBurgerData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const sortType = sort.sortProperty;

  const [sortOrder, setSortOrder] = useState('desc');

  const limitPerPage = 4;

  const onCategorySelection = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (pageNum: number) => {
    dispatch(setCurrentPage(pageNum));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortingOptions.find((obj) => obj.sortProperty === params.sortProperty);
      // @ts-ignore
      dispatch(setFilters({ ...params, sort }));
    }
  }, []);

  const getBurgers = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType;
    // @ts-ignore
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

    navigate(queryString);
  }, [categoryId, sortType, sortOrder, currentPage]);

  const burgersRedner = burgersList
    .filter((obj: TBurger) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj: TBurger) => <BurgerCard key={obj.id} {...obj} />);
  const skeletonsRender = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onCategorySelection={onCategorySelection} />
        <Sort onSortOrderSelection={(value: string) => setSortOrder(value)} />
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

      <Pagination onPageChange={onChangePage} />
    </div>
  );
};

export default Home;
