import React, { useState } from "react";

import Island from "@/components/molecules/Island";

export default {
  title: "Island",
  component: Island,
};

const Template = (args, opts) => {
  return (
    <div className={opts.name === "Dark" ? "dark" : ""}>
      <Island {...args} onClick={() => console.log("working")} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  theme: "primary",
  styles: {},
  badges: ["Cooking", "Fresh"],
  title: "Hello world",
  description: "Lorem Ipsum Dolor",
  mode: "progress",
  percent: 60,
};
