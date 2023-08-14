export interface QueryPaginationProps {
  totalPages: number;
  sliceSize?: number;
  styles: {
    WrapperBgColor: string;
    selectedColor: {
      bgColor: string;
      fontColor: string;
    };
  };
}

export type SearchType<T> = {
  [K in keyof T as string]: string;
};
