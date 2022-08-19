import React from "react";
import { useForm } from "react-hook-form";

import Search from "components/form/Search";

export default {
  title: "Search",
  component: Search,
};

const Template = (args) => {
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      [args.name]: args.defaultValue,
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form className="al-w-80" onSubmit={handleSubmit(onSubmit)}>
      <Search {...{ control, setValue, ...args }} />
    </form>
  );
};

export const Light = Template.bind({});
Light.args = {
  palette: "light",
  name: "name",
  placeholder: "Name",
  defaultValue: "John Doe",
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
  defaultValue: "John Doe",
  readOnly: false,
  disabled: false,
  rules: {
    required: true,
    maxLength: { value: 15, message: "Max length is 15 char" },
  },
};
