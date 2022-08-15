import React from "react";
import { storiesOf } from "@storybook/react";

import Badge from "../components/Badge";

const stories = storiesOf("Badge", module);

stories.add("Badge", () => {
  return <Badge palette="primary" text="Hello World" />;
});
