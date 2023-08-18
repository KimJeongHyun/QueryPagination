import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { withQuery } from "@storybook/addon-queryparams";

import QueryPagination from "./index";
import { MemoryRouter, Route, withRouter } from "react-router-dom";

const Default = (storyProps) => {
  return (
    <MemoryRouter>
      <Route
        component={(componentProps) => (
          <WithRouterQP {...componentProps} {...storyProps} />
        )}
      />
    </MemoryRouter>
  );
};

const WithRouterQP = withRouter(QueryPagination);

const meta = {
  title: "Query Pagination",
  component: Default,
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
