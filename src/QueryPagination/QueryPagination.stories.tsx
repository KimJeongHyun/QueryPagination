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
    totalPages: 10,
    styles: {
      WrapperBgColor: "#fff",
      selectedColor: {
        bgColor: "#43425c",
        fontColor: "#fff",
      },
    },
  },
};

export default meta;
