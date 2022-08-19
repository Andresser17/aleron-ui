import React from "react";
import Button from "components/form/Button";

export default {
  title: "Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  palette: "primary",
  text: "Button",
  icon: false,
  rounded: false,
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};

export const Secondary = Template.bind({});
Secondary.args = {
  palette: "secondary",
  text: "Button",
  icon: false,
  rounded: false,
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};

export const Success = Template.bind({});
Success.args = {
  palette: "success",
  text: "Button",
  icon: false,
  rounded: false,
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};

export const Danger = Template.bind({});
Danger.args = {
  palette: "danger",
  text: "Button",
  icon: false,
  rounded: false,
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};

export const Warning = Template.bind({});
Warning.args = {
  palette: "warning",
  text: "Button",
  icon: false,
  rounded: false,
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};

export const Info = Template.bind({});
Info.args = {
  palette: "info",
  text: "Button",
  icon: false,
  rounded: false,
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};

export const Light = Template.bind({});
Light.args = {
  palette: "light",
  text: "Button",
  icon: false,
  rounded: false,
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};

export const Dark = Template.bind({});
Dark.args = {
  palette: "dark",
  text: "Button",
  icon: false,
  rounded: false,
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};

export const Flat = Template.bind({});
Flat.args = {
  palette: "flat",
  text: "Button",
  icon: false,
  rounded: false,
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};
