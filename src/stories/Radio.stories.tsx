import React from "react";
import Radio from "@/components/atoms/Radio";

export default {
  title: "Radio",
  component: Radio,
};

const Template = (args, opts) => {
  return (
    <div className={opts.name === "Dark" ? "dark" : ""}>
      <Radio {...args} />
    </div>
  );
};

export const Light = Template.bind({});
Light.args = {
  theme: "light",
  name: "pets",
  options: [
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog", selected: true },
    { label: "Bird", value: "bird" },
  ],
  disabled: false,
};

export const Dark = Template.bind({});
Dark.args = {
  theme: "light",
  name: "pets",
  options: [
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog", selected: true },
    { label: "Bird", value: "bird" },
  ],
  disabled: false,
};
