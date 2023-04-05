//import { useState } from "react";

import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

const Pagination = ({ onPageChange, pagesAmount }) => {
  //const [itemOffset, setItemOffset] = useState(0);

  // const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = items.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(items.length / itemsPerPage);

  // const handlePageClick = event => {
  //   const newOffset = (event.selected * itemsPerPage) % items.length;
  //   console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
  //   setItemOffset(newOffset);
  // };

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel=' >'
      onPageChange={event => onPageChange(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pagesAmount}
      previousLabel='< '
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
