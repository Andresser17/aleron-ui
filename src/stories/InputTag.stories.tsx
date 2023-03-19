import React, { useState } from "react";
import { useForm } from "react-hook-form";

import InputTag from "@/components/molecules/InputTag";
import Button from "@/components/atoms/Button";

export default {
  title: "InputTag",
  component: InputTag,
};

const Template = (args, opts) => {
  const [tags, setTags] = useState<Array<string>>(["Cat", "Dog", "Bird"]);
  // validate fields on every change event
  const { handleSubmit, setValue, control } = useForm({ mode: "onChange" });
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
      className={opts.name === "Dark" ? "dark" : ""}
      onKeyPress={handleKeyPress}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputTag {...{ tags, setTags, control, setValue, ...args }} />

      <Button styles={{ margin: "mt-8" }} text="Send" />
    </form>
  );
};

export const Light = Template.bind({});
Light.args = {
  theme: "primary",
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
  theme: "success",
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
