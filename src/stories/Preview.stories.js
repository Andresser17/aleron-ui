import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "components/form/Button";
import Checkbox from "components/form/Checkbox";
import Radio from "components/form/Radio";
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
      name: "John Doe",
    },
  });
  const selectOptions = [
    { label: "New York", value: "new-york" },
    { label: "Madrid", value: "madrid" },
    { label: "Tokyo", value: "tokyo" },
  ];
  const radioOptions = [{ label: "Cat", value: "cat", selected: true }];
  const onSubmit = (data) => console.log(data);

  // prevent submit with enter if InputTag is focus
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && document.activeElement.name === args.name) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center dark">
      <form
        onKeyPress={handleKeyPress}
        className="w-80 dark"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Button */}
        <div className="flex mb-4">
          <Button styles={{ margin: "mr-[5.5px]" }} text="Submit" />
          <Button
            theme="success"
            styles={{ margin: "mr-[5.5px]" }}
            text="Submit"
          />
          <Button
            theme="danger"
            styles={{ margin: "mr-[5.5px]" }}
            text="Submit"
          />
          <Button
            theme="warning"
            styles={{ margin: "mr-[5.5px]" }}
            text="Submit"
          />
        </div>
        {/* Radio */}
        <div className="flex mb-4">
          <Radio styles={{ margin: "mr-6" }} options={radioOptions} />
          <Radio
            theme="success"
            styles={{ margin: "mr-6" }}
            options={radioOptions}
          />
          <Radio
            theme="danger"
            styles={{ margin: "mr-6" }}
            options={radioOptions}
          />
          <Radio
            theme="info"
            styles={{ margin: "mr-6" }}
            options={radioOptions}
          />
        </div>
        {/* Checkbox */}
        <div className="flex mb-4">
          <Checkbox styles={{ margin: "mr-6" }} checked label="Dog" />
          <Checkbox
            theme="success"
            styles={{ margin: "mr-6" }}
            checked
            label="Cat"
          />
          <Checkbox
            theme="danger"
            styles={{ margin: "mr-6" }}
            checked
            label="Fish"
          />
          <Checkbox
            theme="info"
            styles={{ margin: "mr-6" }}
            checked
            label="Snake"
          />
        </div>
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
          {...{
            getSelected: setSelected,
            control,
            options: selectOptions,
            setValue,
            ...args,
          }}
        />
      </form>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  type: "text",
  readOnly: false,
  disabled: false,
  rules: {
    required: true,
    maxLength: { value: 15, message: "Max length is 15 char" },
  },
};
