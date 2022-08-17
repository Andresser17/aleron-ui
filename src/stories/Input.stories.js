import React from "react";
import { useForm } from "react-hook-form";

import Input from "components/form/Input";

export default {
  title: "Input",
  component: Input,
};

const Template = (args) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      [args.name]: args.defaultValue,
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form className="al-w-80" onSubmit={handleSubmit(onSubmit)}>
      <Input {...{ control, ...args }} />
    </form>
  );
};

export const Light = Template.bind({});
Light.args = {
  palette: "light",
  type: "text",
  name: "name",
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
  palette: "dark",
  type: "password",
  name: "password",
  defaultValue: "",
  placeholder: "Password",
  readOnly: false,
  disabled: false,
  rules: {
    required: true,
    maxLength: { value: 15, message: "Max length is 15 char" },
  },
};
