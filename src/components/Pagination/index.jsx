//import { useState } from "react";

import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ onPageChange }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel=' >'
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel='< '
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
