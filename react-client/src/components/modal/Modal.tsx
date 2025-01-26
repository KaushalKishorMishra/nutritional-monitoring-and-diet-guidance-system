import React, { useEffect } from "react";
import { useModalStore } from "../../hooks/store/modal.store";
import useAppSettingsStore, { Theme } from "../../hooks/store/appSettings.store";

const Modal: React.FC = () => {
  const { modals, closeModal } = useModalStore();

  const { theme } = useAppSettingsStore()

  // Get all visible modals
  const visibleModals = Object.keys(modals)
    .filter((id) => modals[id]?.visible)
    .map((id) => ({
      id,
      content: modals[id],
      padding: modals[id].padding,
      type: modals[id].type || "center", // Default to 'center' if no type is specified
    }));

  // Function to handle background click and close the modal
  const handleBackgroundClick = (e: React.MouseEvent, modalId: string) => {
    if (e.target === e.currentTarget) {
      closeModal(modalId); // Close top modal on background click
    }
  };

  // Function to handle Escape key press and close the topmost modal
  const handleEscapeBtnPress = (e: KeyboardEvent) => {
    if (e.key === "Escape" && visibleModals.length > 0) {
      const topModalId = visibleModals[visibleModals.length - 1].id;
      closeModal(topModalId);
    }
  };

  // Attach event listener for Escape key on component mount
  useEffect(() => {
    window.addEventListener("keydown", handleEscapeBtnPress);
    return () => {
      window.removeEventListener("keydown", handleEscapeBtnPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleModals]);

  // Function to calculate dynamic z-index for each modal based on its position in the stack
  const getModalZIndex = (index: number) => {
    return `z-${30 + index * 10}`;
  };

  return (
    <div className="relative z-[2000]">
      {visibleModals.map(({ id, content, padding, type }, index) => (
        <div
          key={id}
          className={`fixed inset-0 ${getModalZIndex(index)} ${theme === Theme.Light ? "bg-[#DBE0E4]/80" : "bg-black/80"}`}
          onClick={(e) => handleBackgroundClick(e, id)}
          tabIndex={0}
          style={{
            pointerEvents: index === visibleModals.length - 1 ? "auto" : "none",
          }}
        >
          {/* Background div stays full height */}
          <div
            className={`flex h-fit w-screen flex-col ${theme === Theme.Light ? "bg-neutral" : "bg-neutral"} shadow-lg ${type === "bottom"
              ? "fixed bottom-0 left-0 rounded-t-2xl"
              : "fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
              }`}
          >
            {/* top draggable notch */}
            {type === "bottom" && (
              <div className="mt-3 h-1 w-5 self-center rounded-xl bg-base-300/60"></div>
            )}

            {/* Header section */}
            <div className="header sticky top-0 z-50 w-full px-5 py-2 text-center text-2xl font-bold capitalize text-primary">
              {id}
            </div>

            {/* Content of the modal */}
            <div className={`${padding ? "w-full p-8" : "pb-5"}`}>
              {content.children} {/* Render the modal's children */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Modal;
