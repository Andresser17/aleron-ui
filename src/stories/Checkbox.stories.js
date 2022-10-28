import React, { useState, useEffect } from "react";

import Checkbox from "components/form/Checkbox";

export default {
  title: "Checkbox",
  component: Checkbox,
};

const Template = (args) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(args.error);
  }, [args.error]);

  return (
    <div className="w-full flex justify-center items-center">
      <Checkbox {...{ ...args, error, setError }} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  theme: "primary",
  label: "Checkbox",
  name: "checkbox",
  value: "checkbox",
  disabled: false,
  checked: true,
  readOnly: false,
  error: false,
  indeterminate: false,
  onChange: (e) => console.log(e.target.value),
};
