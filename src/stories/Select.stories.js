import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Select from "components/form/Select";

export default {
  title: "Select",
  component: Select,
};

const Template = (args) => {
  const [selected, setSelected] = useState({
    label: "John Doe",
    value: "john-doe",
  });
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      [args.name]: args.defaultValue.label,
    },
  });
  const onSubmit = (data) => console.log(selected);

  return (
    <form className="al-w-80" onSubmit={handleSubmit(onSubmit)}>
      <Select
        styles={{ container: { margin: "mb-4" } }}
        {...{ getSelected: setSelected, control, setValue, ...args }}
      />
      <Select {...{ getSelected: setSelected, control, setValue, ...args }} />
    </form>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  theme: "primary",
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
