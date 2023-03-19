import React, { useState } from "react";
import useStyles from "@/hooks/useStyles";
import { useController } from "react-hook-form";
// // Components
import Tag from "@/components/atoms/Tag";
import InputDropdown from "@/components/organisms/InputDropdown";

interface Props {
  theme: string;
  styles: any;
  name: string;
  options: Array<{ label: string; value: string }>;
  maxTags: number;
  placeholder: string;
  disabled: boolean;
  defaultValue: { label: string; value: string };
  required: boolean;
  setValue: (value: string) => void;
  selectedTags: Array<{ label: string; value: string }>;
  setSelectedTags: (value: { label: string; value: string }) => void;
  readOnly: boolean;
}

function SelectTag({
  theme = "primary",
  styles = {},
  options = [],
  maxTags = 5,
  placeholder = "Search",
  disabled,
  setValue,
  selectedTags = [],
  setSelectedTags = () => undefined,
  readOnly,
  ...props
}: Props) {
  const handleTagClose = (e, index) => {
    e.stopPropagation();
    const newTags = selectedTags.filter((_, i) => i !== index);
    setSelectedTags(newTags);
    // Delete tag in parent state
    // getTags([...newTags], mergeData);
  };

  console.log({selectedTags})

  const handleSelected = (option) => {
    if (selectedTags.length >= maxTags) return;

    setSelectedTags((prev) => [...prev, option]);
    setValue(props.name, "");
  };

  const mapped =
    selectedTags.length > 0 &&
    selectedTags.map((tag, i) => (
      <Tag
        key={tag.value}
        text={tag.label}
        onClose={(event) => handleTagClose(event, i)}
        {...{ readOnly }}
      />
    ));

  return (
    <InputDropdown
      theme={theme}
      styles={styles}
      options={options}
      optionsSelected={selectedTags}
      handleSelected={handleSelected}
      setValue={setValue}
      {...props}
    >
      {mapped}
    </InputDropdown>
  );
}

export default SelectTag;
