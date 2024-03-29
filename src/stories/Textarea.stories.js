import React from "react";
import { useForm } from "react-hook-form";

import Textarea from "components/form/Textarea";
import Button from "components/form/Button";

export default {
  title: "Textarea",
  component: Textarea,
};

const Template = (args, opts) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      [args.name]: args.defaultValue,
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form
      className={opts.name === "Dark" ? "dark" : ""}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Textarea {...{ control, ...args }} />
      <Button styles={{ margin: "mt-8" }} text="Submit" />
    </form>
  );
};

export const Light = Template.bind({});
Light.args = {
  theme: "primary",
  type: "text",
  name: "name",
  description: "Write your name",
  defaultValue: "John Doe",
  placeholder: "Name",
  readOnly: false,
  disabled: false,
  rules: {
    required: true,
    maxLength: { value: 15, message: "Max length is 15 char" },
  },
};

export const Dark = Template.bind({});
Dark.args = {
  theme: "primary",
  type: "text",
  name: "name",
  description: "Write your name",
  defaultValue: "John Doe",
  placeholder: "Name",
  readOnly: false,
  disabled: false,
  rules: {
    required: true,
    maxLength: { value: 15, message: "Max length is 15 char" },
  },
};
