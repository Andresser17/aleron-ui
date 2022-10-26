import React from "react";
import Button from "components/form/Button";
import { ReactComponent as PlusIcon } from "icons/plus-icon.svg";

export default {
  title: "Button",
  component: Button,
};

const Template = (args) => (
  <Button.Icon {...args}>
    <PlusIcon className="al-w-8 al-h-4" />
  </Button.Icon>
);

export const Label = (args) => <Button {...args} />;
Label.args = {
  palette: "primary",
  rounded: false,
  bold: false,
  text: "Submit",
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
};

export const LabelIcon = (args) => (
  <Button.Icon {...args}>
    <PlusIcon className="w-5 h-5" />
  </Button.Icon>
);
LabelIcon.args = {
  palette: "secondary",
  rounded: false,
  bold: false,
  text: "Plus",
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};
LabelIcon.storyName = "Label + Icon";

export const Icon = (args) => (
  <Button.Icon {...args}>
    <PlusIcon className="w-5 h-5" />
  </Button.Icon>
);
Icon.args = {
  palette: "success",
  rounded: false,
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};

export const Circle = (args) => (
  <Button.Circle {...args}>
    <PlusIcon className="w-5 h-5" />
  </Button.Circle>
);
Circle.args = {
  palette: "danger",
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};
