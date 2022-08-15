import { PlusIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useStore } from "../../../stores/store";
import Dropdown from "../../common/Dropdown";

export default observer(function ActivityActions() {
  const { activityStore } = useStore();
  const { setPredicate, predicate } = activityStore;
  const [initialValue, setInitialValue] = useState(true);

  const formatValue = {
    all: "All",
    isGoing: "I'm Going",
    isHost: "I'm Hosting",
  };

  const handleClick = (value) => {
    setInitialValue(false);
    setPredicate(value, "true");
  };

  const val = predicate.keys().next().value;
  const value = formatValue[val];

  return (
    <div className="flex items-center z-0 justify-between text-xs px-6 space-x-px py-[0.95rem]">
      <div className="flex items-center space-x-[1px] -mt-px">
        <button className="bg-[#4573d2] text-white pl-2 pr-[.6rem] flex items-center py-1.5 rounded-l-md">
          <PlusIcon
            className="h-[.85rem] w-[.85rem] text-white mr-[.25rem]"
            aria-hidden="true"
          />
          <div>Add new</div>
        </button>
        <Dropdown buttonClass="bg-[#4573d2] rounded-r-md py-1.5 pl-[.15rem] pr-[.2rem] flex items-center text-white hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" />
      </div>
      <div className="flex space-x-3">
        <Dropdown
          buttonClass="flex items-baseline space-x-1 text-[#6d6e6f] dark:text-gray-400"
          buttonText={
            "Filter" + (initialValue ? "" : value ? ": " + value : "")
          }
          icon={
            <svg
              className="h-3 w-3 text-[#6d6e6f] dark:text-gray-400"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="currentColor"
              focusable="false"
            >
              <path d="M20,8H4C3.4,8,3,7.6,3,7s0.4-1,1-1h16c0.6,0,1,0.4,1,1S20.6,8,20,8z M18,13c0-0.6-0.4-1-1-1H7c-0.6,0-1,0.4-1,1s0.4,1,1,1h10C17.6,14,18,13.6,18,13z M15,19c0-0.6-0.4-1-1-1h-4c-0.6,0-1,0.4-1,1s0.4,1,1,1h4C14.6,20,15,19.6,15,19z"></path>
            </svg>
          }
        >
          <button onClick={() => handleClick("all")}>All</button>
          <br />
          <button onClick={() => handleClick("isGoing")}>is Going</button>
          <br />
          <button onClick={() => handleClick("isHost")}>Is Hosting</button>
        </Dropdown>
      </div>
    </div>
  );
});