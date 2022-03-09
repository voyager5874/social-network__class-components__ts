import React from 'react';

import { ComponentReturnType } from 'types';

export type PaginatorPropsType = {
  totalNumberOfPages: number;
  currentPage: number;
  numberOfButtons: number;
  getPage: (page: number) => void;
};

export const Paginator = ({
  currentPage,
  totalNumberOfPages,
  numberOfButtons,
  getPage,
}: PaginatorPropsType): ComponentReturnType => {
  const pageSelectionButtonSet = [];

  if (currentPage >= totalNumberOfPages - numberOfButtons && totalNumberOfPages !== 0) {
    for (let i = totalNumberOfPages - numberOfButtons; i <= totalNumberOfPages; i += 1) {
      pageSelectionButtonSet.push(i);
    }
  } else if (currentPage <= totalNumberOfPages - numberOfButtons * 2) {
    for (let i = currentPage; i <= currentPage + numberOfButtons; i += 1) {
      pageSelectionButtonSet.push(i);
    }
  }
  const leapValue = 10;
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
        <button key={pageNumber} type="button" onClick={() => getPage(pageNumber)}>
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
