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
