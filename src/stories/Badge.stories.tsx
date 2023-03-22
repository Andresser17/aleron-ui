import React from "react";
import Badge from "@/components/atoms/Badge";

export default {
  title: "Badge",
  component: Badge,
};

const Template = (args) => <Badge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  theme: "primary",
  text: "Badge",
};
