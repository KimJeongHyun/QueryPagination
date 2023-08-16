import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import { withQuery } from "@storybook/addon-queryparams";

import QueryPagination from "./index";

const meta = {
  title: "쿼리 페이지네이션",
  component: QueryPagination,
  decorators: [withRouter, withQuery],
  parameters: {
    query: {
      page: "0",
    },
  },
} satisfies Meta<typeof QueryPagination>;

type Story = StoryObj<typeof meta>;

export const defaultQueryPagination: Story = {
  args: {
    totalPages: 0,
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
