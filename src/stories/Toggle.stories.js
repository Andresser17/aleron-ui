import React, { useState } from "react";

import Toggle from "components/form/Toggle";

export default {
  title: "Toggle",
  component: Toggle,
};

const Template = (args) => {
  return <Toggle {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  palette: "primary",
  name: "chocolate",
  value: "chocolate",
  label: "You want chocolate?",
  subtitle: "Is not important",
  checked: false,
  readOnly: false,
  disabled: false,
};

export const PrimaryWhite = Template.bind({});
PrimaryWhite.args = {
  palette: "primary-white",
  name: "chocolate",
  value: "chocolate",
  label: "You want chocolate?",
  subtitle: "Is not important",
  checked: false,
  readOnly: false,
  disabled: false,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  palette: "primary-dark",
  name: "chocolate",
  value: "chocolate",
  label: "You want chocolate?",
  subtitle: "Is not important",
  checked: false,
  readOnly: false,
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  palette: "secondary",
  name: "chocolate",
  value: "chocolate",
  label: "You want chocolate?",
  subtitle: "Is not important",
  checked: false,
  readOnly: false,
  disabled: false,
};

export const Success = Template.bind({});
Success.args = {
  palette: "success",
  name: "chocolate",
  value: "chocolate",
  label: "You want chocolate?",
  subtitle: "Is not important",
  checked: false,
  readOnly: false,
  disabled: false,
};

export const Danger = Template.bind({});
Danger.args = {
  palette: "danger",
  name: "chocolate",
  value: "chocolate",
  label: "You want chocolate?",
  subtitle: "Is not important",
  checked: false,
  readOnly: false,
  disabled: false,
};

export const Warning = Template.bind({});
Warning.args = {
  palette: "warning",
  name: "chocolate",
  value: "chocolate",
  label: "You want chocolate?",
  subtitle: "Is not important",
  checked: false,
  readOnly: false,
  disabled: false,
};

export const Info = Template.bind({});
Info.args = {
  palette: "info",
  name: "chocolate",
  value: "chocolate",
  label: "You want chocolate?",
  subtitle: "Is not important",
  checked: false,
  readOnly: false,
  disabled: false,
};

export const Light = Template.bind({});
Light.args = {
  palette: "light",
  name: "chocolate",
  value: "chocolate",
  label: "You want chocolate?",
  subtitle: "Is not important",
  checked: false,
  readOnly: false,
  disabled: false,
};

export const Dark = Template.bind({});
Dark.args = {
  palette: "dark",
  name: "chocolate",
  value: "chocolate",
  label: "You want chocolate?",
  subtitle: "Is not important",
  checked: false,
  readOnly: false,
  disabled: false,
};

export const Flat = Template.bind({});
Flat.args = {
  palette: "flat",
  name: "chocolate",
  value: "chocolate",
  label: "You want chocolate?",
  subtitle: "Is not important",
  checked: false,
  readOnly: false,
  disabled: false,
};
