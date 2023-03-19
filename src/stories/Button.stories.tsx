import React from "react";
import Button from "@/components/atoms/Button";
import { FiPlus as PlusIcon } from "react-icons/fi";

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
  loading: false,
  disabled: false,
  onClick: () => console.log("clicked"),
  children: null,
};
