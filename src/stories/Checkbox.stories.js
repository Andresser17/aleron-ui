import React from "react";
import Checkbox from "components/form/Checkbox";

export default {
  title: "Checkbox",
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  palette: "primary",
  label: "Checkbox",
  name: "checkbox",
  value: "checkbox",
  disabled: false,
  checked: true,
  readOnly: false,
  error: false,
  indeterminate: false,
  onChange: (e) => console.log(e.target.value),
};

export const PrimaryWhite = Template.bind({});
PrimaryWhite.args = {
  palette: "primary-white",
  label: "Checkbox",
  name: "checkbox",
  value: "checkbox",
  disabled: false,
  checked: true,
  readOnly: false,
  error: false,
  indeterminate: false,
  onChange: (e) => console.log(e.target.value),
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  palette: "primary-dark",
  label: "Checkbox",
  name: "checkbox",
  value: "checkbox",
  disabled: false,
  checked: true,
  readOnly: false,
  error: false,
  indeterminate: false,
  onChange: (e) => console.log(e.target.value),
};

export const Secondary = Template.bind({});
Secondary.args = {
  palette: "secondary",
  label: "Checkbox",
  name: "checkbox",
  value: "checkbox",
  disabled: false,
  checked: true,
  readOnly: false,
  error: false,
  indeterminate: false,
  onChange: (e) => console.log(e.target.value),
};

export const Success = Template.bind({});
Success.args = {
  palette: "success",
  label: "Checkbox",
  name: "checkbox",
  value: "checkbox",
  disabled: false,
  checked: true,
  readOnly: false,
  error: false,
  indeterminate: false,
  onChange: (e) => console.log(e.target.value),
};

export const Danger = Template.bind({});
Danger.args = {
  palette: "danger",
  label: "Checkbox",
  name: "checkbox",
  value: "checkbox",
  disabled: false,
  checked: true,
  readOnly: false,
  error: false,
  indeterminate: false,
  onChange: (e) => console.log(e.target.value),
};

export const Warning = Template.bind({});
Warning.args = {
  palette: "warning",
  label: "Checkbox",
  name: "checkbox",
  value: "checkbox",
  disabled: false,
  checked: true,
  readOnly: false,
  error: false,
  indeterminate: false,
  onChange: (e) => console.log(e.target.value),
};

export const Info = Template.bind({});
Info.args = {
  palette: "info",
  label: "Checkbox",
  name: "checkbox",
  value: "checkbox",
  disabled: false,
  checked: true,
  readOnly: false,
  error: false,
  indeterminate: false,
  onChange: (e) => console.log(e.target.value),
};

export const Light = Template.bind({});
Light.args = {
  palette: "light",
  label: "Checkbox",
  name: "checkbox",
  value: "checkbox",
  disabled: false,
  checked: true,
  readOnly: false,
  error: false,
  indeterminate: false,
  onChange: (e) => console.log(e.target.value),
};

export const Dark = Template.bind({});
Dark.args = {
  palette: "dark",
  label: "Checkbox",
  name: "checkbox",
  value: "checkbox",
  disabled: false,
  checked: true,
  readOnly: false,
  error: false,
  indeterminate: false,
  onChange: (e) => console.log(e.target.value),
};

export const Flat = Template.bind({});
Flat.args = {
  palette: "flat",
  label: "Checkbox",
  name: "checkbox",
  value: "checkbox",
  disabled: false,
  checked: true,
  readOnly: false,
  error: false,
  indeterminate: false,
  onChange: (e) => console.log(e.target.value),
};
