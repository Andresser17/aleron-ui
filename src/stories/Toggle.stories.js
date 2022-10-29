import React, { useState } from "react";

import Toggle from "components/form/Toggle";

export default {
  title: "Toggle",
  component: Toggle,
};

const Template = (args, opts) => {
  return (
    <div className={opts.name === "Dark" ? "dark" : ""}>
      <Toggle {...args} />
    </div>
  );
};

export const Light = Template.bind({});
Light.args = {
  theme: "primary",
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
  theme: "primary",
  name: "chocolate",
  value: "chocolate",
  label: "You want chocolate?",
  subtitle: "Is not important",
  checked: false,
  readOnly: false,
  disabled: false,
};
