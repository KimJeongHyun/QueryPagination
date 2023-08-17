import { LocationType, SearchType } from "./QueryPagination.types";

const queryParse = () => {
  const searchSplitQuery = window.location.search.split("?");

  if (searchSplitQuery.length) {
    const andSplitQueries =
      searchSplitQuery[searchSplitQuery.length === 1 ? 0 : 1].split("&");

    return andSplitQueries.reduce((acc, cur) => {
      const equalSplitQuery = cur.split("=");

      const [key, value] = equalSplitQuery;

      const newAcc = {
        ...acc,
        [key]: key === "page" ? Number(value) : value,
      };

      return newAcc;
    }, {}) as SearchType<any>;
  }

  return {} as SearchType<any>;
};

const queryStringify = ({
  entriesQuery,
}: {
  entriesQuery: (string | number)[][];
}) =>
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

export { queryParse, queryStringify, makePaginateArray };
