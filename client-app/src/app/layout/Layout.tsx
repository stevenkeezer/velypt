import { Dialog, Transition } from "@headlessui/react";
import { ViewListIcon, XIcon } from "@heroicons/react/outline";
import {
  ClockIcon,
  HomeIcon,
  MenuAlt1Icon,
  PlusIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { Fragment, memo, useEffect, useState } from "react";
import ActivityHeader from "../components/activities/ActivityHeader";
import ProfileDropdown from "../components/ProfileDropdown/ProfileDropdown";
import Slider from "../components/Slider";
import { useTheme } from "next-themes";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: false },
  { name: "My Grows", href: "#", icon: ViewListIcon, current: true },
  { name: "Recent", href: "#", icon: ClockIcon, current: false },
];
const teams = [
  { name: "Engineering", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Human Resources", href: "#", bgColorClass: "bg-green-500" },
  { name: "Customer Success", href: "#", bgColorClass: "bg-yellow-500" },
];

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const mq =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)");
  const useDarkMode = mq.matches;

  console.log(useDarkMode, mq, "useDarkMode");

  useEffect(() => {
    if (useDarkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [useDarkMode]);

  return (
    <div className="min-h-full">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
                  alt="Workflow"
                />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2">
                  <div className="space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                          "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h3
                      className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      id="mobile-teams-headline"
                    >
                      Teams
                    </h3>
                    <div
                      className="mt-1 space-y-1"
                      role="group"
                      aria-labelledby="mobile-teams-headline"
                    >
                      {teams.map((team) => (
                        <a
                          key={team.name}
                          href={team.href}
                          className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                        >
                          <span
                            className={classNames(
                              team.bgColorClass,
                              "w-2.5 h-2.5 mr-4 rounded-full"
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate">{team.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:flex lg:flex-col lg:w-[15rem] lg:fixed lg:inset-y-0 lg:border-r lg:border-transparent lg:pt-5 lg:pb-4 dark:lg:bg-[#2e2e30]  lg:bg-[#1e1f21]">
        <div className="flex items-center flex-shrink-0 px-6">
          <img
            src="https://media.istockphoto.com/vectors/gardening-tools-and-plants-in-the-garden-vector-id1268196717?k=20&m=1268196717&s=612x612&w=0&h=RBA2SisPRx6OIeouAQ2R7I78eiazDS2gvGPr17mHvy4="
            className="h-8 w-8 mr-3 rounded-full"
          />

          <h1 className="text-white text-xl">GrowLab</h1>
          {/* <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
              alt="Workflow"
            /> */}
        </div>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="h-0 flex-1 flex flex-col overflow-y-auto">
          {/* User account dropdown */}

          {/* Navigation */}
          <nav className="px-0 mt-5">
            <div className="border-b pb-4 border-gray-700 dark:border-[#424244]">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-700/80 text-white dark:bg-[#505051]"
                      : "text-white hover:text-white hover:bg-gray-600",
                    "group flex items-center px-6 py-1.5 text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-gray-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-2 flex-shrink-0 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </div>
            <div className="mt-8">
              {/* Secondary navigation */}
              <h3
                className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                id="desktop-teams-headline"
              >
                Teams
              </h3>
              <div
                className="mt-1 px-4 space-y-1"
                role="group"
                aria-labelledby="desktop-teams-headline"
              >
                {teams.map((team) => (
                  <a
                    key={team.name}
                    href={team.href}
                    className="group flex items-center px-3 py-2 text-sm font-medium text-white rounded-md hover:text-gray-900 hover:bg-gray-50"
                  >
                    <span
                      className={classNames(
                        team.bgColorClass,
                        "w-2.5 h-2.5 mr-4 rounded-full"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{team.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Main column */}
      <main className="lg:pl-[15rem] flex flex-col h-screen">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    name="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center">
              <ProfileDropdown />
            </div>
          </div>
        </div>

        <ActivityHeader title={"My Tasks"} />

        {children}
      </main>

      <Slider />
    </div>
  );
}

export default memo(Layout);
