import React from "react";

import Radio from "components/form/Radio";

export default {
  title: "Radio",
  component: Radio,
};

const Template = (args) => <Radio {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  theme: "primary",
  name: "pets",
  options: [
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog", selected: true },
    { label: "Bird", value: "bird" },
  ],
  disabled: false,
};
