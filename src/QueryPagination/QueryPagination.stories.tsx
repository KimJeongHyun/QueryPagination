import type { Meta, StoryObj } from "@storybook/react";
import { withQuery } from "@storybook/addon-queryparams";

import QueryPagination from "./index";

const meta = {
  title: "Query Pagination",
  component: QueryPagination,
  decorators: [withQuery],
  parameters: {
    query: {
      page: "0",
    },
  },
} satisfies Meta<typeof QueryPagination>;

type Story = StoryObj<typeof meta>;

export const defaultPagination: Story = {
  args: {
    totalPages: 5,
  },
};

export const tenSlicePagination: Story = {
  args: {
    totalPages: 15,
    sliceSize: 10,
    styles: {
      wrapperBgColor: "#eee",
      selectedColor: {
        bgColor: "#5179a4",
        fontColor: "#fff",
      },
    },
  },
};

export default meta;
