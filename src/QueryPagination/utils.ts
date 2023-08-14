import { Location } from "react-router-dom";

import { SearchType } from "./QueryPagination.types";

const queryPageParsing = <T extends { page: string }>({
  location,
}: {
  location: Location;
}) => {
  const searchSplitQuery = location.search
    ? location.search.split("?")
    : window.location.search.split("?");

  if (searchSplitQuery.length) {
    const andSplitQueries =
      searchSplitQuery[searchSplitQuery.length === 1 ? 0 : 1].split("&");

    return andSplitQueries.reduce((acc, cur) => {
      const equalSplitQuery = cur.split("=");

      const newAcc = {
        ...acc,
        [equalSplitQuery[0]]: equalSplitQuery[1],
      };

      return newAcc;
    }, {} as SearchType<T>);
  }

  return {} as SearchType<T>;
};

const queryStringify = ({ entriesQuery }: { entriesQuery: string[][] }) =>
  entriesQuery
    .reduce((acc, cur) => [...acc, `${cur[0]}=${cur[1]}`], [])
    .join("&");

const makePaginateArray = ({
  sliceSize,
  page,
  totalPages,
}: {
  sliceSize: number;
  page: number;
  totalPages: number;
}) => {
  const pageNumber = Math.floor(page / sliceSize) + 1;
  const newArray = new Array(totalPages).fill(1).map((_, index) => index + 1);

  return newArray.slice((pageNumber - 1) * sliceSize, pageNumber * sliceSize);
};

export { queryPageParsing, queryStringify, makePaginateArray };
