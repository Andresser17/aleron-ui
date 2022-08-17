import React from "react";
import { storiesOf } from "@storybook/react";
import { useForm } from "react-hook-form";

import Input from "../components/form/Input";

const stories = storiesOf("Input", module);

stories.add("Input", () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "John Doe",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        palette="primary"
        placeholder="Name"
        name="name"
        {...{ control }}
      />
    </form>
  );
});
