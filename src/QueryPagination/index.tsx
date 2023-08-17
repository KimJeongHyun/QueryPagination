import React, { useCallback, useMemo, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ChevronLeftDuo from "../assets/chevronLeftDuo.svg";
import ChevronLeft from "../assets/chevronLeft.svg";
import ChevronRight from "../assets/chevronRight.svg";
import ChevronRightDuo from "../assets/chevronRightDuo.svg";

import { queryParse, queryStringify, makePaginateArray } from "./utils";

import { QueryPaginationProps } from "./QueryPagination.types";

import "./QueryPagination.styles.scss";

/**
 * @description Pagination Component, controlled by url search params.
 * @param totalPages Total page numbers per slice size.
 * @param sliceSize page number slicing number
 * @param styles.wrapperBgColor Pagination Container bgColor
 * @param styles.selectedColor selected btn's color. { bgColor, fontColor }
 * @returns URL Query Pagination
 * @returns undefined, if totalPages is under 0 or page query is undefined.
 */
const QueryPagination = ({
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
    console.warn("Props 'totalPages' must be higher than 0.");
    return;
  }
  const navigate = useNavigate();
  const location = useLocation();

  const queries = queryParse({ location });

  const { page } = queries;

  if (page === undefined) {
    console.warn("Query 'page' must be included in URL");
    return;
  }

  const { wrapperBgColor, selectedColor } = styles;

  const basePivots = useMemo(
    () => Math.floor(page / sliceSize) * sliceSize,
    [page]
  );

  const { isLeftVectorDisabled, isRightVectorDisabled } = useMemo(
    () => ({
      isLeftVectorDisabled: totalPages === 0 || page === 0,
      isRightVectorDisabled: totalPages === 0 || page === totalPages - 1,
    }),
    [page, totalPages]
  );

  const paginateArray = useMemo(
    () => makePaginateArray({ sliceSize, page, totalPages }),
    [sliceSize, page, totalPages]
  );

  const handlePageButtonClick = useCallback(
    (pageIndex: number) => {
      if (page !== pageIndex) {
        const entriesQuery = Object.entries<string | number>({
          ...queries,
          page: pageIndex,
        });
        navigate(`/?${queryStringify({ entriesQuery })}`);
      }
    },
    [page, queries]
  );

  const handlePagePrevClick = useCallback(
    () => handlePageButtonClick(page - 1),
    [page]
  );

  const handlePageForwardClick = useCallback(
    () => handlePageButtonClick(page + 1),
    [page]
  );

  const handlePageInitClick = useCallback(
    () => handlePageButtonClick(basePivots === page ? page - 1 : basePivots),
    [page]
  );

  const handlePageLastClick = useCallback(() => {
    const isLastPivot = (page + 1) % sliceSize === 0;

    const remainPivots = basePivots + sliceSize - 1 - page;

    const isLastPage =
      Math.floor(totalPages / sliceSize) === basePivots / sliceSize;

    const nextPage = isLastPivot
      ? page + 1
      : isLastPage
      ? totalPages - 1
      : page + remainPivots;

    handlePageButtonClick(nextPage);
  }, [page]);

  const handleButtonStyles = useCallback(
    (idx: number) => {
      const isSelected = page % sliceSize === idx;

      return {
        backgroundColor: isSelected ? selectedColor.bgColor : "inherit",
        color: isSelected ? selectedColor.fontColor : "inherit",
        cursor: isSelected ? "not-allowed" : "pointer",
      };
    },
    [page, sliceSize]
  );

  return (
    <div
      className="QueryPagination-ButtonGroups"
      style={{ background: wrapperBgColor }}
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
          onClick={() => handlePageButtonClick(basePivots + idx)}
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

export default memo(QueryPagination);
