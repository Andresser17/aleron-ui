import React, { useState, useEffect, useCallback } from "react";
import useStyles from "@/hooks/useStyles";

function Tab({ styles, tab, selected, vertical, handleSelected }) {
  const className = useStyles(
    {
      tab: {
        active:
          selected?.value === tab.value
            ? "border-primary hover:border-primary/80 border-solid"
            : "border-black/0 hover:border-zinc-500 border-solid",
        border: vertical ? "border-l-2" : "border-b-2",
        padding: vertical ? "pl-5 py-2" : "px-4 py-3",
        font: "text-sm",
        main: "inline-block text-text cursor-pointer",
      },
    },
    styles,
    { tab, selected, vertical }
  );

  return (
    <span onClick={() => handleSelected(tab)} className={className.tab}>
      {tab.label}
    </span>
  );
}

interface Props {
  theme: string;
  styles: any;
  tabs: Array<{ label: string; value: string }>;
  vertical: boolean;
  handleSelectedTab: (tab: { label: string; value: string }) => void;
}

function Tabs({
  theme = "primary",
  styles = {},
  tabs = [],
  vertical,
  handleSelectedTab,
}: Props) {
  const [selected, setSelected] = useState<{ label: string; value: string }>();
  const className = useStyles(
    {
      container: {
        main: vertical ? "flex flex-col" : "",
      },
    },
    styles,
    { vertical }
  );

  const handleSelected = useCallback(
    (tab) => {
      setSelected(tab);
      // pass selected tab to parent
      handleSelectedTab(tab);
    },
    [handleSelectedTab, setSelected]
  );

  useEffect(() => {
    if (!selected) {
      tabs.map((tab) => {
        if (tab.selected) handleSelected(tab);
      });
    }
  }, [tabs, selected, handleSelected]);

  return (
    <div className={`${className.container} ${theme}`}>
      {tabs &&
        tabs.map((tab) => {
          return (
            <Tab
              key={tab.value}
              {...{ styles, tab, selected, vertical, handleSelected }}
            />
          );
        })}
    </div>
  );
}

export default Tabs;
