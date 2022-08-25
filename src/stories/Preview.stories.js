import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Input from "components/form/Input";
import InputTag from "components/form/InputTag";
import Select from "components/form/Select";

export default {
  title: "Preview",
  component: Input,
};

const Template = (args) => {
  const [tags, setTags] = useState(["Pizza", "Hamburguer", "Ice Cream"]);
  const [selected, setSelected] = useState({
    label: "John Doe",
    value: "john-doe",
  });
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      // name: "John Doe",
      cities: ""
    },
  });
  const options = [
    { label: "John Doe", value: "john-doe" },
    { label: "Alex Doe", value: "alex-doe" },
    { label: "Jane Doe", value: "jane-doe" },
  ];
  const onSubmit = (data) => console.log(data);

  // prevent submit with enter if InputTag is focus
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && document.activeElement.name === args.name) {
      e.preventDefault();
    }
  };

  return (
    <div className="al-w-full al-min-h-screen al-bg-gray-900 al-flex al-justify-center al-items-center">
      <form
        onKeyPress={handleKeyPress}
        className="al-w-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name="name"
          placeholder="Name"
          description="Write your name"
          {...{ control, ...args }}
        />
        <InputTag
          placeholder="Favorite foods"
          description="Favorite foods"
          name="favorite-foods"
          {...{ tags, setTags, control, setValue, ...args }}
        />
        <Select
          name="cities"
          placeholder="Select a city"
          description="Favorite city"
          {...{ getSelected: setSelected, control, options, setValue, ...args }}
        />
      </form>
    </div>
  );
};

export const Light = Template.bind({});
Light.args = {
  palette: "light",
  type: "text",
  readOnly: false,
  disabled: false,
  rules: {
    required: true,
    maxLength: { value: 15, message: "Max length is 15 char" },
  },
};
