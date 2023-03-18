import React, { useState } from "react";

import Tabs from "components/atoms/Tabs";

export default {
  title: "Tabs",
  component: Tabs,
};

const Template = (args) => {
  return <Tabs {...args} />;
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  palette: "primary",
  tabs: [
    { label: "John Doe", value: "john-doe", selected: true },
    { label: "Alex Doe", value: "alex-doe" },
    { label: "Jane Doe", value: "jane-doe" },
  ],
  size: "sm",
  vertical: false,
};

export const Vertical = Template.bind({});
Vertical.args = {
  palette: "success",
  tabs: [
    { label: "John Doe", value: "john-doe", selected: true },
    { label: "Alex Doe", value: "alex-doe" },
    { label: "Jane Doe", value: "jane-doe" },
  ],
  size: "sm",
  vertical: true,
};
