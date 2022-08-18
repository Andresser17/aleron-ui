import React, { useState } from "react";
import { useForm } from "react-hook-form";

import InputTag from "components/form/InputTag";
import Button from "components/form/Button";

export default {
  title: "InputTag",
  component: InputTag,
};

const Template = (args) => {
  const [tags, setTags] = useState([]);
  // validate fields on every change event
  const { handleSubmit, resetField, control } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    // don't send if tags if empty
    console.log(tags);
  };

  // prevent submit with enter if InputTag is focus
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && document.activeElement.name === args.name) {
      e.preventDefault();
    }
  };

  return (
    <form
      onKeyPress={handleKeyPress}
      className="al-w-80 al-flex al-flex-col al-items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputTag {...{ tags, setTags, control, resetField, ...args }} />

      {/* <InputTag {...{ tags, setTags, control, resetField, ...{...args, name: "dogs2"} }} /> */}
      <Button text="Send" />
    </form>
  );
};

export const Light = Template.bind({});
Light.args = {
  palette: "light",
  tagsPalette: "primary",
  description: "Select your favorite foods (5 maximum)",
  maxTags: 5,
  name: "foods",
  placeholder: "Name",
  readOnly: false,
  disabled: false,
  rules: {
    maxLength: { value: 15, message: "Max length is 15 char" },
  },
};

export const Dark = Template.bind({});
Dark.args = {
  palette: "dark",
  tagsPalette: "success",
  description: "Select your favorite dogs (5 maximum)",
  maxTags: 5,
  name: "pets",
  placeholder: "Password",
  readOnly: false,
  disabled: false,
  rules: {
    maxLength: { value: 15, message: "Max length is 15 char" },
  },
};
