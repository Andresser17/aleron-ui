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
  const radioOptions = [{ label: "Cat", value: "cat" }];
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
        {/* Button */}
        <div className="al-flex al-mb-4">
          <div className="al-mr-[5.5px]">
            <Button text="Submit" />
          </div>
          <div className="al-mr-[5.5px]">
            <Button palette="success" text="Submit" />
          </div>
          <div className="al-mr-[5.5px]">
            <Button palette="danger" text="Submit" />
          </div>
          <div className="al-mr-[5.5px]">
            <Button palette="warning" text="Submit" />
          </div>
        </div>
        {/* Radio */}
        <div className="al-flex al-mb-4">
          <div className="al-mr-6">
            <Radio options={radioOptions} />
          </div>
          <div className="al-mr-6">
            <Radio palette="success" options={radioOptions} />
          </div>
          <div className="al-mr-6">
            <Radio palette="danger" options={radioOptions} />
          </div>
          <div className="al-mr-6">
            <Radio palette="info" options={radioOptions} />
          </div>
        </div>
        {/* Checkbox */}
        <div className="al-flex al-mb-4">
          <div className="al-mr-6">
            <Checkbox palette="primary" label="Dog" />
          </div>
          <div className="al-mr-6">
            <Checkbox palette="success" label="Dog" />
          </div>
          <div className="al-mr-6">
            <Checkbox palette="danger" label="Dog" />
          </div>
          <div className="al-mr-6">
            <Checkbox palette="info" label="Dog" />
          </div>
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
