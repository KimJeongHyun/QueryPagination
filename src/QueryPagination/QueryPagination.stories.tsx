import type { Meta, StoryObj } from "@storybook/react";

import QueryPagination from "./index";

const meta = {
  title: "쿼리 페이지네이션",
  component: QueryPagination,
} satisfies Meta<typeof QueryPagination>;

type Story = StoryObj<typeof meta>;

export const defaultQueryPagination: Story = {
  args: {
    totalPages: 5,
  },
};

export default meta;
