import React, { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ChevronLeftDuo from "../assets/chevronLeftDuo.svg";
import ChevronLeft from "../assets/chevronLeft.svg";
import ChevronRight from "../assets/chevronRight.svg";
import ChevronRightDuo from "../assets/chevronRightDuo.svg";

import { queryPageParsing, queryStringify, makePaginateArray } from "./utils";

import { QueryPaginationProps } from "./QueryPagination.types";

import "./QueryPagination.styles.scss";

const QueryPagination: React.FC<QueryPaginationProps> = ({
  totalPages = 0,
  sliceSize = 5,
  styles = {
    wrapperBgColor: "#fff",
    selectedColor: {
      bgColor: "#0a84ff",
      fontColor: "#fff",
    },
  },
}: QueryPaginationProps) => {
  if (totalPages <= 0) {
    console.warn(
      "totalPages값이 이상합니다! 이 페이지가 페이지네이션이 필요한 페이지가 맞나요?"
    );
    return;
  }

  const { wrapperBgColor, selectedColor } = styles;

  const navigate = useNavigate();
  const location = useLocation();

  const queries: { page?: string } = queryPageParsing({ location });
  const { page } = queries;

  const { isLeftVectorDisabled, isRightVectorDisabled } = useMemo(
    () => ({
      isLeftVectorDisabled: totalPages === 0 || Number(page) === 0,
      isRightVectorDisabled:
        totalPages === 0 || Number(page) === totalPages - 1,
    }),
    [page, totalPages]
  );

  const paginateArray = useMemo(
    () => makePaginateArray({ sliceSize, page: Number(page), totalPages }),
    [sliceSize, page, totalPages]
  );

  const handlePageButtonClick = useCallback(
    (pageIndex: number) => {
      if (Number(page) !== pageIndex) {
        const entriesQuery = Object.entries<string | number>({
          ...queries,
          page: pageIndex,
        });
        navigate(`/?${queryStringify({ entriesQuery })}`);
      }
    },
    [page, queries]
  );

  const handlePagePrevClick = useCallback(() => {
    handlePageButtonClick(Number(page) - 1);
  }, [page]);

  const handlePageForwardClick = useCallback(() => {
    handlePageButtonClick(Number(page) + 1);
  }, [page]);

  const handlePageInitClick = useCallback(() => {
    handlePageButtonClick(0);
  }, []);

  const handlePageLastClick = useCallback(() => {
    const isLast = (Number(page) + 1) % sliceSize === 0;
    const basePage = Math.floor((Number(page) + 1) / sliceSize) * sliceSize;
    const remainPage = Number(page) + (sliceSize - 1 - Number(page));

    const nextPage = isLast ? Number(page) + 1 : basePage + remainPage;

    handlePageButtonClick(nextPage);
  }, [page]);

  const handleButtonStyles = useCallback((idx: number) => {
    const isSelected = Number(page) % sliceSize === idx;

    return {
      backgroundColor: isSelected ? selectedColor.bgColor : "inherit",
      color: isSelected ? selectedColor.fontColor : "inherit",
      cursor: isSelected ? "not-allowed" : "pointer",
    };
  }, []);

  return (
    <div
      className="QueryPagination-ButtonGroups"
      style={{ backgroundColor: wrapperBgColor, width: (sliceSize + 4) * 32 }}
    >
      <button
        className="QueryPagination-Button"
        onClick={handlePageInitClick}
        disabled={isLeftVectorDisabled}
      >
        <img src={ChevronLeftDuo} alt="minusVectorDuoIcon" />
      </button>
      <button
        className="QueryPagination-Button"
        onClick={handlePagePrevClick}
        disabled={isLeftVectorDisabled}
      >
        <img src={ChevronLeft} alt="minusVectorIcon" />
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
        disabled={isRightVectorDisabled}
      >
        <img src={ChevronRight} alt="plusVectorIcon" />
      </button>
      <button
        className="QueryPagination-Button"
        onClick={handlePageLastClick}
        disabled={isRightVectorDisabled}
      >
        <img src={ChevronRightDuo} alt="plusVectorDuoIcon" />
      </button>
    </div>
  );
};

export default QueryPagination;
