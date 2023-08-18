import { LocationType, SearchType } from "./QueryPagination.types";

const queryParse = ({ location }: { location: LocationType }) => {
  const searchSplitQuery = location.search
    ? location.search.split("?")
    : window.location.search.split("?");

  if (searchSplitQuery.length) {
    const andSplitQueries =
      searchSplitQuery[searchSplitQuery.length === 1 ? 0 : 1].split("&");

    return andSplitQueries.reduce((acc, cur) => {
      const equalSplitQuery = cur.split("=");

      const [key, value] = equalSplitQuery;

      const newAcc = {
        ...acc,
        [key]:
          key === "page"
            ? Number(value)
            : Object.keys(acc).includes(key)
            ? [acc[key], value].join(",")
            : value,
      };

      return newAcc;
    }, {} as SearchType<any>);
  }

  return {} as SearchType<any>;
};

const queryStringify = ({
  entriesQuery,
}: {
  entriesQuery: (string | number)[][];
}) =>
  entriesQuery
    .reduce((acc, cur) => {
      const [key, value] = [cur[0], cur[1]];

      const newAcc = [...acc];

      if (typeof value === "string") {
        const valueCommaSplit = value.split(",");

        valueCommaSplit.forEach((i) => newAcc.push(`${key}=${i}`));
      } else {
        newAcc.push(`${key}=${value}`);
      }

      return newAcc;
    }, [])
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
