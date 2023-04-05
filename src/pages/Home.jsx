import { useState, useEffect, useContext } from "react";

import { SearchContext } from "../App";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import BurgerCard from "../components/BurgerCard";
import Pagination from "../components/Pagination";

const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);
  const [burgersList, setBurgersList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: "популярністю", sortProperty: "rating" });
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const limitPerPage = 4;

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sortProperty;
    //const search = searchValue ? `search=${searchValue}` : ""; for backend search

    fetch(
      `https://642be6fad7081590f92ca383.mockapi.io/items?page=${currentPage}&limit=${limitPerPage}&${category}&sortBy=${sortBy}&order=${sortOrder}`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log(data);
        setBurgersList(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        alert("Сталася помилка при запиті до сервер.");
      });
    window.scrollTo(0, 0);
    // console.log("Category Id = ", categoryId);
    // console.log("Sorting Id = ", sortType);
  }, [categoryId, sortType, sortOrder, currentPage]);

  const burgersRedner = burgersList
    .filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj, index) => <BurgerCard key={obj.id} {...obj} />);
  const skeletonsRender = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onCategorySelection={id => setCategoryId(id)} />
        <Sort
          value={sortType}
          onSortSelection={obj => setSortType(obj)}
          onSortOrderSelection={value => setSortOrder(value)}
        />
      </div>
      <h2 className='content__title'>Всі бургери</h2>
      <div className='content__items'>{isLoading ? skeletonsRender : burgersRedner}</div>
      <Pagination onPageChange={num => setCurrentPage(num)} pagesAmount={3} />
    </div>
  );
};

export default Home;
