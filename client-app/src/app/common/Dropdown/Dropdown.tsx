/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default observer(function Dropdown({ data }: any) {
  const { commentStore } = useStore();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="hover:bg-gray-300 rounded-md py-1.5 px-1 flex items-center text-white dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span className="sr-only">Open options</span>
          <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute border border-gray-600 right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-[#1e1f21] ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  onClick={(e) => {
                    commentStore.deleteComment(data.id);
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-[#cc6474]",
                    "block w-full text-left px-4 py-2 text-sm"
                  )}
                >
                  Delete comment
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
});