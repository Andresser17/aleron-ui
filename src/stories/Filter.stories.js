import React, { useState } from "react";

import Filter from "components/Filter";

export default {
  title: "Filter",
  component: Filter,
};

const Template = (args) => {
  const options = ["Cat", "Dog", "Bird"];

  return <Filter options={options} {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  palette: "primary",
};

export const PrimaryWhite = Template.bind({});
PrimaryWhite.args = {
  palette: "primary-white",
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  palette: "primary-dark",
};

export const Secondary = Template.bind({});
Secondary.args = {
  palette: "secondary",
};

export const Success = Template.bind({});
Success.args = {
  palette: "success",
};

export const Danger = Template.bind({});
Danger.args = {
  palette: "danger",
};

export const Warning = Template.bind({});
Warning.args = {
  palette: "warning",
};

export const Info = Template.bind({});
Info.args = {
  palette: "info",
};

export const Light = Template.bind({});
Light.args = {
  palette: "light",
};

export const Dark = Template.bind({});
Dark.args = {
  palette: "dark",
};

export const Flat = Template.bind({});
Flat.args = {
  palette: "flat",
};
