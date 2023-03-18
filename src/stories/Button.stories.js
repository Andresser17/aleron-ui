import React from "react";
import Button from "components/atoms/Button";
import { ReactComponent as PlusIcon } from "icons/plus-icon.svg";

export default {
  title: "Button",
  component: Button,
};

export const Label = (args) => <Button {...args} />;
Label.args = {
  theme: "primary",
  text: "Submit",
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
  theme: "secondary",
  text: "Plus",
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
};
LabelIcon.storyName = "Label + Icon";

export const Icon = (args) => (
  <Button.Icon {...args}>
    <PlusIcon className="w-5 h-5" />
  </Button.Icon>
);
Icon.args = {
  theme: "success",
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
  theme: "danger",
  border: false,
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};
