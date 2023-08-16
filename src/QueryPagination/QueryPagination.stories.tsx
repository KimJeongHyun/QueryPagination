import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import { withQuery } from "@storybook/addon-queryparams";

import QueryPagination from "./index";

const meta = {
  title: "Query Pagination",
  component: QueryPagination,
  decorators: [withRouter, withQuery],
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
    styles: {
      wrapperBgColor: "#fff",
      selectedColor: {
        bgColor: "#0A84FF",
        fontColor: "#fff",
      },
    },
  },
};

export const tenSlicePagination: Story = {
  args: {
    totalPages: 15,
    sliceSize: 10,
    styles: {
      wrapperBgColor: "#fff",
      selectedColor: {
        bgColor: "#0A84FF",
        fontColor: "#fff",
      },
    },
  },
};

export default meta;
