import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../../stores/store";
import { transitionOverlayProps, transitionProps } from "../transitionProps";

interface Props {
  children: React.ReactNode;
  title: string;
}

export default observer(function Modal({ children, title }: Props) {
  const { commonStore } = useStore();
  const { modalState, closeModal } = commonStore;

  return (
    <Transition appear show={modalState} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => closeModal()}>
        <Transition.Child {...transitionOverlayProps}>
          <div className="fixed inset-0 dark:bg-[rgba(66,66,68,0.75)] bg-[rgba(30,31,33,0.75)]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child {...transitionProps}>
              <div className="w-full max-w-md transform overflow-hidden rounded bg-white dark:bg-[#1e1f21] text-left align-middle shadow-xl transition-all">
                <div className="flex px-4 dark:text-white justify-between items-center">
                  {title}
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full border border-transparent bg-blue-100 px-2 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => closeModal()}
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {children}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});
