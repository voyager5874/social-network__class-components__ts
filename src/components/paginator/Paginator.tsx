import styles from './Paginator.module.css';

import { ComponentReturnType } from 'types';

export type PaginatorPropsType = {
  totalNumberOfPages: number;
  currentPage: number;
  numberOfButtons: number;
  getPage: (page: number) => void;
  leapValue: number;
};

export const Paginator = ({
  currentPage,
  totalNumberOfPages,
  numberOfButtons,
  getPage,
  leapValue,
}: PaginatorPropsType): ComponentReturnType => {
  const pageSelectionButtonSet = [];

  if (totalNumberOfPages !== 0 && currentPage >= totalNumberOfPages - numberOfButtons) {
    for (let i = totalNumberOfPages - numberOfButtons; i <= totalNumberOfPages; i += 1) {
      pageSelectionButtonSet.push(i);
    }
  } else if (currentPage + numberOfButtons <= totalNumberOfPages) {
    for (let i = currentPage; i <= currentPage + numberOfButtons; i += 1) {
      pageSelectionButtonSet.push(i);
    }
  }
  // const leapValue = 10; // move it to props!
  return (
    <div>
      <button
        type="button"
        disabled={currentPage < leapValue}
        onClick={() => getPage(currentPage - leapValue)}
      >
        prev
      </button>
      <button type="button" onClick={() => getPage(1)}>
        go to 1
      </button>
      {pageSelectionButtonSet.map(pageNumber => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? styles.current : styles.paginatorButton}
          type="button"
          onClick={() => getPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button type="button" onClick={() => getPage(totalNumberOfPages)}>
        got to last
      </button>
      <button
        type="button"
        disabled={currentPage > totalNumberOfPages - leapValue}
        onClick={() => getPage(currentPage + leapValue)}
      >
        next
      </button>
    </div>
  );
};
