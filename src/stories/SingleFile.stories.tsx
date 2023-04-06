import React from "react";

import SingleFile from "@/components/atoms/SingleFile";

export default {
  title: "SingleFile",
  component: SingleFile,
};

const Template = (args: {
  theme: string;
  maxFileSize: string;
  accept: Array<string>;
}) => {
  const handleUpload = () => {};
  const handleDelete = () => {};

  return (
    <SingleFile {...args} onUpload={handleUpload} onDelete={handleDelete} />
  );
};

export const Light = Template.bind({});
Light.args = {
  theme: "primary",
  maxFileSize: "2MB",
  accept: ["application/pdf"],
};
