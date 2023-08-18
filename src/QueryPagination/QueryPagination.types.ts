export interface QueryPaginationProps {
  history: any;
  totalPages?: number;
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
  [key in T as string]: string | number;
} & { page: number };

export type LocationType = {
  search: string;
};
