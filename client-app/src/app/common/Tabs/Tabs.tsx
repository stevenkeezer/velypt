import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useStore } from "../../../stores/store";
import { classNames } from "../../utils/classNames";

export default observer(function Tabs({ tabs }: any) {
  const { activityStore } = useStore();

  const router = useRouter();
  const { asPath, pathname } = router;

  const selectedTabs = tabs || [
    {
      name: "List",
      href: "/0/list/0",
      current: asPath === "/list" || pathname === "/0/list/[id]",
    },
    { name: "Board", href: "#", current: false },
    {
      name: "Calendar",
      href: "/0/calendar/0",
      current: asPath == "/0/calendar",
    },
    { name: "Files", href: "/files", current: asPath == "/files" },
  ];

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue={"List"}
        >
          {selectedTabs.map((tab) => (
            <option key={tab.name} className="tracking-widest">
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-gray-200">
          <nav className="-mb-px flex space-x-[1.5rem]" aria-label="Tabs">
            {selectedTabs.map((tab) => (
              <span
                onClick={() => {
                  activityStore.closeForm();
                  router.push(tab.href);
                }}
                className={classNames(
                  tab.current
                    ? "border-gray-500 text-[#1e1f21] dark:text-white dark:border-[#a2a0a2]"
                    : "border-transparent text-[#6d6e6f] hover:text-gray-700 hover:border-gray-300 dark:text-[#a2a0a2]",
                  "whitespace-nowrap py-1.5 border-b-2 cursor-pointer font-medium text-sm tracking-normal"
                )}
              >
                {tab.name}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
});
