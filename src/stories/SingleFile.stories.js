import React, { useState } from "react";

import SingleFile from "components/form/SingleFile";

export default {
  title: "SingleFile",
  component: SingleFile,
};

const Template = (args) => {
  return (
    <div className="al-w-80">
      <SingleFile {...args} />
    </div>
  );
};

export const Light = Template.bind({});
Light.args = {
  palette: "light",
  name: "name",
  placeholder: "Name",
  options: [
    { label: "John Doe", value: "john-doe" },
    { label: "Alex Doe", value: "alex-doe" },
    { label: "Jane Doe", value: "jane-doe" },
  ],
  defaultValue: { label: "John Doe", value: "john-doe" },
  readOnly: false,
  disabled: false,
  rules: {
    required: true,
    maxLength: { value: 15, message: "Max length is 15 char" },
  },
};

export const Dark = Template.bind({});
Dark.args = {
  palette: "dark",
  name: "name",
  placeholder: "Name",
  options: [
    { label: "John Doe", value: "john-doe" },
    { label: "Alex Doe", value: "alex-doe" },
    { label: "Jane Doe", value: "jane-doe" },
  ],
  defaultValue: { label: "John Doe", value: "john-doe" },
  readOnly: false,
  disabled: false,
  rules: {
    required: true,
    maxLength: { value: 15, message: "Max length is 15 char" },
  },
};
