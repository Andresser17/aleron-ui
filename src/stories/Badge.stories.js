import React from "react";

import Badge from "components/Badge";

export default {
  title: "Badge",
  component: Badge,
};

const Template = (args) => <Badge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  palette: "primary",
  text: "Badge",
  rounded: false,
  border: false,
};

export const PrimaryWhite = Template.bind({});
PrimaryWhite.args = {
  palette: "primary-white",
  text: "Badge",
  rounded: false,
  border: false,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  palette: "primary-dark",
  text: "Badge",
  rounded: false,
  border: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  palette: "secondary",
  text: "Badge",
  rounded: false,
  border: false,
};

export const Success = Template.bind({});
Success.args = {
  palette: "success",
  text: "Badge",
  rounded: false,
  border: false,
};

export const Danger = Template.bind({});
Danger.args = {
  palette: "danger",
  text: "Badge",
  rounded: false,
  border: false,
};

export const Warning = Template.bind({});
Warning.args = {
  palette: "warning",
  text: "Badge",
  rounded: false,
  border: false,
};

export const Info = Template.bind({});
Info.args = {
  palette: "info",
  text: "Badge",
  rounded: false,
  border: false,
};

export const Light = Template.bind({});
Light.args = {
  palette: "light",
  text: "Badge",
  rounded: false,
  border: false,
};

export const Dark = Template.bind({});
Dark.args = {
  palette: "dark",
  text: "Badge",
  rounded: false,
  border: false,
};

export const Flat = Template.bind({});
Flat.args = {
  palette: "flat",
  text: "Badge",
  rounded: false,
  border: false,
};
