import React from "react";

import Radio from "components/form/Radio";

export default {
  title: "Radio",
  component: Radio,
};

const Template = (args) => <Radio {...{ ...args }} />;

export const Primary = Template.bind({});
Primary.args = {
  palette: "primary",
  name: "pets",
  options: [
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog", selected: true },
    { label: "Bird", value: "bird" },
  ],
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  palette: "secondary",
  name: "pets",
  disabled: false,
};

export const Success = Template.bind({});
Success.args = {
  palette: "success",
  name: "pets",
  disabled: false,
};

export const Danger = Template.bind({});
Danger.args = {
  palette: "danger",
  name: "pets",
  disabled: false,
};

export const Warning = Template.bind({});
Warning.args = {
  palette: "warning",
  name: "pets",
  disabled: false,
};

export const Info = Template.bind({});
Info.args = {
  palette: "info",
  name: "pets",
  disabled: false,
};

export const Light = Template.bind({});
Light.args = {
  palette: "light",
  name: "pets",
  disabled: false,
};

export const Dark = Template.bind({});
Dark.args = {
  palette: "dark",
  name: "pets",
  disabled: false,
};

export const Flat = Template.bind({});
Flat.args = {
  palette: "flat",
  name: "pets",
  disabled: false,
};
