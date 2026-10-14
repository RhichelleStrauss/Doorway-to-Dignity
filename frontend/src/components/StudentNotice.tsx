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
      <div className="modal-box max-w-[520px] rounded-[14px] border-2 border-topaz-blue-700 bg-primary-topaz-blue-500/20 p-8 shadow-[0_12px_40px_rgba(8,74,79,0.35)] backdrop-blur-xl">
        <Badge tone="error">Student project - Summative Assessment</Badge>

        <h2 className="mt-4 text-[26px]/[34px] font-bold text-topaz-blue-200">
          Welcome to Doorway To Dignity
        </h2>

        <div className="mt-3 flex flex-col gap-3 text-[15px]/[24px] text-cream">
        <p className="font-bold"> This is not Doorway to Dignity's official website, if you are looking for them please go to <a href="https://doorwaytodignity.org" target="_blank" rel="noreferrer" className="underline">doorwaytodignity.org</a>. </p>
          <p>
            This website has been built as a student project, I am a second year software development student and this website was my summative assessment for semester 2 term 4.
            </p>
          <p>
           The biggest part behind the assessment is gathering analytics. This is done through simply looking through the site and Google Analytics. Some features are unavailable for now.
           </p>
           <p> 
           Please don't enter real personal details in any forms. Nothing is sent or saved.
           All images used are stock images.
          </p>
          <p>Please have a look around and use the site as you normally would.</p>
        </div>

        <form method="dialog" className="mt-6 flex">
          <Button type="submit" variant="beigeOutline">Continue to the site</Button>
        </form>
      </div>
    </dialog>
  );
}

export default StudentNotice;
