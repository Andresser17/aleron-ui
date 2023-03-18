import React from "react";
import { useForm } from "react-hook-form";

import Search from "components/atoms/Search";

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

export const Primary = Template.bind({});
Primary.args = {
  palette: "primary",
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
