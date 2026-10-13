import { useEffect, useRef } from "react";
import Badge from "./Badge";
import Button from "./Button";

const STORAGE_KEY = "studentNoticeSeen";

function StudentNotice() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch {
    }

    const dialog = dialogRef.current;
    if (dialog && !seen && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  function handleClose() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
    }
  }

  return (
    <dialog ref={dialogRef} className="modal" onClose={handleClose}>
      <div className="modal-box max-w-[520px] rounded-[14px] border-2 border-error-frame bg-topaz-blue-100 p-8">
        <Badge tone="error">Student project</Badge>

        <h2 className="mt-4 text-[26px]/[34px] font-bold text-error-frame">
          Welcome to Doorway To Dignity
        </h2>

        <div className="mt-3 flex flex-col gap-3 text-[15px]/[24px] text-error-text">
          <p>
            This website is a student project, built as a concept for Doorway To Dignity.
          </p>
          <p>
            A big part of it is gathering anonymous analytics, so we can see where
            visitors spend most of their time on the site and improve it.
          </p>
          <p>Have a look around and use the site as you normally would.</p>
        </div>

        <form method="dialog" className="mt-6 flex">
          <Button type="submit" variant="beige">Continue to the site</Button>
        </form>
      </div>
    </dialog>
  );
}

export default StudentNotice;
