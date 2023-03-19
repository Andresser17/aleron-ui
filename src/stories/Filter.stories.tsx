import React, { useState } from "react";
import Filter from "@/components/atoms/Filter";

export default {
  title: "Filter",
  component: Filter,
};

const Template = (args) => {
  return <Filter {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  options: ["Cat", "Dog", "Bird"],
  theme: "primary",
};
