import React from "react";

import { QueryPaginationProps } from "./QueryPagination.types";

const QueryPagination: React.FC<QueryPaginationProps> = ({ totalPages }) => {
  return <>{totalPages}</>;
};

export default QueryPagination;
