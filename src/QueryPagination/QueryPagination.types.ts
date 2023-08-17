export interface QueryPaginationProps {
  totalPages: number;
  sliceSize?: number;
  styles?: {
    wrapperBgColor: string;
    selectedColor: {
      bgColor: string;
      fontColor: string;
    };
  };
}

export type SearchType<T> = {
  [key in T as string]: string;
} & { page: number };

export type LocationType = {
  search: string;
};
