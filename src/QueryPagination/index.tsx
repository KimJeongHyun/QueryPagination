import React, { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { queryPageParsing, queryStringify, makePaginateArray } from "./utils";

import { QueryPaginationProps } from "./QueryPagination.types";

import "./QueryPagination.styles.scss";

const QueryPagination: React.FC<QueryPaginationProps> = <
  T extends { page: string }
>({
  totalPages,
  sliceSize = 5,
  styles,
}: QueryPaginationProps) => {
  const { WrapperBgColor, selectedColor } = styles;

  const navigate = useNavigate();
  const location = useLocation();

  const queries = queryPageParsing<T>({ location });
  const { page } = queries;

  const paginateArray = makePaginateArray({
    sliceSize,
    page: Number(page),
    totalPages,
  });

  const handlePageButtonClick = useCallback(
    (pageIndex: number) => {
      if (Number(page) !== pageIndex) {
        const entriesQuery = Object.entries<string>({
          ...queries,
          page: pageIndex,
        });
        navigate(`/?${queryStringify({ entriesQuery })}`);
      }
    },
    [page]
  );

  const handlePagePrevClick = useCallback(() => {
    handlePageButtonClick(Number(page) - 1);
  }, [page]);

  const handlePageForwardClick = useCallback(() => {
    handlePageButtonClick(Number(page) + 1);
  }, [page]);

  const handlePageInitClick = useCallback(() => {
    handlePageButtonClick(0);
  }, [page]);

  const handlePageLastClick = useCallback(() => {
    const isLast = ((Number(page) + 1) / sliceSize) % 1 === 0;
    const basePage = Math.floor((Number(page) + 1) / sliceSize) * sliceSize;

    const nextPage = isLast
      ? Number(page) + 1
      : basePage + Number(page) + (sliceSize - 1 - Number(page));

    handlePageButtonClick(nextPage);
  }, [page]);

  const handleButtonStyles = (idx: number) => {
    const isSelected = Number(page) % sliceSize === idx;

    return {
      backgroundColor: isSelected ? selectedColor.bgColor : "inherit",
      color: isSelected ? selectedColor.fontColor : "inherit",
      cursor: isSelected ? "not-allowed" : "pointer",
    };
  };

  return (
    <div
      className="QueryPagination-ButtonGroups"
      style={{ backgroundColor: WrapperBgColor, width: (sliceSize + 4) * 32 }}
    >
      <button
        className="QueryPagination-Button"
        onClick={handlePageInitClick}
        disabled={Number(page) === 0}
      >
        {"<<"}
      </button>
      <button
        className="QueryPagination-Button"
        onClick={handlePagePrevClick}
        disabled={Number(page) === 0}
      >
        {"<"}
      </button>
      {paginateArray.map((i, idx) => (
        <button
          className="QueryPagination-Button"
          key={idx}
          onClick={() => handlePageButtonClick(idx)}
          style={handleButtonStyles(idx)}
        >
          {i}
        </button>
      ))}
      <button
        className="QueryPagination-Button"
        onClick={handlePageForwardClick}
        disabled={Number(page) === totalPages - 1}
      >
        {">"}
      </button>
      <button
        className="QueryPagination-Button"
        onClick={handlePageLastClick}
        disabled={Number(page) === totalPages - 1}
      >
        {">>"}
      </button>
    </div>
  );
};

export default QueryPagination;
